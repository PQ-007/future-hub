import React, { useState, useCallback, useMemo } from 'react';
import { Tree } from 'antd';
import type { TreeProps } from 'antd';
import { 
  ChevronRight, 
  ChevronDown, 
  File, 
  Folder, 
  FolderOpen,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  FileText,
  Image,
  Code,
  FileVideo,
  Music,
  Database,
  Settings,
  BookOpen,
  Trophy,
  Rocket,
  Store
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AntTreeNodeProps } from 'antd/es/tree';

// Enhanced tree data interface
export interface EnhancedTreeNode {
  key: string;
  title: React.ReactNode;
  children?: EnhancedTreeNode[];
  type?: 'folder' | 'file';
  fileType?: 'text' | 'image' | 'code' | 'video' | 'audio' | 'other';
  size?: string;
  modified?: string;
}

// File type icon mapping
const getFileIcon = (fileType?: string, isFolder?: boolean, isOpen?: boolean) => {
  if (isFolder) {
    return isOpen ? (
      <FolderOpen className="h-4 w-4 text-blue-500" />
    ) : (
      <Folder className="h-4 w-4 text-blue-400" />
    );
  }

  switch (fileType) {
    case 'text':
      return <FileText className="h-4 w-4 text-green-500" />;
    case 'image':
      return <Image className="h-4 w-4 text-purple-500" />;
    case 'code':
      return <Code className="h-4 w-4 text-orange-500" />;
    case 'video':
      return <FileVideo className="h-4 w-4 text-red-500" />;
    case 'audio':
      return <Music className="h-4 w-4 text-pink-500" />;
    default:
      return <File className="h-4 w-4 text-gray-400" />;
  }
};

