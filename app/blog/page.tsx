"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Eye, Heart, MessageCircle, Search, Filter, Plus } from "lucide-react";
import { useState } from "react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: number;
  tags: string[];
  views: number;
  likes: number;
  comments: number;
  status: "published" | "draft";
}

const samplePosts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with React Server Components",
    excerpt: "Learn how to leverage the power of React Server Components in your Next.js applications for better performance and user experience.",
    content: "",
    author: { name: "Alex Johnson", avatar: "/api/placeholder/32/32" },
    publishedAt: "2024-12-15",
    readTime: 8,
    tags: ["React", "Next.js", "Server Components"],
    views: 1247,
    likes: 89,
    comments: 23,
    status: "published"
  },
  {
    id: "2",
    title: "Advanced TypeScript Tips for Better Code",
    excerpt: "Discover advanced TypeScript patterns and techniques that will make your code more robust and maintainable.",
    content: "",
    author: { name: "Sarah Chen", avatar: "/api/placeholder/32/32" },
    publishedAt: "2024-12-10",
    readTime: 12,
    tags: ["TypeScript", "JavaScript", "Best Practices"],
    views: 892,
    likes: 67,
    comments: 15,
    status: "published"
  },
  {
    id: "3",
    title: "Building Scalable REST APIs with Node.js",
    excerpt: "A comprehensive guide to building robust and scalable REST APIs using Node.js, Express, and modern best practices.",
    content: "",
    author: { name: "Mike Rodriguez", avatar: "/api/placeholder/32/32" },
    publishedAt: "2024-12-05",
    readTime: 15,
    tags: ["Node.js", "REST API", "Backend"],
    views: 1543,
    likes: 124,
    comments: 34,
    status: "published"
  },
  {
    id: "4",
    title: "Next.js 15 Features Deep Dive",
    excerpt: "Exploring the latest features and improvements in Next.js 15 and how they can enhance your development workflow.",
    content: "",
    author: { name: "Emma Wilson", avatar: "/api/placeholder/32/32" },
    publishedAt: "2024-11-28",
    readTime: 10,
    tags: ["Next.js", "React", "Web Development"],
    views: 756,
    likes: 45,
    comments: 12,
    status: "draft"
  }
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");

  // Get all unique tags
  const allTags = Array.from(new Set(samplePosts.flatMap(post => post.tags)));

  // Filter posts based on search and filters
  const filteredPosts = samplePosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === "" || post.tags.includes(selectedTag);
    const matchesStatus = statusFilter === "all" || post.status === statusFilter;
    
    return matchesSearch && matchesTag && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <p className="text-muted-foreground mt-1">
            Share knowledge and insights with the community
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Post
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="px-3 py-2 border border-input rounded-md bg-background text-sm"
          >
            <option value="">All Tags</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "all" | "published" | "draft")}
            className="px-3 py-2 border border-input rounded-md bg-background text-sm"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>
        </div>
      </div>

      {/* Blog Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{samplePosts.filter(p => p.status === 'published').length}</div>
            <p className="text-xs text-muted-foreground">Published Posts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{samplePosts.filter(p => p.status === 'draft').length}</div>
            <p className="text-xs text-muted-foreground">Draft Posts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{samplePosts.reduce((acc, p) => acc + p.views, 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total Views</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{samplePosts.reduce((acc, p) => acc + p.likes, 0)}</div>
            <p className="text-xs text-muted-foreground">Total Likes</p>
          </CardContent>
        </Card>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid gap-6">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                      {post.status}
                    </Badge>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {post.views}
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {post.likes}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-3 w-3" />
                        {post.comments}
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                  <CardDescription className="text-base">{post.excerpt}</CardDescription>
                </div>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-1 mt-3">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            
            <CardFooter className="flex items-center justify-between pt-0">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{post.author.name}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {formatDate(post.publishedAt)}
                    <Clock className="h-3 w-3 ml-2" />
                    {post.readTime} min read
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <Button size="sm">
                  View
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No posts found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}