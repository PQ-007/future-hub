"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight, Globe, Star, Code, Book, Trophy, PenTool, Languages, Users } from "lucide-react";

interface LandingPageProps {
  setLang: (lang: "ENG" | "MGL" | "JP") => void;
  lang: "ENG" | "MGL" | "JP";
}

export default function LandingPage({ setLang, lang }: LandingPageProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const translations = {
    ENG: {
      heroTitle: "Build your future",
      heroSubtitle: "FutureHub is a platform to publish projects, generate flashcards from text, and host contests.",
      ctaTitle: "Start your FutureHub portfolio today",
      ctaSubtitle: "Showcase your projects, publish tutorials, and convert words into study flashcards automatically.",
      searchPlaceholder: "Search projects, blogs, or contests...",
    },
    MGL: {
      heroTitle: "Өөрийн ирээдүйг бүтээ",
      heroSubtitle: "FutureHub — төсөл, блог, flashcard-уудыг нэг дор",
      ctaTitle: "FutureHub-ийн портфолиогоо өнөөдрөөс эхлүүл",
      ctaSubtitle: "Төслүүдээ танилцуулж, заавар нийтэлж, үгсийг автоматаар судалгааны flashcard болгон хувирга.",
      searchPlaceholder: "Төсөл, блог, эсвэл тэмцээн хайх...",
    },
    JP: {
      heroTitle: "未来をつくる場所",
      heroSubtitle: "FutureHub — 革新し、研究し、開発し、そしてさらに",
      ctaTitle: "今すぐFutureHubポートフォリオを始める",
      ctaSubtitle: "プロジェクトを紹介し、チュートリアルを公開し、単語を自動的に学習用フラッシュカードに変換。",
      searchPlaceholder: "プロジェクト、ブログ、またはコンテストを検索...",
    },
  };

  const featuresTitle = {
    ENG: "Key Features",
    MGL: "Түлхүүр Онцлог",
    JP: "主要な機能",
  };

  const featuresData = {
    ENG: [
      { title: "Publish Projects", desc: "Showcase your innovative projects to the world." },
      { title: "Generate Flashcards", desc: "Automatically create study aids from any text." },
      { title: "Host Contests", desc: "Organize and participate in exciting competitions." },
      { title: "Write Blogs", desc: "Share your knowledge through engaging articles." },
      { title: "Multilingual Support", desc: "Access the platform in multiple languages." },
      { title: "Community Interaction", desc: "Collaborate and get feedback from peers." },
    ],
    MGL: [
      { title: "Төсөл Нийтлэх", desc: "Дэлхийд таны инновацийн төслүүдийг таниулах." },
      { title: "Флешкард Үүсгэх", desc: "Ямар ч текстийг ашиглан суралцах тусламж автоматжуулан бий болго." },
      { title: "Тэмцээн Зохион Байгуулах", desc: "Сэтгэл хөдөлгөм уралдаануудыг зохион байгуулж, оролцох." },
      { title: "Блог Бичих", desc: "Сонирхолтой нийтлэлүүдээрээ мэдлэгээ хуваалцах." },
      { title: "Олон Хэлний Дэмжлэг", desc: "Платформд олон хэлээр нэвтрэх." },
      { title: "Нийгмийн Харилцаа", desc: "Хамт олонгоос санал авч, хамтран ажиллах." },
    ],
    JP: [
      { title: "プロジェクトを公開", desc: "革新的なプロジェクトを世界に披露。" },
      { title: "フラッシュカードを生成", desc: "任意のテキストから自動的に学習補助を作成。" },
      { title: "コンテストを開催", desc: "エキサイトする競技を組織化し、参加する。" },
      { title: "ブログを書く", desc: "魅力的な記事を通じて知識を共有。" },
      { title: "多言語サポート", desc: "複数の言語でプラットフォームにアクセス。" },
      { title: "コミュニティインタラクション", desc: "仲間と協力し、フィードバックを得る。" },
    ],
  };

  const featureIcons = [
    <Code className="h-5 w-5 text-primary" />,
    <Book className="h-5 w-5 text-primary" />,
    <Trophy className="h-5 w-5 text-primary" />,
    <PenTool className="h-5 w-5 text-primary" />,
    <Languages className="h-5 w-5 text-primary" />,
    <Users className="h-5 w-5 text-primary" />,
  ];

  const blogsTitle = {
    ENG: "Recent Blogs",
    MGL: "Сүүлийн Блог",
    JP: "最近のブログ",
  };

  const blogsData = {
    ENG: [
      { title: "The Future of AI in Education", desc: "Exploring how AI can revolutionize learning." },
      { title: "Building Scalable Web Apps", desc: "Tips and tricks for modern development." },
      { title: "Mastering Data Structures", desc: "Essential concepts for programmers." },
    ],
    MGL: [
      { title: "AI-ийн Ирээдүй Боловсролд", desc: "AI-ийн суралцах үйл явцыг хэрхэн өөрчлөх талаар судлах." },
      { title: "Масштабтай Вэб Аппууд Бий Болгох", desc: "Орчин үеийн хөгжүүлэлтийн зөвлөмж ба аргачлал." },
      { title: "Дата Структурыг Эзэмших", desc: "Програмчдад чухал ойлголтууд." },
    ],
    JP: [
      { title: "AI教育の未来", desc: "AIが学習を革命化する方法を探る。" },
      { title: "スケーラブルなウェブアプリの構築", desc: "現代の開発のためのヒントとコツ。" },
      { title: "データ構造の習得", desc: "プログラマーにとって必須の概念。" },
    ],
  };

  

  const activityData = [
    {
      date: "Aug 10, 2025",
      action: {
        ENG: "Won contest: Summer Hackathon",
        MGL: "Тэмцээн Хожсон: Зуны Хакатон",
        JP: "コンテストに勝利：サマーハッカソン",
      },
      details: {
        ENG: "Submitted AlgoRush and won first place.",
        MGL: "AlgoRush-т оролцож, анхны байр эзэлсэн.",
        JP: "AlgoRushを提出し、1位を獲得。",
      },
    },
    {
      date: "Aug 5, 2025",
      action: {
        ENG: "Published: How I built an automatic timeline",
        MGL: "Нийтэлсэн: Автомат цагийн хуваарь хэрхэн бий болгосон",
        JP: "公開：自動タイムラインの構築方法",
      },
      details: {
        ENG: "Added 10 flashcards from the article",
        MGL: "Нийтлэлээс 10 flashcard нэмсэн",
        JP: "記事から10枚のフラッシュカードを追加",
      },
    },
    {
      date: "Aug 1, 2025",
      action: {
        ENG: "Published blog: AI in Everyday Life",
        MGL: "Нийтэлсэн блог: Өдөр тутмын Амьдралд AI",
        JP: "ブログを公開：日常生活におけるAI",
      },
      details: {
        ENG: "Generated 15 flashcards on AI topics.",
        MGL: "AI сэдвээр 15 флешкард үүсгэсэн.",
        JP: "AIトピックに関する15枚のフラッシュカードを生成。",
      },
    },
    {
      date: "Jul 28, 2025",
      action: {
        ENG: "Started: AlgoRush prototype",
        MGL: "Эхэлсэн: AlgoRush-ийн загвар",
        JP: "開始：AlgoRushプロトタイプ",
      },
      details: {
        ENG: "Connected project demo to contest system",
        MGL: "Төслийн демог тэмцээний системтэй холбосон",
        JP: "プロジェクトのデモをコンテストシステムに接続",
      },
    },
    {
      date: "Jul 15, 2025",
      action: {
        ENG: "Collaborated on Super Portfolio",
        MGL: "Super Portfolio дээр хамтран ажилласан",
        JP: "Super Portfolioで協力",
      },
      details: {
        ENG: "Added multilingual support.",
        MGL: "Олон хэлний дэмжлэг нэмсэн.",
        JP: "多言語サポートを追加。",
      },
    },
  ];

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted rounded-2xl shadow-lg">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text from-primary to-secondary">
            {translations[lang].heroTitle}
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">
            {translations[lang].heroSubtitle}
          </p>

          {/* Search */}
          <div className="mt-6 max-w-xl mx-auto flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder={translations[lang].searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-5 text-sm rounded-lg border-2 border-muted focus:border-primary transition"
              />
            </div>
            <Button size="lg" className="bg-primary text-primary-foreground">
              Search
            </Button>
          </div>

          {/* Language Switch */}
          <div className="mt-4 flex justify-center gap-2">
            {(["ENG", "MGL", "JP"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1 rounded-lg font-medium transition text-sm ${
                  lang === l
                    ? "bg-primary text-white shadow"
                    : "text-muted-foreground hover:bg-muted hover:shadow-sm"
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
          { label: lang === "MGL" ? "Төслүүд" : lang === "JP" ? "プロジェクト" : "Projects", value: "1,245", icon: <Globe className="h-5 w-5 text-primary" /> },
          { label: lang === "MGL" ? "Блогын нийтлэл" : lang === "JP" ? "ブログ投稿" : "Blog Posts", value: "532", icon: <Star className="h-5 w-5 text-primary" /> },
          { label: lang === "MGL" ? "Идэвхтэй хэрэглэгчид" : lang === "JP" ? "アクティブユーザー" : "Active Users", value: "4,392", icon: <Globe className="h-5 w-5 text-primary" /> },
          { label: lang === "MGL" ? "Тэмцээнүүд" : lang === "JP" ? "コンテスト" : "Contests", value: "27", icon: <Star className="h-5 w-5 text-primary" /> },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="p-6 bg-card rounded-xl shadow-md text-center hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <div className="flex justify-center mb-3">{stat.icon}</div>
            <div className="text-3xl font-bold text-primary">{stat.value}</div>
            <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Key Features */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">{featuresTitle[lang]}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {featuresData[lang].map((f, idx) => (
            <div
              key={idx}
              className="p-4 bg-card rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <div className="flex justify-center mb-3">{featureIcons[idx]}</div>
              <h3 className="text-lg font-semibold text-center">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground text-center">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">
            {lang === "MGL" ? "Онцлох Төслүүд" : lang === "JP" ? "注目のプロジェクト" : "Featured Projects"}
          </h2>
          <Button variant="link" className="px-0 text-primary hover:underline">
            {lang === "MGL" ? "Бүгдийг харах" : lang === "JP" ? "すべて見る" : "See all"} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "AlgoRush",
              desc: lang === "MGL" ? "Графикийн алгоритмын визуалчлалын тоглоом" : lang === "JP" ? "グラフアルゴリズムのビジュアライザーゲーム" : "Graph-algorithm visualizer game.",
              img: "https://via.placeholder.com/300x150?text=AlgoRush",
            },
            {
              title: "Super Portfolio",
              desc: lang === "MGL" ? "Олон хэлний оюутны портфолио" : lang === "JP" ? "多言語学生ポートフォリオ" : "Multilingual student portfolios.",
              img: "https://via.placeholder.com/300x150?text=Super+Portfolio",
            },
            {
              title: "FlashCard Sync",
              desc: lang === "MGL" ? "Аудио удирдлагатай хяналт ба OCR импорт" : lang === "JP" ? "オーディオ駆動のレビューとOCRインポート" : "Audio-driven review and OCR import.",
              img: "https://via.placeholder.com/300x150?text=FlashCard+Sync",
            },
            {
              title: "AI Tutor",
              desc: lang === "MGL" ? "ML ашиглан ухаантай сургалтын систем." : lang === "JP" ? "MLを使用したインテリジェントなチューリングシステム。" : "Intelligent tutoring system using ML.",
              img: "https://via.placeholder.com/300x150?text=AI+Tutor",
            },
            {
              title: "EcoTracker",
              desc: lang === "MGL" ? "Байгаль орчны нөлөөллийг хянах апп." : lang === "JP" ? "環境影響を追跡するためのアプリ。" : "App for tracking environmental impact.",
              img: "https://via.placeholder.com/300x150?text=EcoTracker",
            },
            {
              title: "CodeCollab",
              desc: lang === "MGL" ? "Реал-тайм хамт олон кодлох платформ." : lang === "JP" ? "リアルタイムの共同コーディングプラットフォーム。" : "Real-time collaborative coding platform.",
              img: "https://via.placeholder.com/300x150?text=CodeCollab",
            },
          ].map((p, idx) => (
            <div
              key={idx}
              className="p-4 bg-card rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <img src={p.img} alt={p.title} className="w-full h-32 object-cover rounded-lg mb-3" />
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
              <div className="mt-3 flex gap-2">
                <Button size="sm" className="bg-primary text-primary-foreground">
                  {lang === "MGL" ? "Нээх" : lang === "JP" ? "開く" : "Open"}
                </Button>
                <Button size="sm" variant="outline">
                  {lang === "MGL" ? "Демо" : lang === "JP" ? "デモ" : "Demo"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Blogs */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">{blogsTitle[lang]}</h2>
          <Button variant="link" className="px-0 text-primary hover:underline">
            {lang === "MGL" ? "Бүгдийг харах" : lang === "JP" ? "すべて見る" : "See all"} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {blogsData[lang].map((b, idx) => (
            <div
              key={idx}
              className="p-4 bg-card rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <h3 className="text-lg font-semibold">{b.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{b.desc}</p>
              <div className="mt-3">
                <Button size="sm" variant="outline">
                  {lang === "MGL" ? "Унших" : lang === "JP" ? "読む" : "Read More"}
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
            {lang === "MGL" ? "Сүүлийн Үйл Ажиллагаа" : lang === "JP" ? "最近のアクティビティ" : "Recent Activity"}
          </h2>
          <Button variant="link" className="px-0 text-primary hover:underline">
            {lang === "MGL" ? "Бүгдийг харах" : lang === "JP" ? "すべて見る" : "View all"} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-4">
          {activityData.map((a, idx) => (
            <div
              key={idx}
              className="p-4 bg-card rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div className="text-sm text-muted-foreground">{a.date}</div>
              <div className="mt-1 text-base font-medium">{a.action[lang]}</div>
              <div className="text-sm text-muted-foreground">{a.details[lang]}</div>
            </div>
          ))}
        </div>
      </section>

      

      {/* CTA */}
      <section className="bg-primary/10 p-8 rounded-2xl text-center shadow-lg">
        <h2 className="text-2xl font-bold">{translations[lang].ctaTitle}</h2>
        <p className="mt-3 text-base text-muted-foreground max-w-xl mx-auto">
          {translations[lang].ctaSubtitle}
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            {lang === "MGL" ? "Эхлэх" : lang === "JP" ? "始める" : "Get Started"}
          </Button>
          <Button size="lg" variant="outline" className="hover:bg-muted">
            {lang === "MGL" ? "Дэлгэрэнгүй" : lang === "JP" ? "詳細" : "Learn More"}
          </Button>
        </div>
      </section>
    </div>
  );
}