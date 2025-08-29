"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Play, 
  Clock, 
  Users, 
  Star,
  CheckCircle,
  Circle,
  Search,
  Filter,
  TrendingUp,
  Award,
  Target,
  ChevronRight,
  Video,
  FileText,
  Code,
  Headphones
} from "lucide-react";
import { useState } from "react";

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: {
    name: string;
    avatar: string;
    bio: string;
  };
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: number; // in hours
  lessons: number;
  enrolled: number;
  rating: number;
  price: number;
  status: "not-started" | "in-progress" | "completed";
  progress: number;
  thumbnail: string;
  tags: string[];
  lastAccessed?: string;
  completedLessons?: number;
}

interface LearningPath {
  id: string;
  name: string;
  description: string;
  courses: string[];
  totalHours: number;
  completed: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

const courses: Course[] = [
  {
    id: "1",
    title: "Complete React Developer Course",
    description: "Master React from basics to advanced concepts including hooks, context, and performance optimization.",
    instructor: {
      name: "Sarah Johnson",
      avatar: "/api/placeholder/40/40",
      bio: "Senior Frontend Developer at Google"
    },
    category: "Frontend",
    level: "Intermediate",
    duration: 24,
    lessons: 156,
    enrolled: 12547,
    rating: 4.8,
    price: 89,
    status: "in-progress",
    progress: 65,
    thumbnail: "/api/placeholder/400/225",
    tags: ["React", "JavaScript", "Frontend", "Hooks"],
    lastAccessed: "2024-12-15",
    completedLessons: 101
  },
  {
    id: "2",
    title: "Node.js & Express Masterclass",
    description: "Build scalable backend applications with Node.js, Express, and MongoDB.",
    instructor: {
      name: "Michael Chen",
      avatar: "/api/placeholder/40/40",
      bio: "Backend Engineer at Netflix"
    },
    category: "Backend",
    level: "Intermediate",
    duration: 18,
    lessons: 98,
    enrolled: 8934,
    rating: 4.7,
    price: 79,
    status: "completed",
    progress: 100,
    thumbnail: "/api/placeholder/400/225",
    tags: ["Node.js", "Express", "MongoDB", "Backend"],
    lastAccessed: "2024-12-10",
    completedLessons: 98
  },
  {
    id: "3",
    title: "Python Data Science Bootcamp",
    description: "Learn data analysis, visualization, and machine learning with Python, pandas, and scikit-learn.",
    instructor: {
      name: "Dr. Lisa Wang",
      avatar: "/api/placeholder/40/40",
      bio: "Data Scientist at Tesla"
    },
    category: "Data Science",
    level: "Beginner",
    duration: 32,
    lessons: 201,
    enrolled: 15678,
    rating: 4.9,
    price: 129,
    status: "not-started",
    progress: 0,
    thumbnail: "/api/placeholder/400/225",
    tags: ["Python", "Data Science", "Machine Learning", "Analytics"],
    completedLessons: 0
  },
  {
    id: "4",
    title: "Advanced JavaScript Concepts",
    description: "Deep dive into closures, prototypes, async programming, and modern ES6+ features.",
    instructor: {
      name: "Alex Rodriguez",
      avatar: "/api/placeholder/40/40",
      bio: "JavaScript Expert & Author"
    },
    category: "Frontend",
    level: "Advanced",
    duration: 16,
    lessons: 89,
    enrolled: 6754,
    rating: 4.6,
    price: 99,
    status: "in-progress",
    progress: 25,
    thumbnail: "/api/placeholder/400/225",
    tags: ["JavaScript", "ES6", "Async Programming", "Advanced"],
    lastAccessed: "2024-12-12",
    completedLessons: 22
  }
];

const learningPaths: LearningPath[] = [
  {
    id: "1",
    name: "Full Stack Web Developer",
    description: "Complete path from frontend to backend development",
    courses: ["1", "2"],
    totalHours: 42,
    completed: 82,
    difficulty: "Intermediate"
  },
  {
    id: "2",
    name: "Frontend Specialist",
    description: "Master modern frontend development",
    courses: ["1", "4"],
    totalHours: 40,
    completed: 45,
    difficulty: "Advanced"
  }
];

export default function LearnPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const categories = Array.from(new Set(courses.map(course => course.category)));
  const levels = ["Beginner", "Intermediate", "Advanced"];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "" || course.level === selectedLevel;
    
    if (activeTab === "all") return matchesSearch && matchesCategory && matchesLevel;
    if (activeTab === "enrolled") return matchesSearch && matchesCategory && matchesLevel && course.status !== "not-started";
    if (activeTab === "completed") return matchesSearch && matchesCategory && matchesLevel && course.status === "completed";
    if (activeTab === "in-progress") return matchesSearch && matchesCategory && matchesLevel && course.status === "in-progress";
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const getLevelColor = (level: Course["level"]) => {
    switch (level) {
      case "Beginner": return "bg-green-500";
      case "Intermediate": return "bg-yellow-500";
      case "Advanced": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case "video": return <Video className="h-4 w-4" />;
      case "reading": return <FileText className="h-4 w-4" />;
      case "coding": return <Code className="h-4 w-4" />;
      case "audio": return <Headphones className="h-4 w-4" />;
      default: return <Play className="h-4 w-4" />;
    }
  };

