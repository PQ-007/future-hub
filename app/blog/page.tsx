"use client";

import { useState } from "react";
import { Search } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "I Automated My Life With AI and Made $3,000 This Month (Here’s My Exact System)",
    excerpt: "Stop working harder. Start working with AI. Your productivity stack is broken. Here’s how to fix it.",
    author: "Berker Ceylan",
    date: "Jul 15",
    views: "19.8K",
    comments: "82",
    avatar: "https://via.placeholder.com/40",
    image: "https://via.placeholder.com/800x400",
  },
  {
    id: 2,
    title: "Common side effects of not drinking",
    excerpt: "By rejecting alcohol, you reject something very human, an extra limb that we have collectively grown to deal with reality and with...",
    author: "Karolina Kozmana",
    date: "Jan 22, 2024",
    views: "60K",
    comments: "2038",
    avatar: "https://via.placeholder.com/40",
    image: "https://via.placeholder.com/800x400",
  },
  {
    id: 3,
    title: "Future-Proof Careers in the Age of AI: What You Should Learn in 2026",
    excerpt: "What if I told you that by this time next year, you could land a job that pays over $100,000—and it won’t be threatened by AI?",
    author: "Iswarya writes",
    date: "Jul 30",
    views: "2.6K",
    comments: "123",
    avatar: "https://via.placeholder.com/40",
    image: "https://via.placeholder.com/800x400",
  },
  {
    id: 4,
    title: "Stop Using These Apps Instead of Doomscrolling on Your iPhone",
    excerpt: "These apps will actually be worth your time",
    author: "The Useful Tech",
    date: "Apr 25",
    views: "3.4K",
    comments: "116",
    avatar: "https://via.placeholder.com/40",
    image: "https://via.placeholder.com/800x400",
  },
  {
    id: 5,
    title: "AI killed my coding brain but I'm rebuilding it",
    excerpt: "We sprinted into the AI age of autocomplete IDEs now we're",
    author: "<devtips/>",
    date: "Unknown",
    views: "Unknown",
    comments: "Unknown",
    avatar: "https://via.placeholder.com/40",
    image: "https://via.placeholder.com/800x400",
  },
];

const staffPicks = [
  {
    id: 1,
    title: "In Sharing Food by Ninad Kulkarni",
    subtitle: "Eating With My Hands Doesn’t Make Me Less Civilised",
    date: "Jul 4",
  },
  {
    id: 2,
    title: "In the Wind Phone by Jim Parton",
    subtitle: "Member-only story: What Happens Next?",
    date: "Jun 21",
  },
  {
    id: 3,
    title: "How the #ILookLikeAnEngineer Ad Campaign Happened Ten Years Ago",
    author: "Michelle Glauser",
    date: "Aug 3",
  },
];

const recommendedTopics = [
  "Fiction", "Web Development", "Education", "Film", "Poetry", "Creativity", "Java",
];

const whoToFollow = [
  {
    id: 1,
    name: "Bagus Muljadi",
    title: "I'm an Assistant Professor at a UK Russell Group...",
    avatar: "https://via.placeholder.com/40",
    followLink: "#",
  },
  {
    id: 2,
    name: "Level Up Coding",
    title: "Publication tutorials and news. The developer homepage...",
    avatar: "https://via.placeholder.com/40",
    followLink: "#",
  },
  {
    id: 3,
    name: "Thomas Ricouard",
    title: "iOS/Mac & Web dev | No...",
    avatar: "https://via.placeholder.com/40",
    followLink: "#",
  },
];

const readingList = [
  {
    id: 1,
    title: "Machine Learning is Fun!",
    author: "Adam Geitgey",
    date: "May 6, 2014",
  },
];

export default function MediumPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = blogPosts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      {/* Main Content */}
      <div className="w-full md:w-2/3 space-y-8">
        

        <div className="space-y-6">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <article key={post.id} className="flex gap-4 border-b pb-4">
                <div className="w-28 h-20 flex-shrink-0">
                  <img
                    src={post.image}
    
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <h2 className="text-lg font-semibold leading-snug">{post.title}</h2>
                    <p className="text-gray-600 text-sm line-clamp-2">{post.excerpt}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                    <img
                      src={post.avatar}
                    
                      className="w-5 h-5 rounded-full"
                    />
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.views} views</span>
                    <span>•</span>
                    <span>{post.comments} comments</span>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <p className="text-gray-500">No matching articles found.</p>
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-full md:w-1/3 space-y-6">
        {/* Staff Picks */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Staff Picks</h2>
          {staffPicks.map((pick) => (
            <div key={pick.id} className="text-sm text-gray-600 mb-2">
              <p className="font-medium">{pick.title}</p>
              <p className="text-gray-500">{pick.subtitle}</p>
              <p className="text-gray-400">{pick.author || ""} {pick.date}</p>
            </div>
          ))}
          <p className="text-sm text-blue-600 cursor-pointer">See the full list</p>
        </div>

        {/* Recommended Topics */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Recommended topics</h2>
          <div className="flex flex-wrap gap-2">
            {recommendedTopics.map((topic, index) => (
              <span key={index} className="text-sm bg-gray-100 rounded-full px-2 py-1 text-gray-700">
                {topic}
              </span>
            ))}
          </div>
          <p className="text-sm text-blue-600 cursor-pointer mt-2">See more topics</p>
        </div>

        {/* Who to Follow */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Who to follow</h2>
          {whoToFollow.map((follow) => (
            <div key={follow.id} className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <img
                  src={follow.avatar}
               
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium">{follow.name}</p>
                  <p className="text-xs text-gray-500">{follow.title}</p>
                </div>
              </div>
              <button className="text-sm text-blue-600 border border-blue-600 rounded-full px-3 py-1">
                Follow
              </button>
            </div>
          ))}
          <p className="text-sm text-blue-600 cursor-pointer">See more suggestions</p>
        </div>

        {/* Your Reading List */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Your Reading list</h2>
          {readingList.map((item) => (
            <div key={item.id} className="text-sm text-gray-600 mb-2">
              <p className="font-medium">{item.title}</p>
              <p className="text-gray-500">{item.author} {item.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}