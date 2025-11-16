import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import RichTextEditor from '@/components/RichTextEditor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/lib/api';
import { toast } from 'sonner';

export default function HeroManager() {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadHero();
  }, []);

  const loadHero = async () => {
    try {
      const result = await api.getHero();
      if (result.success && result.data) {
        setFormData({
          name: result.data.name || '',
          description: result.data.description || ''
        });
      }
    } catch (error) {
      console.error('Error loading hero:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const result = await api.saveHero(formData);
      if (result.success) {
        toast.success('Hero section updated successfully!');
      }
    } catch (error) {
      console.error('Error saving hero:', error);
      toast.error('Failed to save hero section');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div>Loading hero section...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hero Section Management</CardTitle>
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
            <Label htmlFor="description">Hero Description</Label>
            <RichTextEditor
              value={formData.description}
              onChange={(value) => setFormData({...formData, description: value})}
              placeholder="Brief description for hero section"
              rows={4}
            />
          </div>
          
          <Button type="submit" disabled={saving} className="w-full">
            {saving ? 'Saving...' : 'Save Hero Section'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}