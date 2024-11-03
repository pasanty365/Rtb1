import React from 'react';
import { FileText, ExternalLink, Download } from 'lucide-react';
import { DocItem } from '../types/docs';

interface DocViewerProps {
  selectedDoc: DocItem | null;
  onExport: (url: string) => void;
}

export function DocViewer({ selectedDoc, onExport }: DocViewerProps) {
  if (!selectedDoc) {
    return (
      <div className="text-center text-gray-400 mt-20">
        <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
        <p>Select a document from the sidebar to view it</p>
      </div>
    );
  }

  return (
    <div className="bg-[#1E1B2E] rounded-lg p-8">
      <div className="flex items-center gap-4 mb-6">
        <FileText className="w-8 h-8 text-red-400" />
        <h1 className="text-2xl font-bold">{selectedDoc.title}</h1>
      </div>
      <div className="bg-[#13111C] rounded-lg p-6 flex flex-col items-center justify-center min-h-[400px]">
        <FileText className="w-16 h-16 text-red-400 mb-4" />
        <p className="text-gray-400 mb-4">This document is available as PDF</p>
        <div className="flex gap-4">
          <button 
            onClick={() => window.open(selectedDoc.url, '_blank')}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full flex items-center gap-2 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Open PDF
          </button>
          <button 
            onClick={() => onExport(selectedDoc.url!)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full flex items-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>
    </div>
  );
}