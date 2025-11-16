import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { api } from '@/lib/api';

interface HireRequest {
  id: number;
  name: string;
  email: string;
  company: string;
  position: string;
  message: string;
  budget: string;
  timeline: string;
  contact_method: string;
  status: string;
  created_at: string;
}

export default function HireRequestsManager() {
  const [requests, setRequests] = useState<HireRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const result = await api.getHireRequests();
      if (result.success) {
        setRequests(result.data);
      }
    } catch (error) {
      console.error('Error loading hire requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      await api.updateHireRequestStatus(id, status);
      loadRequests();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'new': return 'default';
      case 'contacted': return 'secondary';
      case 'in_discussion': return 'outline';
      case 'accepted': return 'default';
      case 'declined': return 'destructive';
      default: return 'outline';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div>Loading hire requests...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Hire Requests Management</h2>
        <Badge variant="outline">{requests.length} total requests</Badge>
      </div>
      
      <div className="grid gap-4">
        {requests.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No hire requests yet.</p>
            </CardContent>
          </Card>
        ) : (
          requests.map((request) => (
            <Card key={request.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium text-lg">{request.name}</h3>
                      <Badge variant={getStatusBadgeVariant(request.status)}>
                        {request.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-muted-foreground">Email:</span> {request.email}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Company:</span> {request.company || 'N/A'}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Position:</span> {request.position || 'N/A'}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Contact:</span> {request.contact_method}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Budget:</span> {request.budget || 'N/A'}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Timeline:</span> {request.timeline || 'N/A'}
                      </div>
                    </div>

                    {request.message && (
                      <div className="mb-3">
                        <span className="text-muted-foreground text-sm">Message:</span>
                        <p className="text-sm mt-1 p-2 bg-secondary/50 rounded">{request.message}</p>
                      </div>
                    )}

                    <div className="text-xs text-muted-foreground">
                      Submitted: {formatDate(request.created_at)}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 ml-4">
                    <Select 
                      value={request.status} 
                      onValueChange={(value) => updateStatus(request.id, value)}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="in_discussion">In Discussion</SelectItem>
                        <SelectItem value="accepted">Accepted</SelectItem>
                        <SelectItem value="declined">Declined</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => window.open(`mailto:${request.email}?subject=Re: ${request.position || 'Your Hire Request'}`)}
                    >
                      Reply
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}