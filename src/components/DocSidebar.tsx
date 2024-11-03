import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronDown, FolderOpen, FileText } from 'lucide-react';
import { DocItem } from '../types/docs';

interface DocSidebarProps {
  docStructure: DocItem[];
  expandedFolders: Set<string>;
  selectedDoc: DocItem | null;
  onToggleFolder: (folderId: string) => void;
  onFileClick: (item: DocItem) => void;
}

export function DocSidebar({
  docStructure,
  expandedFolders,
  selectedDoc,
  onToggleFolder,
  onFileClick,
}: DocSidebarProps) {
  const navigate = useNavigate();

  const renderDocItem = (item: DocItem, level: number = 0) => {
    const isExpanded = expandedFolders.has(item.id);
    const isSelected = selectedDoc?.id === item.id;
    const paddingLeft = `${level * 1.5 + 1}rem`;

    if (item.type === 'folder') {
      return (
        <div key={item.id}>
          <button
            onClick={() => onToggleFolder(item.id)}
            className={`w-full text-left py-2 px-4 hover:bg-white/5 flex items-center gap-2 transition-colors`}
            style={{ paddingLeft }}
          >
            <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-0' : '-rotate-90'}`} />
            <FolderOpen className="w-4 h-4 text-yellow-500" />
            <span>{item.title}</span>
          </button>
          {isExpanded && item.children && (
            <div className="transition-all">
              {item.children.map(child => renderDocItem(child, level + 1))}
            </div>
          )}
        </div>
      );
    }

    return (
      <button
        key={item.id}
        onClick={() => onFileClick(item)}
        className={`w-full text-left py-2 px-4 hover:bg-white/5 flex items-center gap-2 transition-colors ${
          isSelected ? 'bg-white/10' : ''
        }`}
        style={{ paddingLeft }}
      >
        <FileText className="w-4 h-4 text-red-400" />
        <span>{item.title}</span>
        <span className="ml-auto text-xs text-gray-500 uppercase">PDF</span>
      </button>
    );
  };

  return (
    <div className="w-64 border-r border-gray-800 h-screen overflow-y-auto">
      <div className="p-4 border-b border-gray-800 flex items-center gap-2">
        <button
          onClick={() => navigate('/')}
          className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="font-bold">Documentation</h1>
      </div>
      <nav className="py-4">
        {docStructure.map(item => renderDocItem(item))}
      </nav>
    </div>
  );
}