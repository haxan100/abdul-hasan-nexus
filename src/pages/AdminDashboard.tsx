import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/ThemeToggle';
import { config } from '@/config';
import ContactManager from '@/components/ContactManager';
import SkillsManager from '@/components/SkillsManager';
import TechnologiesManager from '@/components/TechnologiesManager';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    portfolios: 4,
    experiences: 3,
    skills: 12,
    technologies: 13,
    contacts: 11
  });

  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      navigate('/admin-hasan');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin-hasan');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-background border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">{config.app.name} Admin</h1>
              <Badge variant="outline">v{config.app.version}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button onClick={handleLogout} variant="outline">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.portfolios}</div>
              <p className="text-sm text-muted-foreground">Portfolio Items</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.experiences}</div>
              <p className="text-sm text-muted-foreground">Work Experiences</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.skills}</div>
              <p className="text-sm text-muted-foreground">Technical Skills</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.technologies}</div>
              <p className="text-sm text-muted-foreground">Technologies</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.contacts}</div>
              <p className="text-sm text-muted-foreground">Contact Links</p>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="portfolio" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="technologies">Technologies</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Portfolio Management</h2>
              <Button>Add New Portfolio</Button>
            </div>
            <div className="grid gap-4">
              {[
                { id: 1, title: "E-Commerce Website", status: "Published", featured: true },
                { id: 2, title: "Mobile Banking App", status: "Published", featured: true },
                { id: 3, title: "AI Chatbot Dashboard", status: "Draft", featured: false },
                { id: 4, title: "Real Estate Platform", status: "Published", featured: true }
              ].map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <div className="flex gap-2 mt-2">
                          <Badge variant={item.status === 'Published' ? 'default' : 'secondary'}>
                            {item.status}
                          </Badge>
                          {item.featured && <Badge variant="outline">Featured</Badge>}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="destructive">Delete</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="experience" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Work Experience Management</h2>
              <Button>Add New Experience</Button>
            </div>
            <div className="grid gap-4">
              {[
                { id: 1, company: "Tech Innovators Inc.", position: "Senior Full Stack Developer", current: true },
                { id: 2, company: "Digital Solutions Ltd.", position: "Frontend Developer", current: false },
                { id: 3, company: "StartupXYZ", position: "Junior Web Developer", current: false }
              ].map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{item.position}</h3>
                        <p className="text-sm text-muted-foreground">{item.company}</p>
                        {item.current && <Badge className="mt-2">Current</Badge>}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="destructive">Delete</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-4">
            <SkillsManager />
          </TabsContent>

          <TabsContent value="technologies" className="space-y-4">
            <TechnologiesManager />
          </TabsContent>

          <TabsContent value="contacts" className="space-y-4">
            <ContactManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}