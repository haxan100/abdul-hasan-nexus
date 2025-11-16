import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { api } from '@/lib/api';

interface Skill {
  id: number;
  name: string;
  category: string;
  level: number;
  timeline: string;
  start_year: number;
  description: string;
  projects: number;
  certifications: string[];
  icon: string;
}

export default function SkillsManager() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Frontend Framework',
    level: 50,
    timeline: '',
    start_year: new Date().getFullYear(),
    description: '',
    projects: 0,
    certifications: [] as string[],
    icon: ''
  });

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const result = await api.getSkills();
      if (result.success) {
        const allSkills = [
          ...result.data.frontend,
          ...result.data.backend,
          ...result.data.database,
          ...result.data.devops
        ];
        setSkills(allSkills);
      }
    } catch (error) {
      console.error('Error loading skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingSkill) {
        await api.updateSkill(editingSkill.id, formData);
      } else {
        await api.addSkill(formData);
      }
      loadSkills();
      resetForm();
    } catch (error) {
      console.error('Error saving skill:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this skill?')) {
      try {
        await api.deleteSkill(id);
        loadSkills();
      } catch (error) {
        console.error('Error deleting skill:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'Frontend Framework',
      level: 50,
      timeline: '',
      start_year: new Date().getFullYear(),
      description: '',
      projects: 0,
      certifications: [],
      icon: ''
    });
    setEditingSkill(null);
    setIsAddDialogOpen(false);
  };

  const startEdit = (skill: Skill) => {
    setFormData({
      ...skill,
      certifications: skill.certifications || []
    });
    setEditingSkill(skill);
    setIsAddDialogOpen(true);
  };

  if (loading) {
    return <div>Loading skills...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Technical Skills Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>Add New Skill</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingSkill ? 'Edit Skill' : 'Add New Skill'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Skill Name</Label>
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
                    <SelectItem value="Frontend Framework">Frontend Framework</SelectItem>
                    <SelectItem value="Backend Runtime">Backend Runtime</SelectItem>
                    <SelectItem value="Programming Language">Programming Language</SelectItem>
                    <SelectItem value="NoSQL Database">NoSQL Database</SelectItem>
                    <SelectItem value="SQL Database">SQL Database</SelectItem>
                    <SelectItem value="Cloud Platform">Cloud Platform</SelectItem>
                    <SelectItem value="Containerization">Containerization</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="level">Level: {formData.level}%</Label>
                <Slider
                  value={[formData.level]}
                  onValueChange={(value) => setFormData({...formData, level: value[0]})}
                  max={100}
                  step={5}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="timeline">Timeline</Label>
                <Input
                  id="timeline"
                  value={formData.timeline}
                  onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                  placeholder="e.g., 3+ years"
                />
              </div>
              <div>
                <Label htmlFor="start_year">Start Year</Label>
                <Input
                  id="start_year"
                  type="number"
                  value={formData.start_year}
                  onChange={(e) => setFormData({...formData, start_year: Number(e.target.value)})}
                />
              </div>
              <div>
                <Label htmlFor="projects">Projects Count</Label>
                <Input
                  id="projects"
                  type="number"
                  value={formData.projects}
                  onChange={(e) => setFormData({...formData, projects: Number(e.target.value)})}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  {editingSkill ? 'Update' : 'Add'} Skill
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
        {skills.map((skill) => (
          <Card key={skill.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <h3 className="font-medium">{skill.name}</h3>
                  <p className="text-sm text-muted-foreground">{skill.category}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-32 bg-secondary rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{skill.level}%</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline">{skill.timeline}</Badge>
                    {skill.projects > 0 && (
                      <Badge variant="secondary">{skill.projects} projects</Badge>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => startEdit(skill)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(skill.id)}>
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