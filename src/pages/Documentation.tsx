import React, { useState } from 'react';
import { DocSidebar } from '../components/DocSidebar';
import { DocViewer } from '../components/DocViewer';
import { DocItem } from '../types/docs';
import { docStructure } from '../data/docStructure';

export function Documentation() {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['legal-docs']));
  const [selectedDoc, setSelectedDoc] = useState<DocItem | null>(null);

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => {
      const next = new Set(prev);
      if (next.has(folderId)) {
        next.delete(folderId);
      } else {
        next.add(folderId);
      }
      return next;
    });
  };

  const handleFileClick = (item: DocItem) => {
    setSelectedDoc(item);
  };

  const handleExport = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop() || 'document.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#13111C] text-white flex">
      <DocSidebar
        docStructure={docStructure}
        expandedFolders={expandedFolders}
        selectedDoc={selectedDoc}
        onToggleFolder={toggleFolder}
        onFileClick={handleFileClick}
      />
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <DocViewer
            selectedDoc={selectedDoc}
            onExport={handleExport}
          />
        </div>
      </div>
    </div>
  );
}