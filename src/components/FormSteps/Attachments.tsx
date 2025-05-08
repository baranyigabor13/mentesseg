import React from 'react';
import { FormData } from '../../types/form';
import { Loader2 } from 'lucide-react';

interface AttachmentsProps {
  data: FormData;
  onChange: (field: keyof FormData, value: any) => void;
  errors: Record<string, string>;
  isSubmitting?: boolean;
}

export const Attachments: React.FC<AttachmentsProps> = ({
  data,
  onChange,
  errors,
  isSubmitting = false,
}) => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Rendelkeznek-e olyan orvosi leletekkel, dokumentumokkal, amelyek alátámasztják a III., IV. vagy V. pontban jelölt egészségügyi állapotokat, allergiákat vagy reakciókat?
        </h3>

        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="radio"
                id="has_documents_yes"
                checked={data.hasSupportingDocuments === true}
                onChange={() => onChange('hasSupportingDocuments', true)}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                disabled={isSubmitting}
              />
            </div>
            <label
              htmlFor="has_documents_yes"
              className="ml-3 text-sm font-medium text-gray-700"
            >
              Igen
            </label>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="radio"
                id="has_documents_no"
                checked={data.hasSupportingDocuments === false}
                onChange={() => {
                  onChange('hasSupportingDocuments', false);
                  onChange('documentDescriptions', '');
                }}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                disabled={isSubmitting}
              />
            </div>
            <label
              htmlFor="has_documents_no"
              className="ml-3 text-sm font-medium text-gray-700"
            >
              Nem
            </label>
          </div>
        </div>

        {errors.hasSupportingDocuments && (
          <p className="mt-2 text-sm text-red-600">
            {errors.hasSupportingDocuments}
          </p>
        )}
      </div>

      {data.hasSupportingDocuments && (
        <div>
          <label
            htmlFor="document_descriptions"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Ha igen, kérjük, röviden sorolja fel, milyen típusú dokumentumokkal rendelkezik (pl. allergia teszt eredmény, kórházi zárójelentés, szakorvosi vélemény, stb.):
          </label>
          <textarea
            id="document_descriptions"
            value={data.documentDescriptions}
            onChange={(e) => onChange('documentDescriptions', e.target.value)}
            rows={4}
            disabled={isSubmitting}
            className={`mt-1 block w-full rounded-md border ${
              errors.documentDescriptions ? 'border-red-300' : 'border-gray-300'
            } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              isSubmitting ? 'bg-gray-50' : ''
            }`}
            placeholder="Kérjük, sorolja fel a dokumentumok típusait..."
          />
          {errors.documentDescriptions && (
            <p className="mt-1 text-sm text-red-600">
              {errors.documentDescriptions}
            </p>
          )}
        </div>
      )}

      {isSubmitting && (
        <div className="fixed inset-0 bg-white/80 flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-4 p-4 rounded-lg bg-white shadow-lg">
            <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
            <p className="text-gray-700 font-medium">Kérelem generálása folyamatban...</p>
          </div>
        </div>
      )}
    </div>
  );
};