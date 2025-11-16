import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { api } from '@/lib/api';

export default function HireMe() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    position: '',
    message: '',
    budget: '',
    timeline: '',
    contact_method: 'email'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await api.submitHireRequest(formData);
      if (result.success) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          company: '',
          position: '',
          message: '',
          budget: '',
          timeline: '',
          contact_method: 'email'
        });
      }
    } catch (error) {
      console.error('Error submitting hire request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
          <p className="text-muted-foreground mb-4">
            Your hiring request has been submitted successfully. I will get back to you within 24 hours.
          </p>
          <Button onClick={() => setSubmitted(false)}>
            Submit Another Request
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Hire Me</CardTitle>
        <p className="text-center text-muted-foreground">
          Interested in working together? Let's discuss your project!
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="position">Position/Role</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => setFormData({...formData, position: e.target.value})}
                placeholder="e.g., Full Stack Developer"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="budget">Budget Range</Label>
              <Select value={formData.budget} onValueChange={(value) => setFormData({...formData, budget: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="< $5,000">< $5,000</SelectItem>
                  <SelectItem value="$5,000 - $10,000">$5,000 - $10,000</SelectItem>
                  <SelectItem value="$10,000 - $25,000">$10,000 - $25,000</SelectItem>
                  <SelectItem value="$25,000 - $50,000">$25,000 - $50,000</SelectItem>
                  <SelectItem value="$50,000+">$50,000+</SelectItem>
                  <SelectItem value="Discuss">Let's Discuss</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="timeline">Timeline</Label>
              <Select value={formData.timeline} onValueChange={(value) => setFormData({...formData, timeline: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ASAP">ASAP</SelectItem>
                  <SelectItem value="1-2 weeks">1-2 weeks</SelectItem>
                  <SelectItem value="1 month">1 month</SelectItem>
                  <SelectItem value="2-3 months">2-3 months</SelectItem>
                  <SelectItem value="3+ months">3+ months</SelectItem>
                  <SelectItem value="Flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="contact_method">Preferred Contact Method</Label>
            <Select value={formData.contact_method} onValueChange={(value) => setFormData({...formData, contact_method: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="phone">Phone Call</SelectItem>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="message">Project Details *</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              placeholder="Tell me about your project, requirements, and what you're looking for..."
              rows={5}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Send Hire Request'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}