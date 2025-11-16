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
import ExperienceManager from '@/components/ExperienceManager';
import HireRequestsManager from '@/components/HireRequestsManager';
import { api } from '@/lib/api';

// Portfolio List Component
const PortfolioList = () => {
  const navigate = useNavigate();
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      const response = await api.getPortfolios();
      if (response.success) {
        setPortfolios(response.data);
      }
    } catch (error) {
      console.error('Error loading portfolios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin mau hapus portfolio ini?')) {
      try {
        await api.deletePortfolio(id);
        fetchPortfolios();
      } catch (error) {
        console.error('Error deleting portfolio:', error);
      }
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading portfolios...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Portfolio Management</h2>
        <Button onClick={() => navigate('/admin-hasan/portfolio/new')}>
          <span className="mr-2">+</span>
          Tambah Portfolio
        </Button>
      </div>
      
      <div className="grid gap-4">
        {portfolios.map((portfolio) => (
          <Card key={portfolio.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img 
                  src={portfolio.cover_image?.startsWith('http') ? portfolio.cover_image : `http://localhost:3000${portfolio.cover_image}`} 
                  alt={portfolio.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{portfolio.title}</h3>
                  <p className="text-gray-600 text-sm mb-2 max-w-md line-clamp-2">
                    {portfolio.description}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {portfolio.technologies?.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {portfolio.technologies?.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{portfolio.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate(`/admin-hasan/portfolio/${portfolio.id}`)}
                >
                  Edit
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleDelete(portfolio.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    portfolios: 0,
    experiences: 0,
    skills: 0,
    technologies: 0,
    contacts: 0,
    hireRequests: 0
  });

  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      navigate('/admin-hasan');
    }
    loadStats();
  }, [navigate]);

  const loadStats = async () => {
    try {
      // Load all stats from APIs
      const [portfolioResult, experienceResult, skillsResult, technologiesResult, contactsResult, hireRequestsResult] = await Promise.all([
        api.getPortfolios?.() || Promise.resolve({ success: false }),
        api.getExperiences(),
        api.getSkills(),
        api.getTechnologies(),
        api.getContacts(),
        api.getHireRequests()
      ]);

      setStats({
        portfolios: portfolioResult.success ? (portfolioResult.total || portfolioResult.data?.length || 0) : 4,
        experiences: experienceResult.success ? (experienceResult.total || experienceResult.data?.length || 0) : 3,
        skills: skillsResult.success ? (skillsResult.totalSkills || Object.values(skillsResult.data || {}).flat().length || 0) : 8,
        technologies: technologiesResult.success ? (technologiesResult.totalTechnologies || Object.values(technologiesResult.data || {}).flat().length || 0) : 10,
        contacts: contactsResult.success ? (contactsResult.totalLinks || Object.values(contactsResult.data || {}).flat().length || 0) : 11,
        hireRequests: hireRequestsResult.success ? (hireRequestsResult.total || hireRequestsResult.data?.length || 0) : 0
      });
    } catch (error) {
      console.error('Error loading stats:', error);
      // Keep default values if API fails
    }
  };

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
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
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
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.hireRequests}</div>
              <p className="text-sm text-muted-foreground">Hire Requests</p>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="portfolio" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="technologies">Technologies</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="hire-requests">Hire Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio" className="space-y-4">
            <PortfolioList />
          </TabsContent>

          <TabsContent value="experience" className="space-y-4">
            <ExperienceManager />
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

          <TabsContent value="hire-requests" className="space-y-4">
            <HireRequestsManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}