// Generate different tree data based on active section
const generateTreeDataBySectionPage = (section: string): EnhancedTreeNode[] => {
  switch (section) {
    case '/blog':
      return [
        {
          title: 'Published',
          key: 'published',
          type: 'folder',
          children: [
            { title: 'Getting Started with React.md', key: 'blog-1', type: 'file', fileType: 'text' },
            { title: 'Advanced TypeScript Tips.md', key: 'blog-2', type: 'file', fileType: 'text' },
            { title: 'Building REST APIs.md', key: 'blog-3', type: 'file', fileType: 'text' },
          ]
        },
        {
          title: 'Drafts',
          key: 'drafts',
          type: 'folder',
          children: [
            { title: 'Next.js 15 Features.md', key: 'draft-1', type: 'file', fileType: 'text' },
            { title: 'Database Design Patterns.md', key: 'draft-2', type: 'file', fileType: 'text' },
          ]
        },
        {
          title: 'Templates',
          key: 'templates',
          type: 'folder',
          children: [
            { title: 'Blog Post Template.md', key: 'template-1', type: 'file', fileType: 'text' },
            { title: 'Tutorial Template.md', key: 'template-2', type: 'file', fileType: 'text' },
          ]
        }
      ];

    case '/project':
      return [
        {
          title: 'Web Development',
          key: 'web-dev',
          type: 'folder',
          children: [
            { title: 'E-commerce Platform', key: 'project-1', type: 'file', fileType: 'code' },
            { title: 'Social Media Dashboard', key: 'project-2', type: 'file', fileType: 'code' },
            { title: 'Task Management App', key: 'project-3', type: 'file', fileType: 'code' },
          ]
        },
        {
          title: 'Mobile Apps',
          key: 'mobile',
          type: 'folder',
          children: [
            { title: 'Fitness Tracker', key: 'mobile-1', type: 'file', fileType: 'code' },
            { title: 'Recipe Finder', key: 'mobile-2', type: 'file', fileType: 'code' },
          ]
        },
        {
          title: 'Open Source',
          key: 'opensource',
          type: 'folder',
          children: [
            { title: 'UI Component Library', key: 'os-1', type: 'file', fileType: 'code' },
            { title: 'API Client Generator', key: 'os-2', type: 'file', fileType: 'code' },
          ]
        }
      ];

    case '/flashcard':
      return [
        {
          title: 'Programming',
          key: 'programming',
          type: 'folder',
          children: [
            { title: 'JavaScript Fundamentals', key: 'js-cards', type: 'file', fileType: 'text' },
            { title: 'React Hooks', key: 'react-cards', type: 'file', fileType: 'text' },
            { title: 'TypeScript Basics', key: 'ts-cards', type: 'file', fileType: 'text' },
          ]
        },
        {
          title: 'Data Structures',
          key: 'data-structures',
          type: 'folder',
          children: [
            { title: 'Arrays & Lists', key: 'arrays-cards', type: 'file', fileType: 'text' },
            { title: 'Trees & Graphs', key: 'trees-cards', type: 'file', fileType: 'text' },
          ]
        },
        {
          title: 'System Design',
          key: 'system-design',
          type: 'folder',
          children: [
            { title: 'Scalability Patterns', key: 'scale-cards', type: 'file', fileType: 'text' },
            { title: 'Database Design', key: 'db-cards', type: 'file', fileType: 'text' },
          ]
        }
      ];

    case '/competition':
      return [
        {
          title: 'Coding Contests',
          key: 'coding-contests',
          type: 'folder',
          children: [
            { title: 'LeetCode Weekly 380', key: 'lc-380', type: 'file', fileType: 'code' },
            { title: 'CodeForces Round 912', key: 'cf-912', type: 'file', fileType: 'code' },
            { title: 'AtCoder Beginner 332', key: 'abc-332', type: 'file', fileType: 'code' },
          ]
        },
        {
          title: 'Hackathons',
          key: 'hackathons',
          type: 'folder',
          children: [
            { title: 'TechCrunch Disrupt 2024', key: 'tc-2024', type: 'file', fileType: 'code' },
            { title: 'Local Dev Meetup', key: 'local-hack', type: 'file', fileType: 'code' },
          ]
        },
        {
          title: 'Solutions Archive',
          key: 'solutions',
          type: 'folder',
          children: [
            { title: 'Dynamic Programming', key: 'dp-solutions', type: 'file', fileType: 'code' },
            { title: 'Graph Algorithms', key: 'graph-solutions', type: 'file', fileType: 'code' },
          ]
        }
      ];

    case '/showcase':
      return [
        {
          title: 'Featured Work',
          key: 'featured',
          type: 'folder',
          children: [
            { title: 'Portfolio Website', key: 'portfolio', type: 'file', fileType: 'image' },
            { title: 'Mobile Game UI', key: 'game-ui', type: 'file', fileType: 'image' },
            { title: 'Brand Identity Design', key: 'brand', type: 'file', fileType: 'image' },
          ]
        },
        {
          title: 'Client Projects',
          key: 'client-work',
          type: 'folder',
          children: [
            { title: 'Restaurant Website', key: 'restaurant', type: 'file', fileType: 'image' },
            { title: 'Startup Landing Page', key: 'startup', type: 'file', fileType: 'image' },
          ]
        },
        {
          title: 'Experiments',
          key: 'experiments',
          type: 'folder',
          children: [
            { title: '3D Web Animation', key: '3d-anim', type: 'file', fileType: 'video' },
            { title: 'Interactive Data Viz', key: 'data-viz', type: 'file', fileType: 'image' },
          ]
        }
      ];

    case '/store':
      return [
        {
          title: 'Digital Products',
          key: 'digital',
          type: 'folder',
          children: [
            { title: 'UI Kit Bundle', key: 'ui-kit', type: 'file', fileType: 'image' },
            { title: 'Code Templates', key: 'templates', type: 'file', fileType: 'code' },
            { title: 'Icon Collection', key: 'icons', type: 'file', fileType: 'image' },
          ]
        },
        {
          title: 'Courses',
          key: 'courses',
          type: 'folder',
          children: [
            { title: 'React Masterclass', key: 'react-course', type: 'file', fileType: 'video' },
            { title: 'Design System Guide', key: 'design-course', type: 'file', fileType: 'text' },
          ]
        },
        {
          title: 'Consulting',
          key: 'consulting',
          type: 'folder',
          children: [
            { title: 'Code Review Service', key: 'code-review', type: 'file', fileType: 'text' },
            { title: '1-on-1 Mentoring', key: 'mentoring', type: 'file', fileType: 'text' },
          ]
        }
      ];

    default:
      return [
        {
          title: 'Overview',
          key: 'overview',
          type: 'folder',
          children: [
            { title: 'Dashboard.tsx', key: 'dashboard', type: 'file', fileType: 'code' },
            { title: 'Analytics.tsx', key: 'analytics', type: 'file', fileType: 'code' },
          ]
        }
      ];
  }
};

interface TreeViewProps {
  showQuickActions?: boolean;
  activeSection?: string;
}

