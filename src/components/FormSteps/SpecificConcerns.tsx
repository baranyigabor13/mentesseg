import React from 'react';
import { FormData } from '../../types/form';

const INGREDIENT_CONCERNS = [
  { id: 'none', label: 'Nem vizsgáltam/Nincsenek konkrét aggályaim az összetevőkkel.' },
  { id: 'aluminum', label: 'Alumínium vegyületek (adjuvánsok)' },
  { id: 'formaldehyde', label: 'Formaldehid' },
  { id: 'polysorbate', label: 'Poliszorbát 80' },
  { id: 'antibiotics', label: 'Antibiotikum maradványok (pl. neomicin)' },
  { id: 'human_cells', label: 'Emberi magzati sejtvonalakból származó maradványok' },
  { id: 'live_virus', label: 'Élő, gyengített vírusok (ha releváns, pl. MMR)' },
  { id: 'too_many', label: 'Általánosságban a "túl sok", "túl korán" beadott oltás' },
  { id: 'long_term', label: 'Az összetevők hosszú távú hatásai' },
  { id: 'other', label: 'Egyéb összetevő:' },
];

const EXEMPTION_REASONS = [
  { id: 'health_risks', label: 'A fentebb részletezett konkrét egészségügyi kockázatok (gyermeknél vagy családban).' },
  { id: 'general_safety', label: 'Általános aggodalom az oltások biztonságosságával kapcsolatban.' },
  { id: 'long_term_effects', label: 'Aggodalom a hosszú távú mellékhatások miatt (pl. autoimmun, neurológiai betegségek).' },
  { id: 'religious', label: 'Vallási vagy világnézeti meggyőződés.' },
  { id: 'previous_experience', label: 'Korábbi negatív tapasztalat (akár saját, akár másoké).' },
  { id: 'natural_immunity', label: 'Természetes immunitás előnyben részesítése.' },
  { id: 'distrust', label: 'Bizalmatlanság a gyógyszeriparral vagy a hatóságokkal szemben.' },
  { id: 'other', label: 'Egyéb ok:' },
];

interface SpecificConcernsProps {
  data: FormData;
  onChange: (field: keyof FormData, value: any) => void;
  errors: Record<string, string>;
}

export const SpecificConcerns: React.FC<SpecificConcernsProps> = ({
  data,
  onChange,
  errors,
}) => {
  const handleIngredientChange = (ingredientId: string) => {
    let newIngredients: string[];

    if (ingredientId === 'none') {
      // If "none" is selected, clear all other selections
      newIngredients = data.ingredientConcerns.includes('none') ? [] : ['none'];
    } else {
      // Remove "none" if it exists and handle other selections
      newIngredients = data.ingredientConcerns.filter(id => id !== 'none');
      
      if (newIngredients.includes(ingredientId)) {
        newIngredients = newIngredients.filter(id => id !== ingredientId);
      } else {
        newIngredients.push(ingredientId);
      }
    }

    onChange('ingredientConcerns', newIngredients);

    // Clear other ingredient text if "other" is unchecked
    if (ingredientId === 'other' && !newIngredients.includes('other')) {
      onChange('otherIngredientConcern', '');
    }
  };

  const handleExemptionReasonChange = (reasonId: string) => {
    const currentReasons = data.exemptionReasons || [];
    const newReasons = currentReasons.includes(reasonId)
      ? currentReasons.filter(id => id !== reasonId)
      : [...currentReasons, reasonId];
    
    onChange('exemptionReasons', newReasons);

    // Clear other reason text if "other" is unchecked
    if (reasonId === 'other' && !newReasons.includes('other')) {
      onChange('otherExemptionReason', '');
    }

    // Clear religious beliefs text if "religious" is unchecked
    if (reasonId === 'religious' && !newReasons.includes('religious')) {
      onChange('religiousBeliefs', '');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Vannak-e konkrét összetevők a soron következő oltóanyagban, amelyek aggodalomra adnak okot? (Többet is jelölhet)
        </h3>

        <div className="space-y-4">
          {INGREDIENT_CONCERNS.map((concern) => (
            <div key={concern.id} className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id={`ingredient_${concern.id}`}
                  checked={data.ingredientConcerns?.includes(concern.id)}
                  onChange={() => handleIngredientChange(concern.id)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </div>
              <label
                htmlFor={`ingredient_${concern.id}`}
                className="ml-3 text-sm font-medium text-gray-700"
              >
                {concern.label}
              </label>
            </div>
          ))}

          {data.ingredientConcerns?.includes('other') && (
            <div className="ml-8">
              <textarea
                id="other_ingredient_concern"
                value={data.otherIngredientConcern || ''}
                onChange={(e) => onChange('otherIngredientConcern', e.target.value)}
                placeholder="(Röviden)"
                rows={2}
                className={`mt-1 block w-full rounded-md border ${
                  errors.otherIngredientConcern ? 'border-red-300' : 'border-gray-300'
                } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.otherIngredientConcern && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.otherIngredientConcern}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Mi a fő oka annak, hogy oltásmentességet kérnek gyermekük számára? (Többet is jelölhet)
        </h3>

        <div className="space-y-4">
          {EXEMPTION_REASONS.map((reason) => (
            <div key={reason.id} className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id={`reason_${reason.id}`}
                  checked={data.exemptionReasons?.includes(reason.id)}
                  onChange={() => handleExemptionReasonChange(reason.id)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </div>
              <label
                htmlFor={`reason_${reason.id}`}
                className="ml-3 text-sm font-medium text-gray-700"
              >
                {reason.label}
              </label>
            </div>
          ))}

          {data.exemptionReasons?.includes('other') && (
            <div className="ml-8">
              <textarea
                id="other_exemption_reason"
                value={data.otherExemptionReason || ''}
                onChange={(e) => onChange('otherExemptionReason', e.target.value)}
                placeholder="(Röviden)"
                rows={2}
                className={`mt-1 block w-full rounded-md border ${
                  errors.otherExemptionReason ? 'border-red-300' : 'border-gray-300'
                } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.otherExemptionReason && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.otherExemptionReason}
                </p>
              )}
            </div>
          )}

          {data.exemptionReasons?.includes('religious') && (
            <div className="ml-8">
              <label
                htmlFor="religious_beliefs"
                className="block text-sm font-medium text-gray-700"
              >
                Kérjük, fejtse ki vallási vagy világnézeti meggyőződését:
              </label>
              <textarea
                id="religious_beliefs"
                value={data.religiousBeliefs || ''}
                onChange={(e) => onChange('religiousBeliefs', e.target.value)}
                rows={3}
                className={`mt-1 block w-full rounded-md border ${
                  errors.religiousBeliefs ? 'border-red-300' : 'border-gray-300'
                } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.religiousBeliefs && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.religiousBeliefs}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};