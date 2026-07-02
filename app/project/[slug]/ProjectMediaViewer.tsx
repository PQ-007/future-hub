"use client";

import type { Dispatch, SetStateAction } from "react";
import { Play } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProjectMediaViewerProps {
  title: string;
  thumbnailUrl: string | null;
  youTubeId: string | null;
  activeGalleryUrl: string | null;
  hasStrip: boolean;
  galleryStripItems: { url: string; id: string }[];
  selectedMediaId: string;
  setSelectedMediaId: Dispatch<SetStateAction<string>>;
}

export default function ProjectMediaViewer({
  title,
  thumbnailUrl,
  youTubeId,
  activeGalleryUrl,
  hasStrip,
  galleryStripItems,
  selectedMediaId,
  setSelectedMediaId,
}: ProjectMediaViewerProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-2">
      {/* Main viewer */}
      <div className="relative w-full aspect-[16/9] rounded-md overflow-hidden border border-border bg-muted/30 shadow-[0_22px_40px_rgba(0,0,0,0.2)]">
        {selectedMediaId === "youtube" && youTubeId ? (
          <iframe
            src={`https://www.youtube.com/embed/${youTubeId}?autoplay=1`}
            title="Project video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        ) : activeGalleryUrl ? (
          <img
            src={activeGalleryUrl}
            alt="Screenshot"
            className="w-full h-full object-cover"
          />
        ) : thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.02]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30">
            <span className="text-sm">
              {t("project.noPreview") || "No preview available"}
            </span>
          </div>
        )}
      </div>

      {/* Horizontal strip */}
      {hasStrip && (
        <div
          className="flex gap-2 overflow-x-auto pb-1"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {/* YouTube card */}
          {youTubeId && (
            <button
              type="button"
              onClick={() => setSelectedMediaId("youtube")}
              style={{ scrollSnapAlign: "start" }}
              className={`relative flex-shrink-0 w-32 aspect-video rounded-sm overflow-hidden border-2 transition-all ${
                selectedMediaId === "youtube"
                  ? "border-primary shadow-[0_0_0_1px_hsl(var(--primary)/0.4)]"
                  : "border-border/50 hover:border-border"
              }`}
            >
              <img
                src={`https://img.youtube.com/vi/${youTubeId}/mqdefault.jpg`}
                alt="Video"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                <div className="h-8 w-8 rounded-full bg-black/70 flex items-center justify-center">
                  <Play className="h-4 w-4 text-white fill-white ml-0.5" />
                </div>
              </div>
            </button>
          )}

          {/* Thumbnail card */}
          {thumbnailUrl && (
            <button
              type="button"
              onClick={() => setSelectedMediaId("thumbnail")}
              style={{ scrollSnapAlign: "start" }}
              className={`relative flex-shrink-0 w-32 aspect-video rounded-sm overflow-hidden border-2 transition-all ${
                selectedMediaId === "thumbnail"
                  ? "border-primary shadow-[0_0_0_1px_hsl(var(--primary)/0.4)]"
                  : "border-border/50 hover:border-border"
              }`}
            >
              <img
                src={thumbnailUrl}
                alt="Thumbnail"
                className="w-full h-full object-cover"
              />
            </button>
          )}

          {/* Gallery image cards */}
          {galleryStripItems.map(({ url, id }) => (
            <button
              key={id}
              type="button"
              onClick={() => setSelectedMediaId(id)}
              style={{ scrollSnapAlign: "start" }}
              className={`relative flex-shrink-0 w-32 aspect-video rounded-sm overflow-hidden border-2 transition-all ${
                selectedMediaId === id
                  ? "border-primary shadow-[0_0_0_1px_hsl(var(--primary)/0.4)]"
                  : "border-border/50 hover:border-border"
              }`}
            >
              <img
                src={url}
                alt="Screenshot"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
