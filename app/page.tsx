"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HomePage() {
  const [lang, setLang] = useState<"ENG" | "MGL" | "JP">("ENG");

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted rounded-xl shadow-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            {lang === "MGL"
              ? "Өөрийн ирээдүйг бүтээ"
              : lang === "JP"
              ? "未来をつくる場所"
              : "Build your future — showcase, learn, and compete"}
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            {lang === "MGL"
              ? "FutureHub — оюутан, хөгжүүлэгчдийн төслүүд, блог, flashcard-уудыг нэг дор удирдана."
              : lang === "JP"
              ? "FutureHubは、学生と開発者のポートフォリオ、学習、コンペを統合するプラットフォームです。"
              : "FutureHub is a multilingual platform to publish projects, generate flashcards from text, and host contests."}
          </p>

          {/* Search */}
          

          {/* Language Switch */}
          <div className="mt-4 flex justify-center gap-2 text-sm">
            {(["ENG", "MGL", "JP"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2 py-1 rounded ${
                  lang === l
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Projects", value: "1,245" },
          { label: "Blog Posts", value: "532" },
          { label: "Active Users", value: "4,392" },
          { label: "Contests", value: "27" },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="p-6 bg-card rounded-lg shadow text-center hover:shadow-lg transition"
          >
            <div className="text-3xl font-bold">{stat.value}</div>
            <div className="mt-2 text-sm text-muted-foreground">
              {stat.label}
            </div>
          </div>
        ))}
      </section>

      {/* Featured Projects */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Featured Projects</h2>
          <Button variant="link" className="px-0">
            See all
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "AlgoRush",
              desc: "Graph-algorithm visualizer game.",
            },
            {
              title: "Super Portfolio",
              desc: "Multilingual student portfolios.",
            },
            {
              title: "FlashCard Sync",
              desc: "Audio-driven review and OCR import.",
            },
          ].map((p, idx) => (
            <div
              key={idx}
              className="p-4 bg-card rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="font-semibold">{p.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
              <div className="mt-3 flex gap-2">
                <Button size="sm">Open</Button>
                <Button size="sm" variant="outline">
                  Demo
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Activity Feed */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Recent Activity</h2>
          <Button variant="link" className="px-0">
            View all
          </Button>
        </div>
        <div className="space-y-4">
          {[
            {
              date: "Aug 5, 2025",
              action: "Published: How I built an automatic timeline",
              details: "Added 10 flashcards from the article",
            },
            {
              date: "Jul 28, 2025",
              action: "Started: AlgoRush prototype",
              details: "Connected project demo to contest system",
            },
          ].map((a, idx) => (
            <div
              key={idx}
              className="p-4 bg-card rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div className="text-sm text-muted-foreground">{a.date}</div>
              <div className="mt-1 font-medium">{a.action}</div>
              <div className="text-sm text-muted-foreground">{a.details}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary/10 p-10 rounded-xl text-center">
        <h2 className="text-2xl font-bold">
          Start your FutureHub portfolio today
        </h2>
        <p className="mt-2 text-muted-foreground max-w-lg mx-auto">
          Showcase your projects, publish tutorials, and convert words into
          study flashcards automatically.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Button size="lg" className="bg-primary text-primary-foreground">
            Get Started
          </Button>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>
      </section>
    </div>
  );
}
