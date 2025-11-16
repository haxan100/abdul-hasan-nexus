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

interface Contact {
  id: number;
  platform: string;
  url: string;
  username: string;
  icon: string;
  color: string;
  description: string;
  type: string;
  followers: number;
}

export default function ContactManager() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [formData, setFormData] = useState({
    platform: '',
    url: '',
    username: '',
    icon: '',
    color: '#000000',
    description: '',
    type: 'Social',
    followers: 0
  });

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const result = await api.getContacts();
      if (result.success) {
        const allContacts = [
          ...result.data.social_media,
          ...result.data.professional,
          ...result.data.portfolio
        ];
        setContacts(allContacts);
      }
    } catch (error) {
      console.error('Error loading contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingContact) {
        await api.updateContact(editingContact.id, formData);
      } else {
        await api.addContact(formData);
      }
      loadContacts();
      resetForm();
    } catch (error) {
      console.error('Error saving contact:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      try {
        await api.deleteContact(id);
        loadContacts();
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      platform: '',
      url: '',
      username: '',
      icon: '',
      color: '#000000',
      description: '',
      type: 'Social',
      followers: 0
    });
    setEditingContact(null);
    setIsAddDialogOpen(false);
  };

  const startEdit = (contact: Contact) => {
    setFormData(contact);
    setEditingContact(contact);
    setIsAddDialogOpen(true);
  };

  if (loading) {
    return <div>Loading contacts...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Contact Links Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>Add New Contact</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingContact ? 'Edit Contact' : 'Add New Contact'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="platform">Platform</Label>
                <Input
                  id="platform"
                  value={formData.platform}
                  onChange={(e) => setFormData({...formData, platform: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({...formData, url: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Social">Social</SelectItem>
                    <SelectItem value="Professional">Professional</SelectItem>
                    <SelectItem value="Contact">Contact</SelectItem>
                    <SelectItem value="Portfolio">Portfolio</SelectItem>
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
                <Label htmlFor="followers">Followers</Label>
                <Input
                  id="followers"
                  type="number"
                  value={formData.followers}
                  onChange={(e) => setFormData({...formData, followers: Number(e.target.value)})}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  {editingContact ? 'Update' : 'Add'} Contact
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
        {contacts.map((contact) => (
          <Card key={contact.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{contact.platform}</h3>
                  <p className="text-sm text-muted-foreground truncate max-w-xs">{contact.url}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline">{contact.type}</Badge>
                    {contact.followers > 0 && (
                      <Badge variant="secondary">{contact.followers} followers</Badge>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => startEdit(contact)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(contact.id)}>
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