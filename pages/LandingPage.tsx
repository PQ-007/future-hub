import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  ArrowRight,
  Globe,
  Star,
  Code,
  Book,
  Trophy,
  PenTool,
  Languages,
  Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function LandingPage() {
  const { t, i18n } = useTranslation();

  const featureIcons = [
    <Code className="h-5 w-5 text-primary" />,
    <Book className="h-5 w-5 text-primary" />,
    <Trophy className="h-5 w-5 text-primary" />,
    <PenTool className="h-5 w-5 text-primary" />,
    <Languages className="h-5 w-5 text-primary" />,
    <Users className="h-5 w-5 text-primary" />,
  ];

  const statsData = [
    {
      label: t("landing.stats.projects"),
      value: "1,245",
      icon: <Globe className="h-5 w-5 text-primary" />,
    },
    {
      label: t("landing.stats.blogPosts"),
      value: "532",
      icon: <Star className="h-5 w-5 text-primary" />,
    },
    {
      label: t("landing.stats.activeUsers"),
      value: "4,392",
      icon: <Globe className="h-5 w-5 text-primary" />,
    },
    {
      label: t("landing.stats.contests"),
      value: "27",
      icon: <Star className="h-5 w-5 text-primary" />,
    },
  ];

  // Solution: Access array items by index
  const featuresData = Array.from({ length: 6 }, (_, idx) => ({
    title: t(`landing.features.items.${idx}.title`),
    desc: t(`landing.features.items.${idx}.desc`),
  }));

  const projectsData = Array.from({ length: 6 }, (_, idx) => ({
    title: t(`landing.projectsList.${idx}.title`),
    desc: t(`landing.projectsList.${idx}.desc`),
  }));

  const blogsData = Array.from({ length: 3 }, (_, idx) => ({
    title: t(`landing.blogs.items.${idx}.title`),
    desc: t(`landing.blogs.items.${idx}.desc`),
  }));

  const activityData = Array.from({ length: 5 }, (_, idx) => ({
    date: t(`landing.activity.items.${idx}.date`),
    action: t(`landing.activity.items.${idx}.action`),
    details: t(`landing.activity.items.${idx}.details`),
  }));

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="min-h-screen bg-background">


      {/* Main Content */}
      <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted rounded-2xl shadow-lg">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text from-primary to-secondary">
              {t("landing.hero.title")}
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">
              {t("landing.hero.subtitle")}
            </p>

            {/* Search */}
            <div className="mt-6 max-w-xl mx-auto flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder={t("landing.hero.searchPlaceholder")}
                  className="pl-10 py-5 text-sm rounded-lg border-2 border-muted focus:border-primary transition"
                />
              </div>
              <Button size="lg" className="bg-primary text-primary-foreground">
                {t("common.search")}
              </Button>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 bg-card rounded-xl shadow-md text-center hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <div className="flex justify-center mb-3">{stat.icon}</div>
              <div className="text-3xl font-bold text-primary">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </section>

        {/* Key Features */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">
              {t("landing.features.title")}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuresData.map((f, idx) => (
              <div
                key={idx}
                className="p-4 bg-card rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
              >
                <div className="flex justify-center mb-3">
                  {featureIcons[idx]}
                </div>
                <h3 className="text-lg font-semibold text-center">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground text-center">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Projects */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">
              {t("landing.projects.title")}
            </h2>
            <Button
              variant="link"
              className="px-0 text-primary hover:underline"
            >
              {t("landing.projects.seeAll")}{" "}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {projectsData.map((p, idx) => (
              <div
                key={idx}
                className="p-4 bg-card rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
              >
                <img
                  src={`https://via.placeholder.com/300x150?text=${encodeURIComponent(
                    p.title
                  )}`}
                  alt={p.title}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                <div className="mt-3 flex gap-2">
                  <Button
                    size="sm"
                    className="bg-primary text-primary-foreground"
                  >
                    {t("landing.projects.open")}
                  </Button>
                  <Button size="sm" variant="outline">
                    {t("landing.projects.demo")}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Blogs */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">
              {t("landing.blogs.title")}
            </h2>
            <Button
              variant="link"
              className="px-0 text-primary hover:underline"
            >
              {t("landing.blogs.seeAll")}{" "}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {blogsData.map((b, idx) => (
              <div
                key={idx}
                className="p-4 bg-card rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
              >
                <h3 className="text-lg font-semibold">{b.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{b.desc}</p>
                <div className="mt-3">
                  <Button size="sm" variant="outline">
                    {t("landing.blogs.readMore")}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Activity Feed */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">
              {t("landing.activity.title")}
            </h2>
            <Button
              variant="link"
              className="px-0 text-primary hover:underline"
            >
              {t("landing.activity.viewAll")}{" "}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4">
            {activityData.map((a, idx) => (
              <div
                key={idx}
                className="p-4 bg-card rounded-lg shadow-sm hover:shadow-md transition"
              >
                <div className="text-sm text-muted-foreground">{a.date}</div>
                <div className="mt-1 text-base font-medium">{a.action}</div>
                <div className="text-sm text-muted-foreground">{a.details}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary/10 p-8 rounded-2xl text-center shadow-lg">
          <h2 className="text-2xl font-bold">{t("landing.cta.title")}</h2>
          <p className="mt-3 text-base text-muted-foreground max-w-xl mx-auto">
            {t("landing.cta.subtitle")}
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {t("landing.cta.getStarted")}
            </Button>
            <Button size="lg" variant="outline" className="hover:bg-muted">
              {t("landing.cta.learnMore")}
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}