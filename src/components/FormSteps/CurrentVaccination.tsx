import React from 'react';
import { FormData } from '../../types/form';

const VACCINES = [
  { id: 'bcg', label: 'BCG (általában születéskor)' },
  { id: 'dtpa_2m', label: 'DTPa-IPV-Hib (2 hónapos)' },
  { id: 'pcv_2m', label: 'PCV (Pneumococcus - 2 hónapos)' },
  { id: 'dtpa_3m', label: 'DTPa-IPV-Hib (3 hónapos)' },
  { id: 'dtpa_4m', label: 'DTPa-IPV-Hib (4 hónapos)' },
  { id: 'pcv_4m', label: 'PCV (Pneumococcus - 4 hónapos)' },
  { id: 'mmr', label: 'MMR (Morbilli-Mumpsz-Rubeola - 15 hónapos)' },
  { id: 'dtpa_18m', label: 'DTPa-IPV-Hib (18 hónapos)' },
  { id: 'pcv_12m', label: 'PCV (Pneumococcus - 12-15 hónapos korig)' },
  { id: 'dtpa_6y', label: 'DTPa-IPV (6 éves)' },
  { id: 'dtap_11y', label: 'dTap (Diftéria-Tetanusz-Pertusszisz, emlékeztető - 11 éves, 6. osztály)' },
];

interface CurrentVaccinationProps {
  data: FormData;
  onChange: (field: keyof FormData, value: any) => void;
  errors: Record<string, string>;
}

export const CurrentVaccination: React.FC<CurrentVaccinationProps> = ({
  data,
  onChange,
  errors,
}) => {
  const handleVaccineChange = (vaccineId: string) => {
    onChange('currentVaccines', [vaccineId]);
  };

  const handleOtherVaccineChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange('currentVaccines', ['other']);
    onChange('otherVaccineDetails', e.target.value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Melyik életkorhoz kötött kötelező oltás beadása esedékes MOST, ami miatt a mentességet kérik?
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Kérjük, csak egyet válasszon, vagy a legközelebbit jelölje meg
        </p>
        <div className="space-y-3">
          {VACCINES.map((vaccine) => (
            <div key={vaccine.id} className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id={vaccine.id}
                  type="radio"
                  name="vaccine"
                  checked={data.currentVaccines?.includes(vaccine.id)}
                  onChange={() => handleVaccineChange(vaccine.id)}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
              </div>
              <label
                htmlFor={vaccine.id}
                className="ml-3 text-sm font-medium text-gray-700"
              >
                {vaccine.label}
              </label>
            </div>
          ))}

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="other"
                type="radio"
                name="vaccine"
                checked={data.currentVaccines?.includes('other')}
                onChange={() => handleVaccineChange('other')}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
            </div>
            <div className="ml-3">
              <label
                htmlFor="other"
                className="text-sm font-medium text-gray-700"
              >
                Más/Több oltás egyszerre
              </label>
              <textarea
                id="otherDetails"
                value={data.otherVaccineDetails || ''}
                onChange={handleOtherVaccineChange}
                placeholder="Kérjük, írja le..."
                className={`mt-1 block w-full rounded-md border ${
                  errors.otherVaccineDetails ? 'border-red-300' : 'border-gray-300'
                } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                rows={2}
              />
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="unknown"
                type="radio"
                name="vaccine"
                checked={data.currentVaccines?.includes('unknown')}
                onChange={() => handleVaccineChange('unknown')}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
            </div>
            <label
              htmlFor="unknown"
              className="ml-3 text-sm font-medium text-gray-700"
            >
              Nem tudom pontosan
            </label>
          </div>
        </div>
        {errors.currentVaccines && (
          <p className="mt-2 text-sm text-red-600">{errors.currentVaccines}</p>
        )}
      </div>
    </div>
  );
};