  const formatDuration = (hours: number) => {
    return hours > 1 ? `${hours} hours` : `${hours * 60} minutes`;
  };

  const totalEnrolled = courses.filter(c => c.status !== "not-started").length;
  const totalCompleted = courses.filter(c => c.status === "completed").length;
  const totalHours = courses.reduce((acc, course) => {
    if (course.status !== "not-started") {
      return acc + (course.duration * (course.progress / 100));
    }
    return acc;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Learning Hub</h1>
          <p className="text-muted-foreground mt-1">
            Expand your knowledge with expert-led courses
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Search className="h-4 w-4" />
          Browse All Courses
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">{totalEnrolled}</div>
                <p className="text-xs text-muted-foreground">Courses Enrolled</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">{totalCompleted}</div>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">{Math.round(totalHours)}</div>
                <p className="text-xs text-muted-foreground">Hours Learned</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-lg">
                <Award className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">Certificates</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Continue Learning Section */}
      {courses.some(c => c.status === "in-progress") && (
        <Card>
          <CardHeader>
            <CardTitle>Continue Learning</CardTitle>
            <CardDescription>Pick up where you left off</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {courses.filter(c => c.status === "in-progress").map((course) => (
                <div key={course.id} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-16 h-9 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{course.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {course.completedLessons}/{course.lessons} lessons completed
                    </p>
                    <div className="mt-2">
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  </div>
                  <Button size="sm">
                    <Play className="h-4 w-4 mr-1" />
                    Continue
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Learning Paths */}
      <Card>
        <CardHeader>
          <CardTitle>Learning Paths</CardTitle>
          <CardDescription>Structured learning journeys to master specific skills</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {learningPaths.map((path) => (
              <div key={path.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium">{path.name}</h4>
                    <p className="text-sm text-muted-foreground">{path.description}</p>
                  </div>
                  <Badge className={`${getLevelColor(path.difficulty)} text-white`}>
                    {path.difficulty}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{path.courses.length} courses • {path.totalHours} hours</span>
                    <span>{path.completed}% complete</span>
                  </div>
                  <Progress value={path.completed} className="h-2" />
                </div>
                <Button variant="outline" size="sm" className="mt-3 w-full">
                  <Target className="h-4 w-4 mr-2" />
                  View Path
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-input rounded-md bg-background text-sm"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-3 py-2 border border-input rounded-md bg-background text-sm"
          >
            <option value="">All Levels</option>
            {levels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="enrolled">Enrolled</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-md transition-shadow overflow-hidden">
                <div className="relative">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className={`${getLevelColor(course.level)} text-white`}>
                      {course.level}
                    </Badge>
                  </div>
                  {course.status !== "not-started" && (
                    <div className="absolute bottom-2 left-2 right-2">
                      <Progress value={course.progress} className="h-1" />
                    </div>
                  )}
                </div>
                
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
                  <CardDescription className="text-sm line-clamp-2">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Instructor */}
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                      <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{course.instructor.name}</p>
                      <p className="text-xs text-muted-foreground">{course.instructor.bio}</p>
                    </div>
                  </div>

                  {/* Course Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{formatDuration(course.duration)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Play className="h-4 w-4 text-muted-foreground" />
                      <span>{course.lessons} lessons</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{course.enrolled.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-current text-yellow-500" />
                      <span>{course.rating}</span>
                    </div>
                  </div>

                  {/* Progress (if enrolled) */}
                  {course.status !== "not-started" && (
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                      {course.completedLessons && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {course.completedLessons}/{course.lessons} lessons completed
                        </p>
                      )}
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {course.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {course.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{course.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="text-lg font-bold">
                      {course.price === 0 ? "Free" : `${course.price}`}
                    </div>
                    <div className="flex gap-2">
                      {course.status === "not-started" ? (
                        <Button size="sm">
                          Enroll Now
                        </Button>
                      ) : course.status === "completed" ? (
                        <Button variant="outline" size="sm">
                          Review
                        </Button>
                      ) : (
                        <Button size="sm">
                          <Play className="h-4 w-4 mr-1" />
                          Continue
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No courses found matching your criteria.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Recommended for You */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Recommended for You
          </CardTitle>
          <CardDescription>
            Based on your learning history and interests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">TypeScript for React Developers</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Learn TypeScript in the context of React development
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm">12 hours • Intermediate</span>
                  <Button size="sm" variant="outline">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">GraphQL with Node.js</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Build modern APIs with GraphQL and Apollo Server
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm">16 hours • Advanced</span>
                  <Button size="sm" variant="outline">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}