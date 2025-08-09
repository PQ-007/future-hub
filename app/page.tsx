"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const [lang, setLang] = useState<"ENG" | "MGL" | "JP">("ENG");

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="text-center py-16 md:py-24 bg-gradient-to-b from-background to-muted rounded-xl shadow-sm">
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
        <div className="mt-8 flex justify-center gap-4">
          <Button size="lg" className="bg-primary text-primary-foreground">
            Explore Projects
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() =>
              setLang(
                lang === "ENG" ? "MGL" : lang === "MGL" ? "JP" : "ENG"
              )
            }
          >
            {lang}
          </Button>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="grid md:grid-cols-3 gap-8">
        {[
          {
            title: "Project Showcases",
            desc: "Interactive demos, logs, videos and GIFs for every project.",
          },
          {
            title: "Automatic Timeline",
            desc: "Timeline generated from your activity and posts.",
          },
          {
            title: "Flashcards & Practice",
            desc: "Turn unknown words into flashcards and sync with the mobile app.",
          },
        ].map((f, idx) => (
          <div
            key={idx}
            className="p-6 bg-card rounded-lg shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Call to Action */}
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
