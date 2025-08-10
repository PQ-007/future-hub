"use client";

import { useState } from "react";
import { Search } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "How to Get Started with Machine Learning",
    excerpt:
      "A beginner-friendly guide to understanding the basics of ML and starting your first project.",
    author: "Jane Doe",
    date: "Aug 5, 2025",
    avatar: "https://via.placeholder.com/40",
    image: "https://via.placeholder.com/800x400",
  },
  {
    id: 2,
    title: "Top 10 Kaggle Competitions to Try",
    excerpt:
      "From beginner challenges to advanced problems — here’s where to start on Kaggle.",
    author: "John Smith",
    date: "Aug 3, 2025",
    avatar: "https://via.placeholder.com/40",
    image: "https://via.placeholder.com/800x400",
  },
  {
    id: 3,
    title: "Building Your First Data Science Portfolio",
    excerpt:
      "Tips and examples to create a compelling portfolio that attracts recruiters.",
    author: "Emily Zhang",
    date: "Aug 1, 2025",
    avatar: "https://via.placeholder.com/40",
    image: "https://via.placeholder.com/800x400",
  },
];

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = blogPosts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h1 className="text-2xl font-bold tracking-tight">Latest Articles</h1>
        <div className="flex items-center bg-gray-100 rounded-full px-3 py-1.5 w-full md:w-72">
          <Search className="w-4 h-4 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none flex-1 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Articles Feed */}
      <div className="space-y-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <article
              key={post.id}
              className="flex gap-4 border-b pb-4"
            >
              <div className="w-28 h-20 flex-shrink-0">
                <img
                  src={post.image}
                  alt={post.title}
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
                    alt={post.author}
                    className="w-5 h-5 rounded-full"
                  />
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </article>
          ))
        ) : (
          <p className="text-gray-500">No matching articles found.</p>
        )}
      </div>
    </div>
  );
}
