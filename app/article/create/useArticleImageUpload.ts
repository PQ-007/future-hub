"use client";

import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import { uploadImageToCloudinary } from "@/lib/cloudinaryUpload";

/**
 * Image upload for the article editor: owns the hidden file input, upload
 * status, and error state, and inserts an `![](url)` markdown image at the end
 * of the document. Extracted from ArticleEditorContext (its only dependency on
 * the rest of the editor is `setMdx`).
 */
export function useArticleImageUpload(
  setMdx: Dispatch<SetStateAction<string>>,
) {
  const fileInputRef = useRef<HTMLInputElement>(null!);
  const [imageUploading, setImageUploading] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);

  const handleImageButtonClick = () => {
    setImageError(null);
    fileInputRef.current?.click();
  };

  const handleImageFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setImageError(null);
    if (!file.type.startsWith("image/")) {
      setImageError("Please choose an image file.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setImageError("Image must be 10MB or smaller.");
      return;
    }
    setImageUploading(true);
    try {
      const { secureUrl, publicId } = await uploadImageToCloudinary(file);
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const finalUrl =
        cloudName && publicId
          ? `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,w_1200/${publicId}`
          : secureUrl;
      setMdx((prev) => {
        const spacer =
          prev.trim().length === 0 ? "" : prev.endsWith("\n") ? "\n" : "\n\n";
        return `${prev}${spacer}![](${finalUrl})\n`;
      });
    } catch (err) {
      setImageError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setImageUploading(false);
    }
  };

  return {
    fileInputRef,
    imageUploading,
    imageError,
    handleImageButtonClick,
    handleImageFileChange,
  };
}
