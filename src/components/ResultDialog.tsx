import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Copy, Download, X } from 'lucide-react';

interface ResultDialogProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
}

export const ResultDialog: React.FC<ResultDialogProps> = ({
  isOpen,
  onClose,
  content,
}) => {
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
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[900px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-lg font-semibold">
              Generált Kérelem
            </Dialog.Title>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <Copy className="mr-2 h-4 w-4" />
                Másolás
              </button>
              <button
                onClick={handleDownload}
                className="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <Download className="mr-2 h-4 w-4" />
                Letöltés
              </button>
              <Dialog.Close className="rounded-full p-1 hover:bg-gray-100">
                <X className="h-4 w-4" />
              </Dialog.Close>
            </div>
          </div>
          <div className="mt-4 max-h-[calc(85vh-8rem)] overflow-y-auto">
            <pre className="whitespace-pre-wrap break-words font-sans text-sm">
              {content}
            </pre>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};