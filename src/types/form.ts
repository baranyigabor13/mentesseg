export interface FormStep {
  id: number;
  title: string;
  isCompleted?: boolean;
}

export interface FormData {
  // Step 1: Basic Information
  childName: string;
  dateOfBirth: string;
  parentName: string;
  address: string;
  phone: string;
  email: string;

  // Step 2: Current Vaccination
  currentVaccines: string[];
  lastVaccinationDate: string;
  otherVaccineDetails?: string;

  // Step 3: Previous Reactions
  hadPreviousReactions: boolean;
  reactionDetails: string;
  reactionDate: string;
  medicalAttention: boolean;
  reactionTypes?: string[];
  reactionVaccines?: string;
  hasDocumentation?: boolean;

  // Step 4: Current Health
  currentHealth: string;
  medications: string;
  allergies: string;
  chronicConditions: string;
  diagnosedConditions?: string[];
  knownAllergies?: string[];
  otherAllergies?: string;
  otherConditions?: string;

  // Step 5: Family History
  familyHistory: string[];
  additionalFamilyDetails: string;
  extendedFamilyHistory?: boolean;

  // Step 6: Concerns
  ingredientConcerns: string[];
  otherIngredientConcern: string;
  exemptionReasons: string[];
  otherExemptionReason: string;
  religiousBeliefs: string;

  // Step 7: Attachments
  hasSupportingDocuments: boolean;
  documentDescriptions: string;
}

export type FormErrors = Partial<Record<keyof FormData, string>>;