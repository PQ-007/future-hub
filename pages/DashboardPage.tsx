"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Activity,
  Award,
  Bell,
  BookOpen,
  Brain,
  Calendar,
  Clock,
  Code2,
  Edit,
  Eye,
  Flame,
  Heart,
  MessageSquare,
  Plus,
  Settings,
  Share2,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Zap
} from 'lucide-react';
import { useState } from 'react';

interface DashboardPageProps {
  lang?: "ENG" | "MGL" | "JP";
}

export default function DashboardPage({ lang = "ENG" }: DashboardPageProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const translations = {
    ENG: {
      welcome: "Welcome back, Bilguuntushig!",
      overview: "Overview",
      quickActions: "Quick Actions",
      newProject: "New Project",
      newBlog: "New Blog Post",
      createFlashcards: "Create Flashcards",
      joinContest: "Join Contest",
      recentActivity: "Recent Activity",
      achievements: "Recent Achievements",
      learningProgress: "Learning Progress",
      learningStreak: "Learning Streak",
      weeklyGoal: "Weekly Goal",
      days: "days",
      completion: "completion",
      myProjects: "My Projects",
      myBlogs: "My Blog Posts",
      publishedOn: "Published on",
      views: "views",
      likes: "likes",
      comments: "comments",
      edit: "Edit",
      share: "Share",
      studyStats: "Study Statistics",
      cardsStudied: "Cards Studied",
      accuracy: "Accuracy Rate",
      totalProjects: "Total Projects",
      blogPosts: "Blog Posts",
      activeContests: "Active Contests",
      studyCards: "Study Cards",
      contestDashboard: "Contest Dashboard",
      flashcardDecks: "My Flashcard Decks",
      projects: "Projects",
      blogs: "Blogs",
      contests: "Contests",
      flashcards: "Flashcards"
    },
    MGL: {
      welcome: "Тавтай морилно уу, Батбаяр!",
      overview: "Ерөнхий",
      quickActions: "Түргэн үйлдлүүд",
      newProject: "Шинэ төсөл",
      newBlog: "Шинэ блог",
      createFlashcards: "Флешкарт үүсгэх",
      joinContest: "Тэмцээнд орох",
      recentActivity: "Сүүлийн үйл ажиллагаа",
      achievements: "Амжилтууд",
      learningProgress: "Суралцах явц",
      learningStreak: "Суралцах цуваа",
      weeklyGoal: "7 хоногийн зорилго",
      days: "хоног",
      completion: "гүйцэтгэл",
      myProjects: "Миний төслүүд",
      myBlogs: "Миний блогууд",
      publishedOn: "Нийтлэгдсэн огноо",
      views: "үзэлт",
      likes: "таалагдсан",
      comments: "сэтгэгдэл",
      edit: "Засах",
      share: "Хуваалцах",
      studyStats: "Суралцах статистик",
      cardsStudied: "Судалсан картууд",
      accuracy: "Нарийвчлал",
      totalProjects: "Нийт төслүүд",
      blogPosts: "Блог нийтлэлүүд",
      activeContests: "Идэвхтэй тэмцээнүүд",
      studyCards: "Суралцах картууд",
      contestDashboard: "Тэмцээний самбар",
      flashcardDecks: "Флешкарт багцууд",
      projects: "Төслүүд",
      blogs: "Блогууд",
      contests: "Тэмцээнүүд",
      flashcards: "Флешкартууд"
    },
    JP: {
      welcome: "お帰りなさい、バットバヤルさん！",
      overview: "概要",
      quickActions: "クイックアクション",
      newProject: "新しいプロジェクト",
      newBlog: "新しいブログ",
      createFlashcards: "フラッシュカード作成",
      joinContest: "コンテスト参加",
      recentActivity: "最近のアクティビティ",
      achievements: "実績",
      learningProgress: "学習進捗",
      learningStreak: "学習継続日数",
      weeklyGoal: "週間目標",
      days: "日",
      completion: "完了率",
      myProjects: "マイプロジェクト",
      myBlogs: "マイブログ",
      publishedOn: "公開日",
      views: "ビュー",
      likes: "いいね",
      comments: "コメント",
      edit: "編集",
      share: "シェア",
      studyStats: "学習統計",
      cardsStudied: "学習したカード",
      accuracy: "正答率",
      totalProjects: "総プロジェクト数",
      blogPosts: "ブログ投稿数",
      activeContests: "アクティブコンテスト",
      studyCards: "学習カード",
      contestDashboard: "コンテストダッシュボード",
      flashcardDecks: "フラッシュカードデッキ",
      projects: "プロジェクト",
      blogs: "ブログ",
      contests: "コンテスト",
      flashcards: "フラッシュカード"
    }
  };

  const t = translations[lang];

  const statsData = [
    {
      title: t.totalProjects,
      value: "12",
      icon: <Code2 className="h-4 w-4" />,
      change: "+2 this week",
      changeType: "positive"
    },
    {
      title: t.blogPosts,
      value: "8",
      icon: <BookOpen className="h-4 w-4" />,
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
      icon: <Brain className="h-4 w-4" />,
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
      icon: <BookOpen className="h-4 w-4 text-blue-500" />
    },
    {
      type: "flashcard_create",
      title: "Generated flashcards",
      description: "15 cards from AI in Everyday Life article",
      timestamp: "2 days ago", 
      icon: <Brain className="h-4 w-4 text-green-500" />
    },
    {
      type: "project_start",
      title: "Started AlgoRush prototype",
      description: "Connected demo to contest system",
      timestamp: "5 days ago",
      icon: <Code2 className="h-4 w-4 text-purple-500" />
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
    { title: "10 Projects Published", icon: <Code2 className="h-5 w-5 text-blue-500" />, date: "Aug 5" },
    { title: "100 Study Cards", icon: <Brain className="h-5 w-5 text-green-500" />, date: "Jul 30" },
    { title: "Community Helper", icon: <Users className="h-5 w-5 text-purple-500" />, date: "Jul 20" }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">{t.welcome}</h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your projects and learning today.
          </p>
        </div>
        
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className="bg-primary/10 p-2 rounded-lg">
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
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
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              {t.quickActions}
            </CardTitle>
            <CardDescription>Start something new or continue your work</CardDescription>
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
              <Brain className="mr-2 h-4 w-4" />
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
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              {t.learningProgress}
            </CardTitle>
            <CardDescription>Your learning journey this week</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="flex items-center gap-2">
                  <Flame className="h-4 w-4 text-orange-500" />
                  {t.learningStreak}
                </span>
                <span className="font-medium">23 {t.days}</span>
              </div>
              <Progress value={76} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-blue-500" />
                  {t.weeklyGoal}
                </span>
                <span className="font-medium">87% {t.completion}</span>
              </div>
              <Progress value={87} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              {t.recentActivity}
            </CardTitle>
            <CardDescription>Your latest accomplishments and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                  <div className="bg-background p-2 rounded-lg border">
                    {activity.icon}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              {t.achievements}
            </CardTitle>
            <CardDescription>Your recent milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 bg-muted/30 rounded-lg">
                  <div className="bg-background p-2 rounded-lg border">
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{achievement.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">{achievement.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Projects */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Code2 className="h-5 w-5" />
                {t.myProjects}
              </CardTitle>
              <CardDescription>Your latest development work</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {projects.slice(0, 2).map((project) => (
              <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium">{project.title}</h4>
                    <Badge variant={project.status === 'Published' ? 'default' : 'secondary'}>
                      {project.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {project.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      {project.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" />
                      {project.comments}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Button size="sm" variant="outline">
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Share2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Blog Posts */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                {t.myBlogs}
              </CardTitle>
              <CardDescription>Your published articles and thoughts</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {blogs.slice(0, 2).map((blog) => (
              <div key={blog.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium">{blog.title}</h4>
                    <Badge>{blog.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{blog.excerpt}</p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>{blog.publishedOn}</span>
                    <span>{blog.readTime}</span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {blog.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      {blog.likes}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Button size="sm" variant="outline">
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Share2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Traditional Mongolian Script Display */}
      <div className="fixed bottom-4 right-4 opacity-20 hover:opacity-60 transition-opacity">
        <p
          lang="mn-Mong"
          className="font-[Noto_Sans_Mongolian] [writing-mode:vertical-lr] [text-orientation:mixed] text-lg leading-snug text-muted-foreground"
        >
          ᠰᠤᠭᠤᠷᠡᠲᠠ ᠢᠨᠵᠢᠨᠢᠷ ᠪᠠᠲᠪᠠᠶᠠᠷ ᠤᠨ ᠰᠤᠷᠭᠠᠨ ᠬᠦᠮᠦᠵᠢᠯ ᠤᠨ ᠰᠠᠮᠪᠠᠷ
        </p>
      </div>
    </div>
  );
}