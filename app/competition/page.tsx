"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Calendar, 
  Clock, 
  Users, 
  Target, 
  Code, 
  Award,
  TrendingUp,
  ExternalLink,
  Play
} from "lucide-react";
import { useState } from "react";

interface Competition {
  id: string;
  name: string;
  platform: string;
  type: "contest" | "hackathon" | "challenge";
  status: "upcoming" | "active" | "completed";
  startDate: string;
  endDate: string;
  duration: string;
  participants: number;
  maxParticipants?: number;
  difficulty: "Easy" | "Medium" | "Hard";
  prize: string;
  description: string;
  tags: string[];
  myRank?: number;
  totalProblems?: number;
  solvedProblems?: number;
}

const competitions: Competition[] = [
  {
    id: "1",
    name: "LeetCode Weekly Contest 380",
    platform: "LeetCode",
    type: "contest",
    status: "completed",
    startDate: "2024-12-15T14:30:00Z",
    endDate: "2024-12-15T16:00:00Z",
    duration: "1h 30m",
    participants: 23567,
    difficulty: "Medium",
    prize: "LeetCode Points",
    description: "Weekly algorithmic programming contest with 4 problems of increasing difficulty.",
    tags: ["Algorithms", "Data Structures", "Problem Solving"],
    myRank: 1247,
    totalProblems: 4,
    solvedProblems: 3
  },
  {
    id: "2",
    name: "CodeForces Round 912",
    platform: "CodeForces",
    type: "contest",
    status: "upcoming",
    startDate: "2024-12-20T17:35:00Z",
    endDate: "2024-12-20T19:35:00Z",
    duration: "2h",
    participants: 0,
    maxParticipants: 50000,
    difficulty: "Hard",
    prize: "Rating Points",
    description: "Division 2 contest featuring 6 challenging problems.",
    tags: ["Competitive Programming", "Mathematics", "Graph Theory"]
  },
  {
    id: "3",
    name: "TechCrunch Disrupt 2024",
    platform: "TechCrunch",
    type: "hackathon",
    status: "active",
    startDate: "2024-12-18T00:00:00Z",
    endDate: "2024-12-20T23:59:00Z",
    duration: "3 days",
    participants: 1247,
    maxParticipants: 2000,
    difficulty: "Medium",
    prize: "$100,000",
    description: "Build innovative solutions for the future of technology.",
    tags: ["Innovation", "Startups", "AI", "Web3"]
  },
  {
    id: "4",
    name: "Google Code Jam Qualification",
    platform: "Google",
    type: "contest",
    status: "upcoming",
    startDate: "2025-03-15T00:00:00Z",
    endDate: "2025-03-17T23:59:00Z",
    duration: "3 days",
    participants: 0,
    difficulty: "Hard",
    prize: "Qualification to Round 1",
    description: "Qualification round for the prestigious Google Code Jam competition.",
    tags: ["Algorithms", "Logic", "Mathematics"]
  }
];

const achievements = [
  { id: "1", title: "First Contest", description: "Participated in your first competition", icon: "🏁", unlocked: true },
  { id: "2", title: "Problem Solver", description: "Solved 100 problems", icon: "🧩", unlocked: true },
  { id: "3", title: "Top 10%", description: "Ranked in top 10% of a contest", icon: "🏆", unlocked: false },
  { id: "4", title: "Streak Master", description: "5 contest participation streak", icon: "🔥", unlocked: true },
  { id: "5", title: "Speed Demon", description: "Solved a problem in under 5 minutes", icon: "⚡", unlocked: false },
  { id: "6", title: "Hackathon Winner", description: "Won a hackathon", icon: "🥇", unlocked: false }
];

export default function CompetitionPage() {
  const [activeTab, setActiveTab] = useState("active");

  const getStatusColor = (status: Competition["status"]) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "upcoming": return "bg-blue-500";
      case "completed": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const getTypeIcon = (type: Competition["type"]) => {
    switch (type) {
      case "contest": return <Code className="h-4 w-4" />;
      case "hackathon": return <Trophy className="h-4 w-4" />;
      case "challenge": return <Target className="h-4 w-4" />;
      default: return <Code className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredCompetitions = competitions.filter(comp => {
    if (activeTab === "all") return true;
    return comp.status === activeTab;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Competitions</h1>
          <p className="text-muted-foreground mt-1">
            Participate in coding contests and hackathons
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <ExternalLink className="h-4 w-4" />
          Browse More
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                <Trophy className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Contests Participated</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                <Award className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-muted-foreground">Achievements</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">1,247</div>
                <p className="text-xs text-muted-foreground">Best Rank</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-lg">
                <Code className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">89</div>
                <p className="text-xs text-muted-foreground">Problems Solved</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {/* Competitions List */}
          <div className="grid gap-4">
            {filteredCompetitions.map((competition) => (
              <Card key={competition.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(competition.type)}
                          <CardTitle className="text-xl">{competition.name}</CardTitle>
                        </div>
                        <Badge className={`${getStatusColor(competition.status)} text-white`}>
                          {competition.status}
                        </Badge>
                        <Badge variant="outline">
                          {competition.difficulty}
                        </Badge>
                      </div>
                      
                      <CardDescription className="text-base mb-3">
                        {competition.description}
                      </CardDescription>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {competition.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{formatDate(competition.startDate)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{competition.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{competition.participants.toLocaleString()} participants</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Trophy className="h-4 w-4 text-muted-foreground" />
                      <span>{competition.prize}</span>
                    </div>
                  </div>

                  {competition.myRank && (
                    <div className="bg-muted/50 p-4 rounded-lg mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">My Performance</span>
                        <Badge variant="outline">Rank #{competition.myRank}</Badge>
                      </div>
                      {competition.totalProblems && competition.solvedProblems && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Problems Solved</span>
                            <span>{competition.solvedProblems}/{competition.totalProblems}</span>
                          </div>
                          <Progress 
                            value={(competition.solvedProblems / competition.totalProblems) * 100} 
                            className="h-2"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex gap-2">
                    {competition.status === "active" && (
                      <Button className="flex items-center gap-2">
                        <Play className="h-4 w-4" />
                        Join Now
                      </Button>
                    )}
                    {competition.status === "upcoming" && (
                      <Button variant="outline" className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Register
                      </Button>
                    )}
                    {competition.status === "completed" && (
                      <Button variant="outline" className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        View Results
                      </Button>
                    )}
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCompetitions.length === 0 && (
            <div className="text-center py-12">
              <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No competitions found for this category.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Achievements Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Achievements
          </CardTitle>
          <CardDescription>
            Track your progress and unlock new achievements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border ${
                  achievement.unlocked 
                    ? "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800" 
                    : "bg-muted/50 border-muted"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-medium">{achievement.title}</h4>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                  {achievement.unlocked && (
                    <Badge variant="default" className="bg-green-600">Unlocked</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}