export const TreeView: React.FC<TreeViewProps> = ({ 
  showQuickActions = false, 
  activeSection = '/' 
}) => {
  // Generate tree data based on active section
  const initialTreeData = useMemo(() => 
    generateTreeDataBySectionPage(activeSection), 
    [activeSection]
  );

  const [treeData, setTreeData] = useState<EnhancedTreeNode[]>(initialTreeData);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [dragOverKey, setDragOverKey] = useState<string>('');

  // Update tree data when active section changes
  React.useEffect(() => {
    setTreeData(generateTreeDataBySectionPage(activeSection));
    setExpandedKeys([]); // Reset expanded state when section changes
    setSelectedKeys([]); // Reset selection when section changes
  }, [activeSection]);

  // Generate unique key for new items
  const generateUniqueKey = (): string => {
    return `new-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  // Add new folder function
  const addNewFolder = useCallback((parentKey?: string) => {
    const newFolder: EnhancedTreeNode = {
      key: generateUniqueKey(),
      title: 'New Folder',
      type: 'folder',
      children: []
    };

    const updateTreeData = (nodes: EnhancedTreeNode[]): EnhancedTreeNode[] => {
      if (!parentKey) {
        // Add to root level
        return [...nodes, newFolder];
      }

      return nodes.map(node => {
        if (node.key === parentKey) {
          return {
            ...node,
            children: [...(node.children || []), newFolder]
          };
        } else if (node.children) {
          return {
            ...node,
            children: updateTreeData(node.children)
          };
        }
        return node;
      });
    };

    setTreeData(updateTreeData(treeData));

    // Expand parent if it exists
    if (parentKey && !expandedKeys.includes(parentKey)) {
      setExpandedKeys([...expandedKeys, parentKey]);
    }
  }, [treeData, expandedKeys]);

  // Add new file function
  const addNewFile = useCallback((parentKey?: string) => {
    const getFileTypeForSection = (section: string): EnhancedTreeNode['fileType'] => {
      switch (section) {
        case '/blog':
          return 'text';
        case '/project':
          return 'code';
        case '/flashcard':
          return 'text';
        case '/competition':
          return 'code';
        case '/showcase':
          return 'image';
        case '/store':
          return 'other';
        default:
          return 'code';
      }
    };

    const newFile: EnhancedTreeNode = {
      key: generateUniqueKey(),
      title: 'New File',
      type: 'file',
      fileType: getFileTypeForSection(activeSection)
    };

    const updateTreeData = (nodes: EnhancedTreeNode[]): EnhancedTreeNode[] => {
      if (!parentKey) {
        // Add to root level
        return [...nodes, newFile];
      }

      return nodes.map(node => {
        if (node.key === parentKey) {
          return {
            ...node,
            children: [...(node.children || []), newFile]
          };
        } else if (node.children) {
          return {
            ...node,
            children: updateTreeData(node.children)
          };
        }
        return node;
      });
    };

    setTreeData(updateTreeData(treeData));

    // Expand parent if it exists
    if (parentKey && !expandedKeys.includes(parentKey)) {
      setExpandedKeys([...expandedKeys, parentKey]);
    }
  }, [treeData, expandedKeys, activeSection]);

  // Delete item function
  const deleteItem = useCallback((targetKey: string) => {
    // Show confirmation dialog
    const confirmDelete = window.confirm('Are you sure you want to delete this item? This action cannot be undone.');
    
    if (!confirmDelete) {
      return;
    }

    const deleteFromTree = (nodes: EnhancedTreeNode[]): EnhancedTreeNode[] => {
      return nodes.reduce((acc: EnhancedTreeNode[], node) => {
        if (node.key === targetKey) {
          // Skip this node (delete it)
          return acc;
        }
        
        if (node.children && node.children.length > 0) {
          // Recursively delete from children
          const updatedChildren = deleteFromTree(node.children);
          acc.push({
            ...node,
            children: updatedChildren
          });
        } else {
          acc.push(node);
        }
        
        return acc;
      }, []);
    };

    setTreeData(deleteFromTree(treeData));

    // Remove from expanded keys if it was expanded
    setExpandedKeys(expandedKeys.filter(key => key !== targetKey));
    
    // Remove from selected keys if it was selected
    setSelectedKeys(selectedKeys.filter(key => key !== targetKey));
  }, [treeData, expandedKeys, selectedKeys]);

  // Rename item function
  const renameItem = useCallback((targetKey: string, currentTitle: string) => {
    const newTitle = window.prompt('Enter new name:', currentTitle);
    
    if (!newTitle || newTitle.trim() === '' || newTitle === currentTitle) {
      return;
    }

    const renameInTree = (nodes: EnhancedTreeNode[]): EnhancedTreeNode[] => {
      return nodes.map(node => {
        if (node.key === targetKey) {
          return {
            ...node,
            title: newTitle.trim()
          };
        }
        
        if (node.children && node.children.length > 0) {
          return {
            ...node,
            children: renameInTree(node.children)
          };
        }
        
        return node;
      });
    };

    setTreeData(renameInTree(treeData));
  }, [treeData]);

  // Toggle folder expansion (called when clicking on folder row)
  const toggleFolder = useCallback((key: string, isExpanded: boolean) => {
    if (isExpanded) {
      setExpandedKeys(expandedKeys.filter(k => k !== key));
    } else {
      setExpandedKeys([...expandedKeys, key]);
    }
  }, [expandedKeys]);

  const onExpand = useCallback((expandedKeys: React.Key[], _info: any) => {
    setExpandedKeys(expandedKeys.map(String));
  }, []);

  const onSelect = useCallback((selectedKeys: React.Key[], _info: any) => {
    setSelectedKeys(selectedKeys.map(String));
  }, []);

  const onDragEnter: TreeProps['onDragEnter'] = useCallback((info: { node: { key: any; }; }) => {
    setDragOverKey(String(info.node.key));
  }, []);

  const onDragLeave = useCallback(() => {
    setDragOverKey('');
  }, []);

  const onDrop: TreeProps['onDrop'] = useCallback((info: { node: { key: any; pos: string; }; dragNode: { key: any; }; dropPosition: number; dropToGap: any; }) => {
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (
      data: EnhancedTreeNode[],
      key: React.Key,
      callback: (node: EnhancedTreeNode, i: number, data: EnhancedTreeNode[]) => void,
    ) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children as EnhancedTreeNode[], key, callback);
        }
      }
    };

    const data = [...treeData];
    let dragObj: EnhancedTreeNode;

    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        (item.children as EnhancedTreeNode[]).unshift(dragObj);
      });
    } else {
      let ar: EnhancedTreeNode[] = [];
      let i: number;
      loop(data, dropKey, (_item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i!, 0, dragObj!);
      } else {
        ar.splice(i! + 1, 0, dragObj!);
      }
    }

    setTreeData(data);
    setDragOverKey('');
  }, [treeData]);

  // Custom title renderer
  const renderTitle = (node: EnhancedTreeNode) => {
    const isFolder = node.type === 'folder';
    const isExpanded = expandedKeys.includes(node.key as string);
    const isSelected = selectedKeys.includes(node.key as string);
    const isDragOver = dragOverKey === node.key;

    return (
      <div
        className={cn(
          "flex items-center gap-2 px-2 py-1.5 rounded-md group transition-all duration-200 cursor-pointer",
          "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
          isSelected && "bg-sidebar-primary/10 text-sidebar-primary font-medium",
          isDragOver && "bg-accent/20 ring-1 ring-accent/50"
        )}
        onClick={(e) => {
          e.stopPropagation();
          if (isFolder) {
            toggleFolder(node.key as string, isExpanded);
          }
        }}
      >
        {/* File/Folder Icon */}
        <div className="flex-shrink-0">
          {getFileIcon(node.fileType, isFolder, isExpanded)}
        </div>
        
        {/* Title */}
        <span className="flex-1 truncate text-sm">
          {node.title as string}
        </span>
        
        {/* Actions */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1">
          {isFolder && (
            <>
              <button
                className="p-1 rounded hover:bg-sidebar-accent/70 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  addNewFile(node.key as string);
                }}
                title="Add new file"
              >
                <FileText className="h-3 w-3" />
              </button>
              <button
                className="p-1 rounded hover:bg-sidebar-accent/70 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  addNewFolder(node.key as string);
                }}
                title="Add new folder"
              >
                <Plus className="h-3 w-3" />
              </button>
            </>
          )}
          <button
            className="p-1 rounded hover:bg-sidebar-accent/70 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              renameItem(node.key as string, node.title as string);
            }}
            title="Rename"
          >
            <Edit className="h-3 w-3" />
          </button>
          <button
            className="p-1 rounded hover:bg-red-500/20 hover:text-red-500 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              deleteItem(node.key as string);
            }}
            title="Delete"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      </div>
    );
  };

  // Custom switcher icon
  const renderSwitcherIcon = (props: AntTreeNodeProps) => {
    const expanded = props.expanded ?? false;
    return expanded ? (
      <ChevronDown className="h-3 w-3 text-sidebar-foreground/60" />
    ) : (
      <ChevronRight className="h-3 w-3 text-sidebar-foreground/60" />
    );
  };

  return (
    <div className="flex flex-col h-full ">
      {/* Scrollable tree container */}
      <div className="flex-1 py-2 px-2 overflow-y-scroll ">
        <div className="custom-tree-view">
          <Tree
            blockNode
            draggable={{
              icon: false,
              nodeDraggable: (node) => !node.key.toString().startsWith('root-'),
            }}
            showLine
            expandedKeys={expandedKeys}
            selectedKeys={selectedKeys}
            onExpand={onExpand}
            onSelect={onSelect}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            treeData={treeData}
            titleRender={renderTitle}
            switcherIcon={renderSwitcherIcon}
            showIcon={false}
            className="!bg-transparent"
            // Make the entire node clickable for folders
            style={{
              '--ant-tree-node-hover-bg': 'transparent',
              '--ant-tree-node-selected-bg': 'transparent',
            } as React.CSSProperties}
          />
        </div>
      </div>
      
     
     
    </div>
  );
};