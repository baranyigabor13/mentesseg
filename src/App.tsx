import React, { useState } from 'react';
import { FormStep, FormData, FormErrors } from './types/form';
import { StepIndicator } from './components/StepIndicator';
import { NavigationFooter } from './components/NavigationFooter';
import { BasicInformation } from './components/FormSteps/BasicInformation';
import { CurrentVaccination } from './components/FormSteps/CurrentVaccination';
import { PreviousReactions } from './components/FormSteps/PreviousReactions';
import { CurrentHealth } from './components/FormSteps/CurrentHealth';
import { FamilyHistory } from './components/FormSteps/FamilyHistory';
import { SpecificConcerns } from './components/FormSteps/SpecificConcerns';
import { Attachments } from './components/FormSteps/Attachments';
import { ResultPage } from './components/ResultPage';
import { ClipboardList } from 'lucide-react';

const STEPS: FormStep[] = [
  { id: 1, title: 'I. Alapvető Információk' },
  { id: 2, title: 'II. Jelenlegi Oltások' },
  { id: 3, title: 'III. Korábbi Oltási Reakciók' },
  { id: 4, title: 'IV. Jelenlegi Egészségi Állapot' },
  { id: 5, title: 'V. Családi Kórtörténet' },
  { id: 6, title: 'VI. Egyedi Aggályok és Meggyőződések' },
  { id: 7, title: 'VII. Mellékletek' },
];

const initialFormData: FormData = {
  // Step 1: Basic Information
  childName: '',
  dateOfBirth: '',
  parentName: '',
  address: '',
  phone: '',
  email: '',

  // Step 2: Current Vaccination
  currentVaccines: [],
  lastVaccinationDate: '',
  otherVaccineDetails: '',

  // Step 3: Previous Reactions
  hadPreviousReactions: false,
  reactionDetails: '',
  reactionDate: '',
  medicalAttention: false,
  reactionTypes: [],
  reactionVaccines: '',
  hasDocumentation: false,

  // Step 4: Current Health
  currentHealth: '',
  medications: '',
  allergies: '',
  chronicConditions: '',
  diagnosedConditions: [],
  knownAllergies: [],
  otherAllergies: '',
  otherConditions: '',

  // Step 5: Family History
  familyHistory: [],
  additionalFamilyDetails: '',
  extendedFamilyHistory: false,

  // Step 6: Concerns
  ingredientConcerns: [],
  otherIngredientConcern: '',
  exemptionReasons: [],
  otherExemptionReason: '',
  religiousBeliefs: '',

  // Step 7: Attachments
  hasSupportingDocuments: false,
  documentDescriptions: '',
};

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    switch (step) {
      case 1:
        if (!formData.childName) newErrors.childName = 'A gyermek neve kötelező';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'A születési dátum kötelező';
        if (!formData.parentName) newErrors.parentName = 'A szülő neve kötelező';
        if (!formData.address) newErrors.address = 'A cím kötelező';
        if (!formData.phone) newErrors.phone = 'A telefonszám kötelező';
        if (!formData.email) newErrors.email = 'Az email cím kötelező';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
          newErrors.email = 'Érvénytelen email formátum';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      if (currentStep < STEPS.length) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError(null);

      const formattedData = {
        basicInfo: {
          childName: formData.childName,
          dateOfBirth: formData.dateOfBirth,
          parentName: formData.parentName,
          contactInfo: {
            address: formData.address,
            phone: formData.phone,
            email: formData.email,
          },
        },
        vaccination: {
          currentVaccines: formData.currentVaccines,
          details: formData.otherVaccineDetails,
        },
        previousReactions: {
          hadReactions: formData.hadPreviousReactions,
          types: formData.reactionTypes,
          details: formData.reactionDetails,
          vaccines: formData.reactionVaccines,
          documented: formData.hasDocumentation,
        },
        healthStatus: {
          conditions: formData.diagnosedConditions,
          otherConditions: formData.otherConditions,
          allergies: formData.knownAllergies,
          otherAllergies: formData.otherAllergies,
          medications: formData.medications,
        },
        familyHistory: {
          conditions: formData.familyHistory,
          details: formData.additionalFamilyDetails,
          extendedFamily: formData.extendedFamilyHistory,
        },
        concerns: {
          ingredients: formData.ingredientConcerns,
          otherIngredients: formData.otherIngredientConcern,
          reasons: formData.exemptionReasons,
          otherReasons: formData.otherExemptionReason,
          religiousBeliefs: formData.religiousBeliefs,
        },
        documentation: {
          hasDocuments: formData.hasSupportingDocuments,
          descriptions: formData.documentDescriptions,
        },
      };

      const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
      const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
        throw new Error('Hiányzó Supabase konfigurációs adatok');
      }

      const response = await fetch(`${SUPABASE_URL}/functions/v1/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API hiba: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      
      if (!result.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error('Érvénytelen válasz formátum');
      }

      setAnalysisResult(result.candidates[0].content.parts[0].text);
      setCompletedSteps([...completedSteps, currentStep]);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(
        'Hiba történt a kérelem feldolgozása során. Kérjük, próbálja újra később. ' +
        (error instanceof Error ? error.message : '')
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (analysisResult) {
    return (
      <ResultPage
        content={analysisResult}
        onBack={() => setAnalysisResult(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8 flex items-center justify-center space-x-3">
          <ClipboardList className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">
            Oltási Mentesség Kérelem
          </h1>
        </div>

        <div className="mb-8">
          <StepIndicator
            steps={STEPS.map((step) => ({
              ...step,
              isCompleted: completedSteps.includes(step.id),
            }))}
            currentStep={currentStep}
            onStepClick={setCurrentStep}
          />
        </div>

        <div className="rounded-lg bg-white shadow">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-medium text-gray-900">
              {STEPS[currentStep - 1].title}
            </h2>
          </div>

          <div className="px-6 py-6">
            {currentStep === 1 && (
              <BasicInformation
                data={formData}
                onChange={handleInputChange}
                errors={errors}
              />
            )}
            {currentStep === 2 && (
              <CurrentVaccination
                data={formData}
                onChange={handleInputChange}
                errors={errors}
              />
            )}
            {currentStep === 3 && (
              <PreviousReactions
                data={formData}
                onChange={handleInputChange}
                errors={errors}
              />
            )}
            {currentStep === 4 && (
              <CurrentHealth
                data={formData}
                onChange={handleInputChange}
                errors={errors}
              />
            )}
            {currentStep === 5 && (
              <FamilyHistory
                data={formData}
                onChange={handleInputChange}
                errors={errors}
              />
            )}
            {currentStep === 6 && (
              <SpecificConcerns
                data={formData}
                onChange={handleInputChange}
                errors={errors}
              />
            )}
            {currentStep === 7 && (
              <Attachments
                data={formData}
                onChange={handleInputChange}
                errors={errors}
                isSubmitting={isSubmitting}
              />
            )}
            
            {submitError && (
              <div className="mt-4 rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-700">{submitError}</p>
              </div>
            )}
          </div>

          <NavigationFooter
            currentStep={currentStep}
            totalSteps={STEPS.length}
            onPrevious={handlePrevious}
            onNext={currentStep === STEPS.length ? handleSubmit : handleNext}
            onSave={() => {}}
            isValid={Object.keys(errors).length === 0}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}

export default App;