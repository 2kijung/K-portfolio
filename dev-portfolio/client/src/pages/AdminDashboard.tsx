import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { contactApi, projectApi, visitorApi, authApi, profileApi, type ProfileData } from '@/lib/api';
import { Mail, Code, BarChart3, LogOut, User, Save } from 'lucide-react';
import { useLocation } from 'wouter';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState('profile');
  const [contacts, setContacts] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [savingProfile, setSavingProfile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [contactsRes, projectsRes, statsRes, profileRes] = await Promise.all([
        contactApi.getAll(),
        projectApi.getAll(),
        visitorApi.getStats(),
        profileApi.get(),
      ]);

      // 백엔드가 배열 또는 페이지객체({content:[...]})를 줄 수 있어 둘 다 처리
      const toArray = (d: any) => (Array.isArray(d) ? d : (d?.content ?? []));
      if (contactsRes.success) setContacts(toArray(contactsRes.data));
      if (projectsRes.success) setProjects(toArray(projectsRes.data));
      if (statsRes.success) setStats(statsRes.data);
      if (profileRes.success && profileRes.data) setProfile(profileRes.data);
    } catch (error) {
      console.error('Failed to load data:', error);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    authApi.logout();
    setLocation('/');
  };

  // 기본정보 폼 입력 변경
  const updateProfileField = (field: keyof ProfileData, value: string) => {
    setProfile((prev) => ({ ...(prev as ProfileData), [field]: value }));
  };

  // 기본정보 저장 (PUT /api/profile)
  const handleProfileSave = async () => {
    if (!profile) return;
    setSavingProfile(true);
    const res = await profileApi.update(profile);
    setSavingProfile(false);
    if (res.success) {
      toast.success('기본정보가 저장되었습니다. 홈 화면에 반영됩니다.');
      if (res.data) setProfile(res.data);
    } else {
      toast.error('저장 실패: ' + (res.error || res.message || '알 수 없는 오류'));
    }
  };

  // 기본정보 입력 필드 정의 (label, key)
  const profileFields: { label: string; key: keyof ProfileData }[] = [
    { label: '이름', key: 'name' },
    { label: '생년', key: 'birthDate' },
    { label: '거주지', key: 'location' },
    { label: '대학교', key: 'university' },
    { label: '전공', key: 'major' },
    { label: '졸업여부', key: 'graduationStatus' },
    { label: '병역', key: 'militaryStatus' },
    { label: '이메일', key: 'email' },
    { label: 'GitHub 주소', key: 'githubUrl' },
    { label: 'Blog 주소', key: 'blogUrl' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your portfolio content</p>
          </div>
          <Button variant="destructive" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Visitors</p>
                  <p className="text-3xl font-bold">{stats.totalVisitors}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-primary opacity-50" />
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Unique IPs</p>
                  <p className="text-3xl font-bold">{stats.uniqueIPs}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-primary opacity-50" />
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Sessions</p>
                  <p className="text-3xl font-bold">{stats.uniqueSessions}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-primary opacity-50" />
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Page Views</p>
                  <p className="text-3xl font-bold">{stats.pageViews}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-primary opacity-50" />
              </div>
            </Card>
          </div>
        )}

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4" />
              기본정보
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Contacts
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Statistics
            </TabsTrigger>
          </TabsList>

          {/* 기본정보 Tab */}
          <TabsContent value="profile" className="mt-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">기본정보 수정</h2>
              {loading ? (
                <p className="text-muted-foreground">Loading...</p>
              ) : !profile ? (
                <p className="text-muted-foreground">프로필을 불러오지 못했습니다.</p>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {profileFields.map(({ label, key }) => (
                      <div key={key}>
                        <label className="block text-sm text-muted-foreground mb-1">{label}</label>
                        <input
                          type="text"
                          value={(profile[key] as string) ?? ''}
                          onChange={(e) => updateProfileField(key, e.target.value)}
                          className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-1">한줄 소개</label>
                    <textarea
                      value={profile.introduction ?? ''}
                      onChange={(e) => updateProfileField('introduction', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <Button onClick={handleProfileSave} disabled={savingProfile}>
                    <Save className="w-4 h-4 mr-2" />
                    {savingProfile ? '저장 중...' : '저장'}
                  </Button>
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts" className="mt-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Contact Messages</h2>
              {loading ? (
                <p className="text-muted-foreground">Loading...</p>
              ) : contacts.length === 0 ? (
                <p className="text-muted-foreground">No contact messages yet</p>
              ) : (
                <div className="space-y-4">
                  {contacts.map((contact: any) => (
                    <div key={contact.id} className="border border-border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold">{contact.name}</p>
                          <p className="text-sm text-muted-foreground">{contact.email}</p>
                        </div>
                        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                          {contact.status}
                        </span>
                      </div>
                      <p className="font-medium mb-2">{contact.subject}</p>
                      <p className="text-sm text-muted-foreground">{contact.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="mt-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Projects</h2>
              {loading ? (
                <p className="text-muted-foreground">Loading...</p>
              ) : projects.length === 0 ? (
                <p className="text-muted-foreground">No projects yet</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.map((project: any) => (
                    <div key={project.id} className="border border-border rounded-lg p-4">
                      <h3 className="font-semibold mb-2">{project.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.technologies?.split(',').map((tech: string, idx: number) => (
                          <span key={idx} className="text-xs bg-secondary/20 text-secondary-foreground px-2 py-1 rounded">
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">Status: {project.status}</p>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="stats" className="mt-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Detailed Statistics</h2>
              {stats ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-border rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-1">Total Visitors</p>
                      <p className="text-3xl font-bold">{stats.totalVisitors}</p>
                    </div>
                    <div className="border border-border rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-1">Unique IPs</p>
                      <p className="text-3xl font-bold">{stats.uniqueIPs}</p>
                    </div>
                    <div className="border border-border rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-1">Unique Sessions</p>
                      <p className="text-3xl font-bold">{stats.uniqueSessions}</p>
                    </div>
                    <div className="border border-border rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-1">Page Views</p>
                      <p className="text-3xl font-bold">{stats.pageViews}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">No statistics available</p>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
