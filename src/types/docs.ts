export interface DocItem {
  id: string;
  title: string;
  type: 'folder' | 'file';
  fileType?: 'pdf';
  url?: string;
  children?: DocItem[];
}