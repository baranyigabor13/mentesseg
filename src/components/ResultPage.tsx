import React from 'react';
import { Copy, Download, ArrowLeft } from 'lucide-react';

interface ResultPageProps {
  content: string;
  onBack: () => void;
}

export const ResultPage: React.FC<ResultPageProps> = ({ content, onBack }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
    } catch (err) {
      console.error('Másolási hiba:', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'oltasi-mentesseg-kerelem.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Vissza a kérelemhez
          </button>
          <div className="flex gap-4">
            <button
              onClick={handleCopy}
              className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <Copy className="mr-2 h-4 w-4" />
              Másolás
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
            >
              <Download className="mr-2 h-4 w-4" />
              Letöltés
            </button>
          </div>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Generált Kérelem
          </h2>
          <div className="prose max-w-none">
            <pre className="whitespace-pre-wrap break-words font-sans text-base leading-relaxed text-gray-900">
              {content}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};