import React from 'react';
import { FormData } from '../../types/form';

const DIAGNOSED_CONDITIONS = [
  { id: 'autoimmune', label: 'Diagnosztizált autoimmun betegség (pl. I-es típusú diabétesz, cöliákia, juvenilis arthritis, stb.)' },
  { id: 'epilepsy', label: 'Epilepszia vagy más görcsrendellenesség' },
  { id: 'neurological', label: 'Más ismert neurológiai betegség/állapot (pl. agyi bénulás)' },
  { id: 'immunodeficiency', label: 'Ismert immunhiányos állapot (veleszületett vagy szerzett)' },
  { id: 'asthma', label: 'Súlyos, kezelést igénylő asztma' },
  { id: 'eczema', label: 'Súlyos, kiterjedt ekcéma' },
  { id: 'heart', label: 'Ismert szívbetegség' },
  { id: 'kidney', label: 'Ismert vesebetegség' },
  { id: 'metabolic', label: 'Anyagcsere-betegség' },
  { id: 'genetic', label: 'Genetikai rendellenesség / szindróma' },
  { id: 'cancer', label: 'Daganatos megbetegedés (jelenleg vagy kórtörténetben)' },
  { id: 'blood', label: 'Vérképzőszervi rendellenesség' },
];

const KNOWN_ALLERGIES = [
  { id: 'egg', label: 'Tojásfehérje' },
  { id: 'gelatin', label: 'Zselatin' },
  { id: 'neomycin', label: 'Neomicin (antibiotikum)' },
  { id: 'streptomycin', label: 'Sztriptomicin (antibiotikum)' },
  { id: 'polymyxin', label: 'Polimixin B (antibiotikum)' },
  { id: 'latex', label: 'Latex' },
  { id: 'yeast', label: 'Élesztő' },
];

interface CurrentHealthProps {
  data: FormData;
  onChange: (field: keyof FormData, value: any) => void;
  errors: Record<string, string>;
}

export const CurrentHealth: React.FC<CurrentHealthProps> = ({
  data,
  onChange,
  errors,
}) => {
  const handleConditionChange = (conditionId: string) => {
    const currentConditions = data.diagnosedConditions || [];
    const newConditions = currentConditions.includes(conditionId)
      ? currentConditions.filter((id) => id !== conditionId)
      : [...currentConditions, conditionId];
    onChange('diagnosedConditions', newConditions);
  };

  const handleAllergyChange = (allergyId: string) => {
    const currentAllergies = data.knownAllergies || [];
    const newAllergies = currentAllergies.includes(allergyId)
      ? currentAllergies.filter((id) => id !== allergyId)
      : [...currentAllergies, allergyId];
    onChange('knownAllergies', newAllergies);
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Van-e a gyermeknek jelenleg az alábbi diagnosztizált betegségei vagy állapotai közül bármelyik?
        </h3>

        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="radio"
                id="no_conditions"
                checked={!data.diagnosedConditions?.length}
                onChange={() => onChange('diagnosedConditions', [])}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
            </div>
            <label htmlFor="no_conditions" className="ml-3 text-sm font-medium text-gray-700">
              Nincs ismert krónikus betegsége vagy állapota
            </label>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="radio"
                id="has_conditions"
                checked={!!data.diagnosedConditions?.length}
                onChange={() => onChange('diagnosedConditions', ['temp'])}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
            </div>
            <label htmlFor="has_conditions" className="ml-3 text-sm font-medium text-gray-700">
              Igen, van(nak) az alábbiak közül
            </label>
          </div>

          {!!data.diagnosedConditions?.length && (
            <div className="space-y-4 pl-6">
              {DIAGNOSED_CONDITIONS.map((condition) => (
                <div key={condition.id} className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      id={condition.id}
                      checked={(data.diagnosedConditions || []).includes(condition.id)}
                      onChange={() => handleConditionChange(condition.id)}
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

              <div>
                <label
                  htmlFor="other_conditions"
                  className="block text-sm font-medium text-gray-700"
                >
                  Egyéb súlyos krónikus betegség
                </label>
                <textarea
                  id="other_conditions"
                  value={data.otherConditions || ''}
                  onChange={(e) => onChange('otherConditions', e.target.value)}
                  rows={2}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.otherConditions ? 'border-red-300' : 'border-gray-300'
                  } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  placeholder="Kérjük, írja le röviden..."
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Ismert-e a gyermeknek bármilyen allergiája?
        </h3>

        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="radio"
                id="no_allergies"
                checked={!data.knownAllergies?.length}
                onChange={() => onChange('knownAllergies', [])}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
            </div>
            <label htmlFor="no_allergies" className="ml-3 text-sm font-medium text-gray-700">
              Nincs ismert allergiája
            </label>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="radio"
                id="has_allergies"
                checked={!!data.knownAllergies?.length}
                onChange={() => onChange('knownAllergies', ['temp'])}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
            </div>
            <label htmlFor="has_allergies" className="ml-3 text-sm font-medium text-gray-700">
              Igen, allergiás az alábbi(ak)ra
            </label>
          </div>

          {!!data.knownAllergies?.length && (
            <div className="space-y-4 pl-6">
              {KNOWN_ALLERGIES.map((allergy) => (
                <div key={allergy.id} className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      id={allergy.id}
                      checked={(data.knownAllergies || []).includes(allergy.id)}
                      onChange={() => handleAllergyChange(allergy.id)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                  <label
                    htmlFor={allergy.id}
                    className="ml-3 text-sm font-medium text-gray-700"
                  >
                    {allergy.label}
                  </label>
                </div>
              ))}

              <div>
                <label
                  htmlFor="other_medications"
                  className="block text-sm font-medium text-gray-700"
                >
                  Más gyógyszer(ek)
                </label>
                <input
                  type="text"
                  id="other_medications"
                  value={data.medications || ''}
                  onChange={(e) => onChange('medications', e.target.value)}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.medications ? 'border-red-300' : 'border-gray-300'
                  } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  placeholder="Kérjük, sorolja fel..."
                />
              </div>

              <div>
                <label
                  htmlFor="food_allergies"
                  className="block text-sm font-medium text-gray-700"
                >
                  Étel(ek) (súlyos, anafilaxiás reakciót okozó)
                </label>
                <input
                  type="text"
                  id="food_allergies"
                  value={data.allergies || ''}
                  onChange={(e) => onChange('allergies', e.target.value)}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.allergies ? 'border-red-300' : 'border-gray-300'
                  } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  placeholder="Kérjük, sorolja fel..."
                />
              </div>

              <div>
                <label
                  htmlFor="other_allergies"
                  className="block text-sm font-medium text-gray-700"
                >
                  Egyéb allergiák
                </label>
                <input
                  type="text"
                  id="other_allergies"
                  value={data.otherAllergies || ''}
                  onChange={(e) => onChange('otherAllergies', e.target.value)}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.otherAllergies ? 'border-red-300' : 'border-gray-300'
                  } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  placeholder="Kérjük, sorolja fel..."
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};