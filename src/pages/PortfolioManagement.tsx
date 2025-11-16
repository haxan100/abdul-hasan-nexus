import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, X, Plus } from 'lucide-react';
import { toast } from 'sonner';
import ImageUpload from '@/components/ImageUpload';
import GalleryUpload from '@/components/GalleryUpload';
import { api } from '@/lib/api';
import { uploadBlobToBackend } from '@/utils/uploadToBackend';

interface Portfolio {
  id: number;
  title: string;
  description: string;
  cover_image: string;
  cover_caption?: string;
  background_image: string;
  background_caption?: string;
  technologies: string[];
  features: string[];
  demo_url?: string;
  github_url?: string;
  status: 'active' | 'inactive';
  gallery?: Array<{ image_url: string; caption?: string }>;
}

const PortfolioManagement = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id && id !== 'new';
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    cover_image: '',
    cover_caption: '',
    background_image: '',
    background_caption: '',
    technologies: [] as string[],
    features: [] as string[],
    demo_url: '',
    status: 'active' as 'active' | 'inactive',
    gallery: [] as Array<{ image_url: string; caption?: string }>
  });
  const [newTech, setNewTech] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      loadPortfolio();
    }
  }, [id, isEdit]);

  const loadPortfolio = async () => {
    try {
      const response = await api.getPortfolioById(parseInt(id!));
      if (response.success) {
        const portfolio = response.data;
        
        // Parse JSON fields if they're strings
        let technologies = portfolio.technologies;
        let features = portfolio.features;
        let gallery = portfolio.gallery_images || [];
        
        if (typeof technologies === 'string') {
          technologies = JSON.parse(technologies || '[]');
        }
        if (typeof features === 'string') {
          features = JSON.parse(features || '[]');
        }
        
        // Debug: Log what we got from database
        console.log('Portfolio data from DB:', {
          cover_image: portfolio.cover_image,
          background_image: portfolio.background_image,
          gallery: gallery
        });
        
        // Fix image URLs by adding server prefix if needed
        const fixImageUrl = (url) => {
          if (!url) return '';
          if (url.startsWith('http')) return url;
          return `http://localhost:3000${url}`;
        };
        
        // Fix gallery URLs
        const fixedGallery = gallery.map(img => {
          const imageUrl = img.url || img.image_url;
          console.log('Gallery image URL:', imageUrl);
          return {
            url: fixImageUrl(imageUrl),
            caption: img.caption || img.image_caption || ''
          };
        });
        
        setFormData({
          title: portfolio.title || '',
          description: portfolio.description || '',
          cover_image: fixImageUrl(portfolio.cover_image),
          cover_caption: portfolio.cover_caption || '',
          background_image: fixImageUrl(portfolio.background_image),
          background_caption: portfolio.background_caption || '',
          technologies: technologies || [],
          features: features || [],
          demo_url: portfolio.demo_url || '',
          status: portfolio.status || 'active',
          gallery: fixedGallery
        });
      }
    } catch (error) {
      toast.error('Gagal load portfolio');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Upload files first
      const uploadedData = { ...formData };
      
      // Upload cover image if it's a blob URL
      if (formData.cover_image.startsWith('blob:')) {
        uploadedData.cover_image = await uploadBlobToBackend(formData.cover_image, 'cover.jpg');
      }
      
      // Upload background image if it's a blob URL
      if (formData.background_image.startsWith('blob:')) {
        uploadedData.background_image = await uploadBlobToBackend(formData.background_image, 'background.jpg');
      }
      
      // Upload gallery images
      const uploadedGallery = [];
      for (let i = 0; i < formData.gallery.length; i++) {
        const image = formData.gallery[i];
        if (image.url.startsWith('blob:')) {
          const uploadedUrl = await uploadBlobToBackend(image.url, `gallery-${i}.jpg`);
          uploadedGallery.push({
            url: uploadedUrl,
            caption: image.caption
          });
        } else {
          uploadedGallery.push(image);
        }
      }
      uploadedData.gallery = uploadedGallery;
      
      if (isEdit) {
        await api.updatePortfolio(parseInt(id!), uploadedData);
        toast.success('Portfolio berhasil diupdate');
      } else {
        await api.addPortfolio(uploadedData);
        toast.success('Portfolio berhasil ditambah');
      }
      navigate('/admin-hasan/dashboard');
    } catch (error) {
      toast.error('Gagal simpan portfolio');
    } finally {
      setLoading(false);
    }
  };

  const addTechnology = () => {
    if (newTech.trim() && !formData.technologies.includes(newTech.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTech.trim()]
      }));
      setNewTech('');
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }));
  };

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== feature)
    }));
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/admin-hasan/dashboard')}
          className="mr-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>
        <h1 className="text-3xl font-bold">
          {isEdit ? 'Edit Portfolio' : 'Tambah Portfolio'}
        </h1>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <div className="flex items-center gap-2">
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'active' | 'inactive' }))}
                    className="w-full p-2 border rounded"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  <Badge variant={formData.status === 'active' ? 'default' : 'secondary'}>
                    {formData.status}
                  </Badge>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Cover Image</Label>
                <ImageUpload
                  label=""
                  value={formData.cover_image}
                  onChange={(url) => setFormData(prev => ({ ...prev, cover_image: url }))}
                />
                <Input
                  placeholder="Cover image caption"
                  value={formData.cover_caption}
                  onChange={(e) => setFormData(prev => ({ ...prev, cover_caption: e.target.value }))}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Background Image</Label>
                <ImageUpload
                  label=""
                  value={formData.background_image}
                  onChange={(url) => setFormData(prev => ({ ...prev, background_image: url }))}
                />
                <Input
                  placeholder="Background image caption"
                  value={formData.background_caption}
                  onChange={(e) => setFormData(prev => ({ ...prev, background_caption: e.target.value }))}
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="demo_url">Demo URL</Label>
              <Input
                id="demo_url"
                type="url"
                value={formData.demo_url}
                onChange={(e) => setFormData(prev => ({ ...prev, demo_url: e.target.value }))}
                placeholder="https://demo.example.com"
              />
            </div>

            <div>
              <Label>Technologies</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  placeholder="Add technology"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                />
                <Button type="button" onClick={addTechnology}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="flex items-center gap-1">
                    {tech}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => removeTechnology(tech)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label>Features</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Add feature"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                />
                <Button type="button" onClick={addFeature}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.features.map((feature) => (
                  <Badge key={feature} variant="secondary" className="flex items-center gap-1">
                    {feature}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => removeFeature(feature)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label>Gallery</Label>
              <GalleryUpload
                label=""
                images={formData.gallery}
                onChange={(gallery) => setFormData(prev => ({ ...prev, gallery }))}
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : (isEdit ? 'Update Portfolio' : 'Tambah Portfolio')}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/admin-hasan/dashboard')}
              >
                Batal
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioManagement;