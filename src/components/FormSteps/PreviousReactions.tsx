import React from 'react';
import { FormData } from '../../types/form';

const REACTION_TYPES = [
  { id: 'high_fever', label: 'Szokatlanul magas láz (39.5°C felett)' },
  { id: 'neutropenic_fever', label: 'Neutropéniás láz (ha diagnosztizálták)' },
  { id: 'inconsolable_crying', label: 'Vigasztalhatatlan, szokatlanul hosszan tartó sírás (több mint 3 órán át)' },
  { id: 'seizure', label: 'Görcsroham (lázas vagy láz nélküli)' },
  { id: 'lethargy', label: 'Szokatlan aluszékonyság, "ernyedtség", nehéz ébreszthetőség' },
  { id: 'allergic_reaction', label: 'Súlyos allergiás reakció (pl. légzési nehézség, ajak-/arcduzzanat, anafilaxia)' },
  { id: 'skin_reaction', label: 'Kiterjedt bőrreakció (pl. testszerte csalánkiütés, súlyos ekcéma fellángolás)' },
  { id: 'swelling', label: 'Nagy kiterjedésű duzzanat/vörösség az oltás helyén (túlnyúlik a legközelebbi ízületen)' },
  { id: 'developmental_regression', label: 'Fejlődésbeli megtorpanás vagy visszaesés (pl. beszéd, mozgás terén)' },
  { id: 'behavior_change', label: 'Tartós viselkedésváltozás (pl. extrém ingerlékenység, apátia)' },
  { id: 'digestive_issues', label: 'Súlyos emésztőrendszeri tünetek (pl. véres hasmenés, hányás)' },
];

interface PreviousReactionsProps {
  data: FormData;
  onChange: (field: keyof FormData, value: any) => void;
  errors: Record<string, string>;
}

export const PreviousReactions: React.FC<PreviousReactionsProps> = ({
  data,
  onChange,
  errors,
}) => {
  const handleReactionTypeChange = (reactionId: string) => {
    const currentTypes = data.reactionTypes || [];
    const newTypes = currentTypes.includes(reactionId)
      ? currentTypes.filter((id) => id !== reactionId)
      : [...currentTypes, reactionId];
    onChange('reactionTypes', newTypes);
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Tapasztaltak-e a gyermeknél KORÁBBI oltást követően az alábbiak közül bármelyiket?
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="radio"
                id="no_reactions"
                checked={!data.hadPreviousReactions}
                onChange={() => {
                  onChange('hadPreviousReactions', false);
                  onChange('reactionTypes', []);
                  onChange('reactionDetails', '');
                }}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
            </div>
            <label htmlFor="no_reactions" className="ml-3 text-sm font-medium text-gray-700">
              Nem, semmilyen szokatlan reakciót nem észleltünk
            </label>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="radio"
                id="had_reactions"
                checked={data.hadPreviousReactions}
                onChange={() => onChange('hadPreviousReactions', true)}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
            </div>
            <label htmlFor="had_reactions" className="ml-3 text-sm font-medium text-gray-700">
              Igen, észleltünk reakció(ka)t
            </label>
          </div>
        </div>
      </div>

      {data.hadPreviousReactions && (
        <div className="space-y-6 pl-6">
          <div className="space-y-4">
            {REACTION_TYPES.map((reaction) => (
              <div key={reaction.id} className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    id={reaction.id}
                    checked={(data.reactionTypes || []).includes(reaction.id)}
                    onChange={() => handleReactionTypeChange(reaction.id)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>
                <label
                  htmlFor={reaction.id}
                  className="ml-3 text-sm font-medium text-gray-700"
                >
                  {reaction.label}
                </label>
              </div>
            ))}
          </div>

          <div>
            <label
              htmlFor="other_reaction"
              className="block text-sm font-medium text-gray-700"
            >
              Egyéb, Ön szerint oltással összefüggő súlyos vagy szokatlan esemény
            </label>
            <textarea
              id="other_reaction"
              value={data.reactionDetails || ''}
              onChange={(e) => onChange('reactionDetails', e.target.value)}
              rows={3}
              className={`mt-1 block w-full rounded-md border ${
                errors.reactionDetails ? 'border-red-300' : 'border-gray-300'
              } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              placeholder="Kérjük, írja le röviden..."
            />
          </div>

          <div>
            <label
              htmlFor="reaction_vaccines"
              className="block text-sm font-medium text-gray-700"
            >
              Melyik oltás(ok) után észlelték a reakció(ka)t?
            </label>
            <input
              type="text"
              id="reaction_vaccines"
              value={data.reactionVaccines || ''}
              onChange={(e) => onChange('reactionVaccines', e.target.value)}
              className={`mt-1 block w-full rounded-md border ${
                errors.reactionVaccines ? 'border-red-300' : 'border-gray-300'
              } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              placeholder="Pl.: MMR, DTPa..."
            />
          </div>

          <div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id="has_documentation"
                  checked={data.hasDocumentation}
                  onChange={(e) => onChange('hasDocumentation', e.target.checked)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </div>
              <label
                htmlFor="has_documentation"
                className="ml-3 text-sm font-medium text-gray-700"
              >
                Van orvosi dokumentáció a reakció(k)ról
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};