import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { api } from '@/lib/api';

interface Experience {
  id: number;
  company: string;
  position: string;
  duration: string;
  start_date: string;
  end_date: string;
  location: string;
  type: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
  current: boolean;
}

export default function ExperienceManager() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    duration: '',
    start_date: '',
    end_date: '',
    location: '',
    type: 'Full-time',
    description: '',
    responsibilities: [] as string[],
    technologies: [] as string[],
    achievements: [] as string[],
    current: false
  });

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    try {
      const result = await api.getExperiences();
      if (result.success) {
        setExperiences(result.data);
      }
    } catch (error) {
      console.error('Error loading experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingExperience) {
        await api.updateExperience(editingExperience.id, formData);
      } else {
        await api.addExperience(formData);
      }
      loadExperiences();
      resetForm();
    } catch (error) {
      console.error('Error saving experience:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      try {
        await api.deleteExperience(id);
        loadExperiences();
      } catch (error) {
        console.error('Error deleting experience:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      company: '',
      position: '',
      duration: '',
      start_date: '',
      end_date: '',
      location: '',
      type: 'Full-time',
      description: '',
      responsibilities: [],
      technologies: [],
      achievements: [],
      current: false
    });
    setEditingExperience(null);
    setIsAddDialogOpen(false);
  };

  const startEdit = (experience: Experience) => {
    setFormData({
      ...experience,
      responsibilities: experience.responsibilities || [],
      technologies: experience.technologies || [],
      achievements: experience.achievements || []
    });
    setEditingExperience(experience);
    setIsAddDialogOpen(true);
  };

  const handleArrayInput = (field: 'responsibilities' | 'technologies' | 'achievements', value: string) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData({...formData, [field]: items});
  };

  if (loading) {
    return <div>Loading experiences...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Work Experience Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>Add New Experience</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingExperience ? 'Edit Experience' : 'Add New Experience'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => setFormData({...formData, position: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start_date">Start Date</Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="end_date">End Date</Label>
                  <Input
                    id="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                    disabled={formData.current}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="current"
                  checked={formData.current}
                  onCheckedChange={(checked) => setFormData({...formData, current: !!checked, end_date: checked ? '' : formData.end_date})}
                />
                <Label htmlFor="current">Current Position</Label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="type">Employment Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Freelance">Freelance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
                <Label htmlFor="technologies">Technologies (comma separated)</Label>
                <Input
                  id="technologies"
                  value={formData.technologies.join(', ')}
                  onChange={(e) => handleArrayInput('technologies', e.target.value)}
                  placeholder="React, Node.js, TypeScript"
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  {editingExperience ? 'Update' : 'Add'} Experience
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
        {experiences.map((experience) => (
          <Card key={experience.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-medium text-lg">{experience.position}</h3>
                  <p className="text-muted-foreground">{experience.company}</p>
                  <p className="text-sm text-muted-foreground">{experience.location} • {experience.type}</p>
                  <p className="text-sm text-muted-foreground mt-1">{experience.duration}</p>
                  {experience.description && (
                    <p className="text-sm mt-2">{experience.description}</p>
                  )}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {experience.current && (
                      <Badge variant="default">Current</Badge>
                    )}
                    <Badge variant="outline">{experience.type}</Badge>
                    {experience.technologies?.map((tech, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => startEdit(experience)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(experience.id)}>
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