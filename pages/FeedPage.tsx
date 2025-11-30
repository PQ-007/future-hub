// pages/FeedPage.tsx (Improved Version)
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RightSidebar } from "@/components/sidebar-collection/Right/RightSidebar";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Award,
  Bookmark,
  Code,
  Eye,
  Heart,
  MessageSquare,
  MoreHorizontal,
  Share2,
  Trophy,
  Zap,
} from "lucide-react";
import { useState } from "react";

// Types
type FeedItemType = "project" | "blog" | "contest" | "flashcard" | "achievement";

interface FeedItem {
  id: string;
  type: FeedItemType;
  author: {
    name: string;
    avatar: string;
    username: string;
  };
  timestamp: string;
  content: {
    title: string;
    description: string;
    image?: string;
    tags?: string[];
  };
  stats: {
    likes: number;
    comments: number;
    views: number;
    shares?: number;
  };
  isLiked?: boolean;
  isBookmarked?: boolean;
}

interface RankingUser {
  rank: number;
  name: string;
  avatar: string;
  points: number;
  change: number;
  badge?: string;
}

interface TrendingTopic {
  id: string;
  name: string;
  posts: number;
  trend: "up" | "down" | "stable";
}

export default function FeedPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("all");

  // Sample data
  const feedItems: FeedItem[] = [
    {
      id: "1",
      type: "project",
      author: {
        name: "Sarah Chen",
        avatar: "/api/placeholder/40/40",
        username: "@sarahchen",
      },
      timestamp: "2 hours ago",
      content: {
        title: "AlgoViz - Interactive Algorithm Visualizer",
        description:
          "Built a new tool to help students understand sorting algorithms through interactive visualizations. Features include step-by-step execution, code highlighting, and complexity analysis.",
        image: "/api/placeholder/600/300",
        tags: ["React", "D3.js", "Education", "Algorithms"],
      },
      stats: {
        likes: 234,
        comments: 45,
        views: 1200,
        shares: 23,
      },
      isLiked: false,
      isBookmarked: true,
    },
    {
      id: "2",
      type: "blog",
      author: {
        name: "Mike Rodriguez",
        avatar: "/api/placeholder/40/40",
        username: "@mikecodes",
      },
      timestamp: "5 hours ago",
      content: {
        title: "10 Advanced React Patterns You Should Know",
        description:
          "Dive deep into compound components, render props, custom hooks, and more. Learn how to write cleaner, more maintainable React code with these proven patterns.",
        tags: ["React", "JavaScript", "Tutorial", "Best Practices"],
      },
      stats: {
        likes: 567,
        comments: 89,
        views: 3400,
        shares: 78,
      },
      isLiked: true,
      isBookmarked: false,
    },
    {
      id: "3",
      type: "contest",
      author: {
        name: "CodeMasters",
        avatar: "/api/placeholder/40/40",
        username: "@codemasters",
      },
      timestamp: "1 day ago",
      content: {
        title: "Summer Coding Challenge 2025",
        description:
          "Join our biggest coding competition yet! Solve algorithmic problems, compete with developers worldwide, and win amazing prizes. Registration closes in 3 days.",
        image: "/api/placeholder/600/200",
        tags: ["Contest", "Algorithms", "Competition"],
      },
      stats: {
        likes: 890,
        comments: 156,
        views: 5600,
        shares: 234,
      },
      isLiked: false,
      isBookmarked: true,
    },
    {
      id: "4",
      type: "achievement",
      author: {
        name: "Alex Kim",
        avatar: "/api/placeholder/40/40",
        username: "@alexkim",
      },
      timestamp: "1 day ago",
      content: {
        title: "🏆 Completed 100-Day Coding Streak!",
        description:
          "Finally hit 100 consecutive days of coding! Learned so much about consistency and building habits. Special thanks to the community for the support!",
        tags: ["Achievement", "Motivation", "Learning"],
      },
      stats: {
        likes: 445,
        comments: 67,
        views: 1800,
      },
      isLiked: true,
      isBookmarked: false,
    },
    {
      id: "5",
      type: "flashcard",
      author: {
        name: "Emma Wilson",
        avatar: "/api/placeholder/40/40",
        username: "@emmawilson",
      },
      timestamp: "2 days ago",
      content: {
        title: "JavaScript Interview Prep - 50 Essential Questions",
        description:
          "Created a comprehensive flashcard deck covering closures, async/await, prototypes, and more. Perfect for technical interviews!",
        tags: ["JavaScript", "Flashcards", "Interview Prep"],
      },
      stats: {
        likes: 678,
        comments: 92,
        views: 2900,
        shares: 145,
      },
      isLiked: false,
      isBookmarked: true,
    },
  ];

  const topUsers: RankingUser[] = [
    {
      rank: 1,
      name: "Alexandra Chen",
      avatar: "/api/placeholder/40/40",
      points: 12450,
      change: 0,
      badge: "🥇",
    },
    {
      rank: 2,
      name: "David Park",
      avatar: "/api/placeholder/40/40",
      points: 11230,
      change: 2,
      badge: "🥈",
    },
    {
      rank: 3,
      name: "Sarah Johnson",
      avatar: "/api/placeholder/40/40",
      points: 10890,
      change: -1,
      badge: "🥉",
    },
    {
      rank: 4,
      name: "Mike Zhang",
      avatar: "/api/placeholder/40/40",
      points: 9560,
      change: 1,
    },
    {
      rank: 5,
      name: "Emily Rodriguez",
      avatar: "/api/placeholder/40/40",
      points: 8920,
      change: -2,
    },
    {
      rank: 6,
      name: "James Wilson",
      avatar: "/api/placeholder/40/40",
      points: 8450,
      change: 0,
    },
    {
      rank: 7,
      name: "Lisa Kim",
      avatar: "/api/placeholder/40/40",
      points: 7890,
      change: 3,
    },
    {
      rank: 8,
      name: "Tom Anderson",
      avatar: "/api/placeholder/40/40",
      points: 7650,
      change: -1,
    },
  ];

  const trendingTopics: TrendingTopic[] = [
    { id: "1", name: "React 19", posts: 1234, trend: "up" },
    { id: "2", name: "Machine Learning", posts: 987, trend: "up" },
    { id: "3", name: "Web3", posts: 756, trend: "stable" },
    { id: "4", name: "TypeScript", posts: 654, trend: "up" },
    { id: "5", name: "System Design", posts: 543, trend: "down" },
  ];

  const getTypeIcon = (type: FeedItemType) => {
    const icons = {
      project: <Code className="h-4 w-4" />,
      blog: <MessageSquare className="h-4 w-4" />,
      contest: <Trophy className="h-4 w-4" />,
      flashcard: <Zap className="h-4 w-4" />,
      achievement: <Award className="h-4 w-4" />,
    };
    return icons[type];
  };

  const getTypeColor = (type: FeedItemType) => {
    const colors = {
      project: "bg-blue-500",
      blog: "bg-green-500",
      contest: "bg-yellow-500",
      flashcard: "bg-purple-500",
      achievement: "bg-orange-500",
    };
    return colors[type];
  };

  return (
    <div className="flex gap-6 mx-auto">
      {/* Main Feed */}
      <div className="flex-1 ">
        {/* Feed Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Your Feed</h1>
          <p className="text-muted-foreground text-sm">
            Stay updated with the latest from your community
          </p>
        </div>

        {/* Feed Filters */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="blogs">Blogs</TabsTrigger>
            <TabsTrigger value="contests">Contests</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Feed Items */}
        <div className="space-y-6 mb-20 lg:mb-0">
          {feedItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={item.author.avatar} />
                      <AvatarFallback>
                        {item.author.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm">
                          {item.author.name}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {item.author.username}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{item.timestamp}</span>
                        <span>•</span>
                        <Badge
                          variant="secondary"
                          className={`${getTypeColor(item.type)} text-white text-xs px-2 py-0`}
                        >
                          <span className="mr-1">{getTypeIcon(item.type)}</span>
                          {item.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    {item.content.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.content.description}
                  </p>
                </div>

                {item.content.image && (
                  <img
                    src={item.content.image}
                    alt={item.content.title}
                    className="w-full rounded-lg object-cover max-h-[300px]"
                  />
                )}

                {item.content.tags && (
                  <div className="flex flex-wrap gap-2">
                    {item.content.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {item.stats.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      {item.stats.comments}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant={item.isLiked ? "default" : "ghost"}
                      size="sm"
                      className="gap-2"
                    >
                      <Heart
                        className={`h-4 w-4 ${item.isLiked ? "fill-current" : ""}`}
                      />
                      {item.stats.likes}
                    </Button>
                    <Button
                      variant={item.isBookmarked ? "default" : "ghost"}
                      size="icon"
                      className="h-8 w-8"
                    >
                      <Bookmark
                        className={`h-4 w-4 ${item.isBookmarked ? "fill-current" : ""}`}
                      />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Right Sidebar with Rankings */}
      <RightSidebar topUsers={topUsers} trendingTopics={trendingTopics} />
    </div>
  );
}