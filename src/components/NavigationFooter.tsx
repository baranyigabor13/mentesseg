import React from 'react';
import { Save } from 'lucide-react';

interface NavigationFooterProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSave: () => void;
  isValid: boolean;
  isSubmitting: boolean;
}

export const NavigationFooter: React.FC<NavigationFooterProps> = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSave,
  isValid,
  isSubmitting,
}) => {
  return (
    <div className="form-card-footer">
      <button
        onClick={onPrevious}
        disabled={currentStep === 1 || isSubmitting}
        className={`btn btn-secondary ${
          currentStep === 1 || isSubmitting ? 'btn-disabled' : ''
        }`}
        aria-label="Előző lépés"
      >
        Előző
      </button>
      <div className="flex space-x-3">
        <button
          onClick={onSave}
          disabled={isSubmitting}
          className={`btn btn-secondary ${isSubmitting ? 'btn-disabled' : ''}`}
          aria-label="Haladás mentése"
        >
          <Save className="mr-2 h-4 w-4" />
          <span>Mentés</span>
        </button>
        <button
          onClick={onNext}
          disabled={!isValid || isSubmitting}
          className={`btn ${isValid && !isSubmitting ? 'btn-primary' : 'btn-disabled'}`}
          aria-label={currentStep === totalSteps ? 'Űrlap beküldése' : 'Következő lépés'}
        >
          {isSubmitting ? (
            <div className="flex items-center space-x-2">
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Feldolgozás...</span>
            </div>
          ) : currentStep === totalSteps ? (
            'Beküldés'
          ) : (
            'Következő'
          )}
        </button>
      </div>
    </div>
  );
};