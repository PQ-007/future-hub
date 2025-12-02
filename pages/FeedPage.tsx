import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  ArrowDown,
  ArrowUp,
  Award,
  Bookmark,
  BookOpen,
  CheckCircle2,
  Clock,
  Code,
  Heart,
  Minus,
  MoreHorizontal,
  Sparkles,
  TrendingUp,
  Trophy,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";

// --- (Omitted data arrays for brevity, they remain unchanged) ---

export default function FeedPage() {
  const { t } = useLanguage();
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("all");
  const [likedItems, setLikedItems] = useState(new Set(["2", "4"]));
  const [bookmarkedItems, setBookmarkedItems] = useState(
    new Set(["1", "3", "5"])
  );
  const [filterOpen, setFilterOpen] = useState(false);
  const [readingList, setReadingList] = useState(new Set());
  const [showQuickActions, setShowQuickActions] = useState<string | null>(null);

  // Existing data arrays (feedItems, leaderboard, trendingTopics) are used here.
  // Pasting them again would make the response too long, so I'll trust they are available in the context.

  const feedItems = [
    {
      id: "1",
      day: 1,
      type: "project",
      author: {
        name: "Sarah Chen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        username: "@sarahchen",
        verified: true,
        reputation: 2450,
        contributions: 352,
      },
      timestamp: "Dec 1, 2025",
      readTime: "8 min",
      content: {
        title: "AlgoViz - Interactive Algorithm Visualizer",
        description:
          "Built a new tool to help students understand sorting algorithms through interactive visualizations. Features include step-by-step execution, code highlighting, and complexity analysis.",
        image:
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
        tags: ["React", "D3.js", "Education", "Algorithms"],
      },
      stats: {
        likes: 234,
        comments: 45,
        views: 1200,
        shares: 23,
      },
      featured: false,
      trending: true,
    },
    {
      id: "2",
      day: 2,
      type: "blog",
      author: {
        name: "Mike Rodriguez",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
        username: "@mikecodes",
        verified: true,
        reputation: 3200,
        contributions: 310,
      },
      timestamp: "Dec 2, 2025",
      readTime: "12 min",
      content: {
        title: "10 Advanced React Patterns You Should Know",
        description:
          "Dive deep into compound components, render props, custom hooks, and more. Learn how to write cleaner, more maintainable React code with these proven patterns.",
        tags: ["React", "JavaScript", "Tutorial"],
      },
      stats: {
        likes: 567,
        comments: 89,
        views: 3400,
        shares: 78,
      },
      featured: true,
      trending: true,
    },
    {
      id: "3",
      day: 3,
      type: "contest",
      author: {
        name: "CodeMasters",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Code",
        username: "@codemasters",
        verified: true,
        reputation: 5600,
        contributions: 186,
      },
      timestamp: "Dec 3, 2025",
      readTime: "5 min",
      deadline: "3 days left",
      content: {
        title: "Summer Coding Challenge 2025",
        description:
          "Join our biggest coding competition yet! Solve algorithmic problems, compete with developers worldwide, and win amazing prizes. Registration closes in 3 days.",
        image:
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
        tags: ["Contest", "Algorithms"],
      },
      stats: {
        likes: 890,
        comments: 156,
        views: 5600,
        shares: 234,
      },
      featured: false,
      trending: false,
    },
    {
      id: "4",
      day: 4,
      type: "achievement",
      author: {
        name: "Alex Kim",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        username: "@alexkim",
        verified: false,
        reputation: 1200,
        contributions: 215,
      },
      timestamp: "Dec 4, 2025",
      readTime: "3 min",
      content: {
        title: "Completed 100-Day Coding Streak!",
        description:
          "Finally hit 100 consecutive days of coding! Learned so much about consistency and building habits. Special thanks to the community for the support!",
        tags: ["Achievement", "Motivation"],
      },
      stats: {
        likes: 445,
        comments: 67,
        views: 1800,
      },
      featured: false,
      trending: false,
    },
    {
      id: "5",
      day: 5,
      type: "flashcard",
      author: {
        name: "Emma Wilson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
        username: "@emmawilson",
        verified: true,
        reputation: 1800,
        contributions: 154,
      },
      timestamp: "Dec 5, 2025",
      readTime: "15 min",
      content: {
        title: "JavaScript Interview Prep - 50 Essential Questions",
        description:
          "Created a comprehensive flashcard deck covering closures, async/await, prototypes, and more. Perfect for technical interviews!",
        tags: ["JavaScript", "Interview"],
      },
      stats: {
        likes: 678,
        comments: 92,
        views: 2900,
        shares: 145,
      },
      featured: false,
      trending: true,
    },
  ];

  const leaderboard = [
    {
      rank: 1,
      name: "Билгүүнтүшиг",
      avatar: "https://robohash.org/Alexandra",
      points: 12450,
      change: 0,
    },
    {
      rank: 2,
      name: "Батсуурь",
      avatar: "https://robohash.org/David",
      points: 11230,
      change: 2,
    },
    {
      rank: 3,
      name: "З.Дөлгөөн",
      avatar: "https://robohash.org/SarahJ",
      points: 10890,
      change: -1,
    },
    {
      rank: 4,
      name: "Цэлмэг",
      avatar: "https://robohash.org/MikeZ",
      points: 9560,
      change: 1,
    },
    {
      rank: 5,
      name: "Төгөлдөр",
      avatar: "https://robohash.org/Emily",
      points: 8920,
      change: -2,
    },
  ];

  const trendingTopics = [
    { id: "1", name: "React 19", posts: 1234, trend: "up" },
    { id: "2", name: "Machine Learning", posts: 987, trend: "up" },
    { id: "3", name: "Web3", posts: 756, trend: "stable" },
    { id: "4", name: "TypeScript", posts: 654, trend: "up" },
    { id: "5", name: "System Design", posts: 543, trend: "down" },
  ];

  const getTypeIcon = (
    type: "project" | "blog" | "contest" | "flashcard" | "achievement"
  ) => {
    const icons = {
      project: Code,
      blog: BookOpen,
      contest: Trophy,
      flashcard: Zap,
      achievement: Award,
    } as const;
    const Icon = icons[type];
    return <Icon className="h-3.5 w-3.5" />;
  };

  const toggleLike = (id: string) => {
    setLikedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const toggleReadingList = (id: unknown) => {
    setReadingList((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
    setShowQuickActions(null);
  };

  const handleMoreClick = (id: string | null) => {
    setShowQuickActions((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto px-4 lg:px-8 py-6 lg:py-3 max-w-8xl">
        {/* Banner for Advent Calendar */}
        <div className="mb-8 p-4 rounded-lg border border-border/40">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-xl font-bold text-foreground">
                {t("common.welcome")} 
              </h2>
              <p className="text-sm text-muted-foreground">
                {t("common.moto")}
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4" />
            </div>
          </div>
        </div>
        <div className="flex gap-8 xl:gap-12">
          {/* Main Feed */}
          <div className="flex-1 max-w-5xl">
            {/* Category Tabs like Qiita */}
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="mb-6"
            >
              <TabsList className="h-10 bg-muted/40 backdrop-blur-sm flex-wrap gap-1">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-background data-[state=active]:shadow-sm px-3 py-1 text-xs"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="nextjs"
                  className="data-[state=active]:bg-background data-[state=active]:shadow-sm px-3 py-1 text-xs"
                >
                  Next.js
                </TabsTrigger>
                <TabsTrigger
                  value="ai"
                  className="data-[state=active]:bg-background data-[state=active]:shadow-sm px-3 py-1 text-xs"
                >
                  AI
                </TabsTrigger>
                <TabsTrigger
                  value="python"
                  className="data-[state=active]:bg-background data-[state=active]:shadow-sm px-3 py-1 text-xs"
                >
                  Python
                </TabsTrigger>
                <TabsTrigger
                  value="rust"
                  className="data-[state=active]:bg-background data-[state=active]:shadow-sm px-3 py-1 text-xs"
                >
                  Rust
                </TabsTrigger>
              </TabsList>
            </Tabs>
            {/* Feed Items */}
            <div className="space-y-4">
              {feedItems.map((item) => {
                const isLiked = likedItems.has(item.id);
                const isBookmarked = bookmarkedItems.has(item.id);
                const isInReadingList = readingList.has(item.id);

                return (
                  <article key={item.id} className="group relative">
                    <Card
                      className={`transition-all duration-300 hover:shadow-md overflow-hidden border-border/40 ${
                        item.featured
                          ? "border-foreground/20 shadow-sm bg-muted/20"
                          : ""
                      }`}
                    >
                      <div className="flex gap-4 px-4">
                        {/* Content (Title, Description, Author, Tags) */}
                        <div className="flex-1 min-w-0 space-y-2">
                          {/* Author and Stats */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-7 w-7 border border-border/40">
                                <AvatarImage src={item.author.avatar} />
                                <AvatarFallback className="text-xs font-medium">
                                  {item.author.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="min-w-0">
                                <div className="flex items-center gap-1">
                                  <span className="text-sm font-medium truncate">
                                    {item.author.name}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    ({item.author.username})
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <span>
                                    {item.author.contributions} contributions
                                  </span>
                                  <span>•</span>
                                  <span>{item.timestamp}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Title and Description */}
                          <div className="space-y-1">
                            <h2 className="text-lg font-semibold tracking-tight leading-snug group-hover:text-foreground/90 transition-colors line-clamp-2">
                              {item.content.title}
                            </h2>
                            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                              {item.content.description}
                            </p>
                          </div>
                          {/* Tags, Type, Stats and Actions */}
                          <div className="flex items-center justify-between pt-1">
                            <div className="flex flex-wrap gap-1.5 items-center">
                              <Badge
                                variant="outline"
                                className="px-1.5 py-0.5 text-xs font-medium border border-border/40 flex items-center gap-1"
                              >
                                {getTypeIcon(
                                  item.type as
                                    | "project"
                                    | "blog"
                                    | "contest"
                                    | "achievement"
                                    | "flashcard"
                                )}
                                <span className="capitalize">{item.type}</span>
                              </Badge>
                              {item.content.tags.slice(0, 2).map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="secondary"
                                  className="px-1.5 py-0.5 text-xs font-normal border border-border/40"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <span>{item.readTime}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className={`h-7 w-7 ${
                                    isLiked
                                      ? "text-red-500"
                                      : "text-muted-foreground hover:text-red-500"
                                  }`}
                                  onClick={() => toggleLike(item.id)}
                                  title={isLiked ? "Unlike" : "Like"}
                                >
                                  <Heart
                                    className="h-4 w-4"
                                    fill={isLiked ? "currentColor" : "none"}
                                  />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className={`h-7 w-7 ${
                                    isBookmarked
                                      ? "text-blue-500"
                                      : "text-muted-foreground hover:text-blue-500"
                                  }`}
                                  onClick={() => toggleBookmark(item.id)}
                                  title={
                                    isBookmarked
                                      ? "Remove Bookmark"
                                      : "Bookmark"
                                  }
                                >
                                  <Bookmark
                                    className="h-4 w-4"
                                    fill={
                                      isBookmarked ? "currentColor" : "none"
                                    }
                                  />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7 text-muted-foreground hover:text-foreground"
                                  onClick={() => handleMoreClick(item.id)}
                                  title="More Actions"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Image on Right Side */}
                        {item.content.image && (
                          <div className="flex-shrink-0 w-48 h-32 overflow-hidden rounded-md border border-border/40">
                            <img
                              src={item.content.image}
                              alt={item.content.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                        )}
                      </div>
                    </Card>
                    {/* Quick Actions Dropdown */}
                    {showQuickActions === item.id && (
                      <div className="absolute top-10 right-4 bg-background border border-border/40 rounded-md shadow-lg z-10 w-48">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start rounded-t-md"
                          onClick={() => toggleReadingList(item.id)}
                        >
                          {isInReadingList ? (
                            <>
                              <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                              Remove from Reading List
                            </>
                          ) : (
                            <>
                              <BookOpen className="h-4 w-4 mr-2" />
                              Add to Reading List
                            </>
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start rounded-b-md"
                          onClick={() => setShowQuickActions(null)}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Close
                        </Button>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
          {/* Right Sidebar (Remains Unchanged) */}
          <aside className="hidden xl:block w-[320px] space-y-6 sticky top-8 h-fit">
            {/* Leaderboard */}
            <div>
              <h3 className="text-sm font-semibold tracking-tight flex items-center gap-2 mb-3">
                <Trophy className="h-4 w-4" />
                {t("ranking.topContributors")}
              </h3>
              {/* ... Leaderboard rendering logic ... */}
              <Card className="border-border/40">
                <CardContent className="p-0">
                  {leaderboard.map((user) => (
                    <div
                      key={user.rank}
                      className="flex items-center justify-between px-3 py-2.5 border-b border-border/20 last:border-b-0 hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2 flex-1">
                        <span className="text-sm font-bold text-muted-foreground/60 w-5">
                          {user.rank}
                        </span>
                        <Avatar className="h-7 w-7">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback className="text-xs">
                            {user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="text-xs font-medium truncate">
                            {user.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {user.points.toLocaleString()} points
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5 text-xs font-medium text-muted-foreground">
                        {user.change > 0 ? (
                          <ArrowUp className="h-2.5 w-2.5 text-green-500" />
                        ) : user.change < 0 ? (
                          <ArrowDown className="h-2.5 w-2.5 text-red-500" />
                        ) : (
                          <Minus className="h-2.5 w-2.5" />
                        )}
                        {Math.abs(user.change)}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
            {/* Trending Topics */}
            <div>
              <h3 className="text-sm font-semibold tracking-tight flex items-center gap-2 mb-3">
                <TrendingUp className="h-4 w-4" />
                {t("ranking.trendingTopics")}
              </h3>
              {/* ... Trending Topics rendering logic ... */}
              <Card className="border-border/40">
                <CardContent className="p-0">
                  {trendingTopics.map((topic, index) => (
                    <div
                      key={topic.id}
                      className="flex items-center justify-between px-3 py-2.5 border-b border-border/20 last:border-b-0 hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2 flex-1">
                        <span className="text-xs font-bold text-muted-foreground/60 w-4">
                          {index + 1}
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">
                            #{topic.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {topic.posts.toLocaleString()} posts
                          </p>
                        </div>
                      </div>
                      {topic.trend === "up" && (
                        <TrendingUp className="h-3 w-3 text-green-500" />
                      )}
                      {topic.trend === "down" && (
                        <TrendingUp className="h-3 w-3 text-red-500 rotate-180" />
                      )}
                      {topic.trend === "stable" && (
                        <Minus className="h-3 w-3 text-muted-foreground" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
            {/* Reading List */}
            {readingList.size > 0 && (
              <Card className="border-border/40">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold flex items-center gap-1.5">
                      <BookOpen className="h-3.5 w-3.5" />
                      Reading List
                    </h3>
                    <Badge variant="secondary" className="text-xs">
                      {readingList.size}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    {readingList.size} item{readingList.size !== 1 ? "s" : ""}{" "}
                    saved
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                  >
                    View All
                  </Button>
                </CardContent>
              </Card>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
