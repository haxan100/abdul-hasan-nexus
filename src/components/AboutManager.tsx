import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import RichTextEditor from '@/components/RichTextEditor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/lib/api';
import { toast } from 'sonner';

export default function AboutManager() {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    subtitle: '',
    bio: '',
    focus_areas: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadAbout();
  }, []);

  const loadAbout = async () => {
    try {
      const result = await api.getAbout();
      if (result.success && result.data) {
        setFormData({
          name: result.data.name || '',
          title: result.data.title || '',
          subtitle: result.data.subtitle || '',
          bio: result.data.bio || '',
          focus_areas: result.data.focus_areas || ''
        });
      }
    } catch (error) {
      console.error('Error loading about:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const result = await api.saveAbout(formData);
      if (result.success) {
        toast.success('About me updated successfully!');
      }
    } catch (error) {
      console.error('Error saving about:', error);
      toast.error('Failed to save about me');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div>Loading about me...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>About Me Management</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Your full name"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Your professional title"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="subtitle">Subtitle</Label>
            <Input
              id="subtitle"
              value={formData.subtitle}
              onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
              placeholder="Turning ideas into scalable, beautiful, and efficient systems."
            />
          </div>
          
          <div>
            <Label htmlFor="bio">Bio</Label>
            <RichTextEditor
              value={formData.bio}
              onChange={(value) => setFormData({...formData, bio: value})}
              placeholder="Your background and experience"
              rows={4}
            />
          </div>
          
          <div>
            <Label htmlFor="focus_areas">Focus Areas</Label>
            <RichTextEditor
              value={formData.focus_areas}
              onChange={(value) => setFormData({...formData, focus_areas: value})}
              placeholder="What you focus on developing"
              rows={3}
            />
          </div>
          

          
          <Button type="submit" disabled={saving} className="w-full">
            {saving ? 'Saving...' : 'Save About Me'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}