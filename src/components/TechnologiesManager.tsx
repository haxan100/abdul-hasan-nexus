import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { api } from '@/lib/api';

interface Technology {
  id: number;
  name: string;
  category: string;
  description: string;
  usage_level: string;
  icon: string;
}

export default function TechnologiesManager() {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingTechnology, setEditingTechnology] = useState<Technology | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Code Editor',
    description: '',
    usage_level: 'Monthly',
    icon: ''
  });

  useEffect(() => {
    loadTechnologies();
  }, []);

  const loadTechnologies = async () => {
    try {
      const result = await api.getTechnologies();
      if (result.success) {
        const allTechnologies = [
          ...result.data.tools,
          ...result.data.libraries,
          ...result.data.testing,
          ...result.data.version_control,
          ...result.data.deployment
        ];
        setTechnologies(allTechnologies);
      }
    } catch (error) {
      console.error('Error loading technologies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingTechnology) {
        await api.updateTechnology(editingTechnology.id, formData);
      } else {
        await api.addTechnology(formData);
      }
      loadTechnologies();
      resetForm();
    } catch (error) {
      console.error('Error saving technology:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this technology?')) {
      try {
        await api.deleteTechnology(id);
        loadTechnologies();
      } catch (error) {
        console.error('Error deleting technology:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'Code Editor',
      description: '',
      usage_level: 'Monthly',
      icon: ''
    });
    setEditingTechnology(null);
    setIsAddDialogOpen(false);
  };

  const startEdit = (technology: Technology) => {
    setFormData(technology);
    setEditingTechnology(technology);
    setIsAddDialogOpen(true);
  };

  const getUsageBadgeVariant = (usage_level: string) => {
    switch (usage_level) {
      case 'Daily': return 'default';
      case 'Weekly': return 'secondary';
      case 'Monthly': return 'outline';
      default: return 'outline';
    }
  };

  if (loading) {
    return <div>Loading technologies...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Technologies Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>Add New Technology</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingTechnology ? 'Edit Technology' : 'Add New Technology'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Technology Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Code Editor">Code Editor</SelectItem>
                    <SelectItem value="CSS Framework">CSS Framework</SelectItem>
                    <SelectItem value="Design Tool">Design Tool</SelectItem>
                    <SelectItem value="API Testing">API Testing</SelectItem>
                    <SelectItem value="UI Library">UI Library</SelectItem>
                    <SelectItem value="Testing Framework">Testing Framework</SelectItem>
                    <SelectItem value="Version Control">Version Control</SelectItem>
                    <SelectItem value="Code Hosting">Code Hosting</SelectItem>
                    <SelectItem value="Hosting Platform">Hosting Platform</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="usage_level">Usage Frequency</Label>
                <Select value={formData.usage_level} onValueChange={(value) => setFormData({...formData, usage_level: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Daily">Daily</SelectItem>
                    <SelectItem value="Weekly">Weekly</SelectItem>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                    <SelectItem value="Rarely">Rarely</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="icon">Icon Path</Label>
                <Input
                  id="icon"
                  value={formData.icon}
                  onChange={(e) => setFormData({...formData, icon: e.target.value})}
                  placeholder="/icons/technology.svg"
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  {editingTechnology ? 'Update' : 'Add'} Technology
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid gap-4">
        {technologies.map((technology) => (
          <Card key={technology.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <h3 className="font-medium">{technology.name}</h3>
                  <p className="text-sm text-muted-foreground">{technology.category}</p>
                  {technology.description && (
                    <p className="text-sm text-muted-foreground mt-1">{technology.description}</p>
                  )}
                  <div className="mt-2">
                    <Badge variant={getUsageBadgeVariant(technology.usage_level)}>
                      {technology.usage_level}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => startEdit(technology)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(technology.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}