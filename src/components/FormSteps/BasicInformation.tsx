import React from 'react';
import { FormData } from '../../types/form';

interface BasicInformationProps {
  data: FormData;
  onChange: (field: keyof FormData, value: string) => void;
  errors: Record<string, string>;
}

export const BasicInformation: React.FC<BasicInformationProps> = ({
  data,
  onChange,
  errors,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="childName"
          className="block text-sm font-medium text-gray-700"
        >
          Gyermek Teljes Neve
        </label>
        <input
          type="text"
          id="childName"
          value={data.childName}
          onChange={(e) => onChange('childName', e.target.value)}
          className={`mt-1 block w-full rounded-md border ${
            errors.childName ? 'border-red-300' : 'border-gray-300'
          } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
          aria-invalid={!!errors.childName}
          aria-describedby={errors.childName ? 'childName-error' : undefined}
        />
        {errors.childName && (
          <p className="mt-1 text-sm text-red-600" id="childName-error">
            {errors.childName}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="dateOfBirth"
          className="block text-sm font-medium text-gray-700"
        >
          Születési Dátum
        </label>
        <input
          type="date"
          id="dateOfBirth"
          value={data.dateOfBirth}
          onChange={(e) => onChange('dateOfBirth', e.target.value)}
          className={`mt-1 block w-full rounded-md border ${
            errors.dateOfBirth ? 'border-red-300' : 'border-gray-300'
          } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
          aria-invalid={!!errors.dateOfBirth}
          aria-describedby={errors.dateOfBirth ? 'dateOfBirth-error' : undefined}
        />
        {errors.dateOfBirth && (
          <p className="mt-1 text-sm text-red-600" id="dateOfBirth-error">
            {errors.dateOfBirth}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="parentName"
          className="block text-sm font-medium text-gray-700"
        >
          Szülő/Gondviselő Teljes Neve
        </label>
        <input
          type="text"
          id="parentName"
          value={data.parentName}
          onChange={(e) => onChange('parentName', e.target.value)}
          className={`mt-1 block w-full rounded-md border ${
            errors.parentName ? 'border-red-300' : 'border-gray-300'
          } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
          aria-invalid={!!errors.parentName}
          aria-describedby={errors.parentName ? 'parentName-error' : undefined}
        />
        {errors.parentName && (
          <p className="mt-1 text-sm text-red-600" id="parentName-error">
            {errors.parentName}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700"
        >
          Cím
        </label>
        <textarea
          id="address"
          value={data.address}
          onChange={(e) => onChange('address', e.target.value)}
          rows={3}
          className={`mt-1 block w-full rounded-md border ${
            errors.address ? 'border-red-300' : 'border-gray-300'
          } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
          aria-invalid={!!errors.address}
          aria-describedby={errors.address ? 'address-error' : undefined}
        />
        {errors.address && (
          <p className="mt-1 text-sm text-red-600" id="address-error">
            {errors.address}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Telefonszám
          </label>
          <input
            type="tel"
            id="phone"
            value={data.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            className={`mt-1 block w-full rounded-md border ${
              errors.phone ? 'border-red-300' : 'border-gray-300'
            } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600" id="phone-error">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email Cím
          </label>
          <input
            type="email"
            id="email"
            value={data.email}
            onChange={(e) => onChange('email', e.target.value)}
            className={`mt-1 block w-full rounded-md border ${
              errors.email ? 'border-red-300' : 'border-gray-300'
            } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600" id="email-error">
              {errors.email}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};