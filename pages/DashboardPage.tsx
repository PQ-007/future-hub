import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Trophy, 
  Code, 
  Book, 
  Plus, 
  Star, 
  Users, 
  TrendingUp, 
  Calendar,
  Settings,
  Bell,
  Search,
  Eye,
  Heart,
  MessageSquare,
  Share2,
  Edit,
  Trash2,
  Award,
  Target,
  Zap
} from 'lucide-react';

interface DashboardPageProps {
  lang?: "ENG" | "MGL" | "JP";
}

export default function DashboardPage({ lang = "ENG" }: DashboardPageProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  const translations = {
    ENG: {
      welcome: "Welcome back, Batbayar!",
      overview: "Overview",
      projects: "Projects",
      blogs: "Blogs", 
      contests: "Contests",
      flashcards: "Flashcards",
      settings: "Settings",
      totalProjects: "Total Projects",
      totalBlogs: "Blog Posts",
      activeContests: "Active Contests",
      studyCards: "Study Cards",
      recentActivity: "Recent Activity",
      quickActions: "Quick Actions",
      newProject: "New Project",
      newBlog: "New Blog",
      createFlashcards: "Create Flashcards",
      joinContest: "Join Contest",
      myProjects: "My Projects",
      myBlogs: "My Blogs",
      publishedOn: "Published on",
      views: "views",
      likes: "likes",
      comments: "comments",
      edit: "Edit",
      delete: "Delete",
      share: "Share",
      viewAll: "View All",
      achievements: "Achievements",
      learningStreak: "Learning Streak",
      days: "days",
      weeklyGoal: "Weekly Goal",
      completion: "completion"
    },
    MGL: {
      welcome: "Тавтай морилно уу, Батбаяр!",
      overview: "Ерөнхий",
      projects: "Төслүүд",
      blogs: "Блогууд",
      contests: "Тэмцээнүүд", 
      flashcards: "Флешкартууд",
      settings: "Тохиргоо",
      totalProjects: "Нийт Төслүүд",
      totalBlogs: "Блог Нийтлэлүүд",
      activeContests: "Идэвхтэй Тэмцээнүүд",
      studyCards: "Суралцах Картууд",
      recentActivity: "Сүүлийн Үйл Ажиллагаа",
      quickActions: "Түргэн Үйлдлүүд", 
      newProject: "Шинэ Төсөл",
      newBlog: "Шинэ Блог",
      createFlashcards: "Флешкарт Үүсгэх",
      joinContest: "Тэмцээнд Орох",
      myProjects: "Миний Төслүүд",
      myBlogs: "Миний Блогууд",
      publishedOn: "Нийтлэгдсэн огноо",
      views: "үзэлт",
      likes: "таалагдсан",
      comments: "сэтгэгдэл",
      edit: "Засах",
      delete: "Устгах", 
      share: "Хуваалцах",
      viewAll: "Бүгдийг Харах",
      achievements: "Амжилтууд",
      learningStreak: "Суралцах Цуваа",
      days: "хоног",
      weeklyGoal: "7 хоногийн Зорилго",
      completion: "гүйцэтгэл"
    },
    JP: {
      welcome: "おかえりなさい、バットバヤルさん！",
      overview: "概要",
      projects: "プロジェクト", 
      blogs: "ブログ",
      contests: "コンテスト",
      flashcards: "フラッシュカード",
      settings: "設定",
      totalProjects: "総プロジェクト数",
      totalBlogs: "ブログ投稿数",
      activeContests: "アクティブコンテスト",
      studyCards: "学習カード",
      recentActivity: "最近のアクティビティ",
      quickActions: "クイックアクション",
      newProject: "新しいプロジェクト",
      newBlog: "新しいブログ", 
      createFlashcards: "フラッシュカード作成",
      joinContest: "コンテスト参加",
      myProjects: "マイプロジェクト",
      myBlogs: "マイブログ",
      publishedOn: "公開日",
      views: "ビュー",
      likes: "いいね",
      comments: "コメント", 
      edit: "編集",
      delete: "削除",
      share: "シェア",
      viewAll: "すべて表示",
      achievements: "実績",
      learningStreak: "学習継続日数",
      days: "日",
      weeklyGoal: "週間目標",
      completion: "完了率"
    }
  };

  const t = translations[lang];

  const statsData = [
    {
      title: t.totalProjects,
      value: "12",
      icon: <Code className="h-4 w-4" />,
      change: "+2 this week",
      changeType: "positive"
    },
    {
      title: t.totalBlogs,
      value: "8",
      icon: <Book className="h-4 w-4" />,
      change: "+1 this week", 
      changeType: "positive"
    },
    {
      title: t.activeContests,
      value: "3",
      icon: <Trophy className="h-4 w-4" />,
      change: "2 ending soon",
      changeType: "neutral"
    },
    {
      title: t.studyCards,
      value: "247",
      icon: <Zap className="h-4 w-4" />,
      change: "+15 today",
      changeType: "positive"
    }
  ];

  const recentActivity = [
    {
      type: "contest_win",
      title: "Won Summer Hackathon",
      description: "First place with AlgoRush project",
      timestamp: "2 hours ago",
      icon: <Trophy className="h-4 w-4 text-yellow-500" />
    },
    {
      type: "blog_publish", 
      title: "Published new blog post",
      description: "How I built an automatic timeline",
      timestamp: "1 day ago",
      icon: <Book className="h-4 w-4 text-blue-500" />
    },
    {
      type: "flashcard_create",
      title: "Generated flashcards",
      description: "15 cards from AI in Everyday Life article",
      timestamp: "2 days ago", 
      icon: <Zap className="h-4 w-4 text-green-500" />
    },
    {
      type: "project_start",
      title: "Started AlgoRush prototype",
      description: "Connected demo to contest system",
      timestamp: "5 days ago",
      icon: <Code className="h-4 w-4 text-purple-500" />
    }
  ];

  const projects = [
    {
      id: 1,
      title: "AlgoRush",
      description: "Graph-algorithm visualizer game",
      status: "Published",
      views: 1247,
      likes: 89,
      comments: 23,
      lastUpdated: "Aug 10, 2025",
      tags: ["JavaScript", "React", "Algorithms"]
    },
    {
      id: 2,
      title: "Super Portfolio", 
      description: "Multilingual student portfolios",
      status: "Draft",
      views: 0,
      likes: 0,
      comments: 0,
      lastUpdated: "Aug 8, 2025",
      tags: ["React", "i18n", "Portfolio"]
    },
    {
      id: 3,
      title: "FlashCard Sync",
      description: "Audio-driven review and OCR import",
      status: "Published",
      views: 623,
      likes: 34,
      comments: 12,
      lastUpdated: "Aug 5, 2025", 
      tags: ["Python", "OCR", "Audio"]
    }
  ];

  const blogs = [
    {
      id: 1,
      title: "The Future of AI in Education",
      excerpt: "Exploring how AI can revolutionize learning experiences...",
      publishedOn: "Aug 1, 2025",
      views: 2341,
      likes: 156,
      comments: 42,
      readTime: "5 min read",
      status: "Published"
    },
    {
      id: 2,
      title: "Building Scalable Web Apps",
      excerpt: "Tips and tricks for modern development practices...",
      publishedOn: "Jul 28, 2025", 
      views: 1876,
      likes: 98,
      comments: 31,
      readTime: "8 min read",
      status: "Published"
    },
    {
      id: 3,
      title: "Mastering Data Structures",
      excerpt: "Essential concepts every programmer should know...",
      publishedOn: "Jul 15, 2025",
      views: 3124,
      likes: 234,
      comments: 67,
      readTime: "12 min read",
      status: "Published"
    }
  ];

  const achievements = [
    { title: "First Contest Win", icon: <Trophy className="h-5 w-5 text-yellow-500" />, date: "Aug 10" },
    { title: "10 Projects Published", icon: <Code className="h-5 w-5 text-blue-500" />, date: "Aug 5" },
    { title: "100 Study Cards", icon: <Zap className="h-5 w-5 text-green-500" />, date: "Jul 30" },
    { title: "Community Helper", icon: <Users className="h-5 w-5 text-purple-500" />, date: "Jul 20" }
  ];

  return (
    <div className="min-h-screen bg-background">
      

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
          <nav className="space-y-2 p-4">
            <h2 className="mb-4 text-lg font-semibold">{t.welcome}</h2>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical" className="w-full">
              <TabsList className="grid w-full grid-cols-1 h-auto gap-1 bg-transparent p-0">
                <TabsTrigger value="overview" className="justify-start w-full">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  {t.overview}
                </TabsTrigger>
                <TabsTrigger value="projects" className="justify-start w-full">
                  <Code className="mr-2 h-4 w-4" />
                  {t.projects}
                </TabsTrigger>
                <TabsTrigger value="blogs" className="justify-start w-full">
                  <Book className="mr-2 h-4 w-4" />
                  {t.blogs}
                </TabsTrigger>
                <TabsTrigger value="contests" className="justify-start w-full">
                  <Trophy className="mr-2 h-4 w-4" />
                  {t.contests}
                </TabsTrigger>
                <TabsTrigger value="flashcards" className="justify-start w-full">
                  <Zap className="mr-2 h-4 w-4" />
                  {t.flashcards}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {statsData.map((stat, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                      {stat.icon}
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className="text-xs text-muted-foreground">
                        {stat.change}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>{t.quickActions}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <Plus className="mr-2 h-4 w-4" />
                      {t.newProject}
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Plus className="mr-2 h-4 w-4" />
                      {t.newBlog}
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Zap className="mr-2 h-4 w-4" />
                      {t.createFlashcards}
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Trophy className="mr-2 h-4 w-4" />
                      {t.joinContest}
                    </Button>
                  </CardContent>
                </Card>

                {/* Learning Progress */}
                <Card>
                  <CardHeader>
                    <CardTitle>Learning Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-sm">
                        <span>{t.learningStreak}</span>
                        <span className="font-medium">23 {t.days}</span>
                      </div>
                      <Progress value={76} className="mt-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm">
                        <span>{t.weeklyGoal}</span>
                        <span className="font-medium">87% {t.completion}</span>
                      </div>
                      <Progress value={87} className="mt-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                {/* Recent Activity */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>{t.recentActivity}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="mt-1">{activity.icon}</div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium">{activity.title}</p>
                            <p className="text-sm text-muted-foreground">{activity.description}</p>
                            <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Achievements */}
                <Card>
                  <CardHeader>
                    <CardTitle>{t.achievements}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          {achievement.icon}
                          <div className="flex-1">
                            <p className="text-sm font-medium">{achievement.title}</p>
                            <p className="text-xs text-muted-foreground">{achievement.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">{t.myProjects}</h2>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  {t.newProject}
                </Button>
              </div>

              <div className="grid gap-4">
                {projects.map((project) => (
                  <Card key={project.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{project.title}</CardTitle>
                          <CardDescription>{project.description}</CardDescription>
                        </div>
                        <Badge variant={project.status === 'Published' ? 'default' : 'secondary'}>
                          {project.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <Eye className="mr-1 h-3 w-3" />
                            {project.views} {t.views}
                          </span>
                          <span className="flex items-center">
                            <Heart className="mr-1 h-3 w-3" />
                            {project.likes} {t.likes}
                          </span>
                          <span className="flex items-center">
                            <MessageSquare className="mr-1 h-3 w-3" />
                            {project.comments} {t.comments}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3 mr-1" />
                            {t.edit}
                          </Button>
                          <Button size="sm" variant="outline">
                            <Share2 className="h-3 w-3 mr-1" />
                            {t.share}
                          </Button>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {project.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Blogs Tab */}
            <TabsContent value="blogs" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">{t.myBlogs}</h2>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  {t.newBlog}
                </Button>
              </div>

              <div className="grid gap-4">
                {blogs.map((blog) => (
                  <Card key={blog.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{blog.title}</CardTitle>
                          <CardDescription>{blog.excerpt}</CardDescription>
                        </div>
                        <Badge>{blog.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-4">
                          <span>{t.publishedOn} {blog.publishedOn}</span>
                          <span>{blog.readTime}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <Eye className="mr-1 h-3 w-3" />
                            {blog.views}
                          </span>
                          <span className="flex items-center">
                            <Heart className="mr-1 h-3 w-3" />
                            {blog.likes}
                          </span>
                          <span className="flex items-center">
                            <MessageSquare className="mr-1 h-3 w-3" />
                            {blog.comments}
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3 mr-1" />
                          {t.edit}
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="h-3 w-3 mr-1" />
                          {t.share}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Contests Tab */}
            <TabsContent value="contests" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Contest Dashboard</h2>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Contest
                </Button>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
                      Summer Hackathon
                    </CardTitle>
                    <CardDescription>Graph algorithms & data visualization</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Status:</span>
                        <Badge className="bg-green-100 text-green-800">Won 1st Place</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Participants:</span>
                        <span>127</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Prize:</span>
                        <span>$500 + Certificate</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Trophy className="mr-2 h-5 w-5 text-blue-500" />
                      AI Innovation Challenge
                    </CardTitle>
                    <CardDescription>Build the next generation AI tool</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Status:</span>
                        <Badge variant="outline">Ongoing</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Deadline:</span>
                        <span>Sep 15, 2025</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Prize Pool:</span>
                        <span>$2,000</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4" variant="outline">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Flashcards Tab */}
            <TabsContent value="flashcards" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">My Flashcard Decks</h2>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  {t.createFlashcards}
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>AI Concepts</CardTitle>
                    <CardDescription>Machine learning fundamentals</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Cards:</span>
                        <span>24</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Mastered:</span>
                        <span>18/24</span>
                      </div>
                      <Progress value={75} className="mt-2" />
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" className="flex-1">Study</Button>
                      <Button size="sm" variant="outline">Edit</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Study Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle>Study Statistics</CardTitle>
                  <CardDescription>Your learning progress this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">156</div>
                      <div className="text-sm text-muted-foreground">Cards Studied</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">23</div>
                      <div className="text-sm text-muted-foreground">Days Streak</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">87%</div>
                      <div className="text-sm text-muted-foreground">Accuracy Rate</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Flashcard Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Generated 15 cards from "AI in Education"</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                      <Badge variant="outline">Auto-generated</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Completed study session: Data Structures</p>
                        <p className="text-xs text-muted-foreground">1 day ago</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Mastered 5 cards</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Created custom deck: Mongolian History</p>
                        <p className="text-xs text-muted-foreground">3 days ago</p>
                      </div>
                      <Badge variant="outline">Custom</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Traditional Mongolian Script Display */}
      <div className="fixed bottom-4 right-4 opacity-20 hover:opacity-60 transition-opacity">
        <p
          lang="mn-Mong"
          className="font-[Noto_Sans_Mongolian] [writing-mode:vertical-lr] [text-orientation:mixed] text-lg leading-snug text-muted-foreground"
        >
          ᠶᠠᠭᠤ ᠴᠤ ᠣᠷᠤ ᠦᢉᠡᠢ ᠬᠣᠭᠤᠰᠤᠨ ᠠ᠋ᠴᠠ ᠡᢉᠦᠰᠳᠡᢉ ᠦᢉᠡᠢ᠂ ᠬᠤᠪᠢ ᠲᠠᠪᠢᠯᠠᠩ ᠵᠣᠷᠢᠭᠲᠤ ᠨᠢᢉᠡᠨ ᠢ᠋ ᠲᠡᠳᢈᠦᠳᠡᢉ᠃
        </p>
      </div>
    </div>
  );
}
