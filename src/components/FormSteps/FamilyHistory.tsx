import React from 'react';
import { FormData } from '../../types/form';

const FAMILY_CONDITIONS = [
  { id: 'autoimmune', label: 'Autoimmun betegség (pl. Hashimoto, Rheumatoid arthritis, Lupus, Sclerosis Multiplex, I-es típusú diabétesz, Cöliákia, stb.)' },
  { id: 'anaphylaxis', label: 'Súlyos allergiás reakció (anafilaxia)' },
  { id: 'epilepsy', label: 'Epilepszia / görcsbetegség' },
  { id: 'neurological', label: 'Más súlyos neurológiai betegség' },
  { id: 'immunodeficiency', label: 'Ismert immunhiányos állapot' },
  { id: 'vaccine_reaction', label: 'Súlyos oltási reakció/károsodás' },
];

interface FamilyHistoryProps {
  data: FormData;
  onChange: (field: keyof FormData, value: any) => void;
  errors: Record<string, string>;
}

export const FamilyHistory: React.FC<FamilyHistoryProps> = ({
  data,
  onChange,
  errors,
}) => {
  const handleFamilyConditionChange = (conditionId: string) => {
    const currentConditions = data.familyHistory || [];
    const newConditions = currentConditions.includes(conditionId)
      ? currentConditions.filter((id) => id !== conditionId)
      : [...currentConditions, conditionId];
    onChange('familyHistory', newConditions);
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Előfordult-e a gyermek közvetlen családjában (szülők, testvérek) az alábbi állapotok/betegségek bármelyike?
        </h3>

        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="radio"
                id="no_family_history"
                checked={!data.familyHistory?.length}
                onChange={() => {
                  onChange('familyHistory', []);
                  onChange('additionalFamilyDetails', '');
                }}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
            </div>
            <label htmlFor="no_family_history" className="ml-3 text-sm font-medium text-gray-700">
              Nem tudunk ilyenről
            </label>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="radio"
                id="has_family_history"
                checked={!!data.familyHistory?.length}
                onChange={() => onChange('familyHistory', ['temp'])}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
            </div>
            <label htmlFor="has_family_history" className="ml-3 text-sm font-medium text-gray-700">
              Igen, előfordult az alábbi(ak)
            </label>
          </div>

          {!!data.familyHistory?.length && (
            <div className="space-y-4 pl-6">
              {FAMILY_CONDITIONS.map((condition) => (
                <div key={condition.id} className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      id={condition.id}
                      checked={(data.familyHistory || []).includes(condition.id)}
                      onChange={() => handleFamilyConditionChange(condition.id)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                  <label
                    htmlFor={condition.id}
                    className="ml-3 text-sm font-medium text-gray-700"
                  >
                    {condition.label}
                  </label>
                </div>
              ))}

              {data.familyHistory.includes('vaccine_reaction') && (
                <div className="mt-2">
                  <label
                    htmlFor="additional_details"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Kérjük, írja le röviden az oltási reakciót/károsodást
                  </label>
                  <textarea
                    id="additional_details"
                    value={data.additionalFamilyDetails || ''}
                    onChange={(e) => onChange('additionalFamilyDetails', e.target.value)}
                    rows={2}
                    className={`mt-1 block w-full rounded-md border ${
                      errors.additionalFamilyDetails ? 'border-red-300' : 'border-gray-300'
                    } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    placeholder="Kérjük, írja le röviden..."
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Előfordult-e a tágabb családban (nagyszülők, szülők testvérei) az előző pontban felsorolt állapotok/betegségek bármelyike?
        </h3>

        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="radio"
                id="no_extended_family"
                checked={data.extendedFamilyHistory === false}
                onChange={() => onChange('extendedFamilyHistory', false)}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
            </div>
            <label htmlFor="no_extended_family" className="ml-3 text-sm font-medium text-gray-700">
              Nem tudunk ilyenről
            </label>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="radio"
                id="has_extended_family"
                checked={data.extendedFamilyHistory === true}
                onChange={() => onChange('extendedFamilyHistory', true)}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
            </div>
            <label htmlFor="has_extended_family" className="ml-3 text-sm font-medium text-gray-700">
              Igen (Nem szükséges részletezni, csak jelölni)
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};