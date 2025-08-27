
// Enhanced tree data interface
export interface EnhancedTreeNode {
  key: string;
  title: React.ReactNode;
  children?: EnhancedTreeNode[];
  type?: "folder" | "file";
  fileType?: "text" | "image" | "code" | "video" | "audio" | "other";
  size?: string;
  modified?: string;
}

export interface TreeViewProps {
  showQuickActions?: boolean;
  activeSection?: string;
}