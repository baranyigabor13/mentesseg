import React from 'react';
import { FormStep } from '../types/form';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  steps: FormStep[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
  onStepClick,
}) => {
  return (
    <div className="w-full py-6">
      <div className="step-indicator">
        {steps.map((step, index) => {
          const isActive = currentStep === step.id;
          const isCompleted = step.isCompleted;
          const canClick = isCompleted || step.id <= currentStep;

          return (
            <React.Fragment key={step.id}>
              {index > 0 && (
                <div
                  className={`step-line ${
                    step.id <= currentStep ? 'bg-blue-500' : 'bg-gray-200'
                  }`}
                />
              )}
              <div className="relative">
                <button
                  onClick={() => canClick && onStepClick(step.id)}
                  disabled={!canClick}
                  className={`step-button ${
                    isActive
                      ? 'border-blue-500 bg-blue-500 text-white ring-2 ring-blue-200'
                      : isCompleted
                      ? 'border-green-500 bg-green-500 text-white'
                      : 'border-gray-200 bg-white text-gray-500'
                  } ${canClick ? 'cursor-pointer hover:shadow-md' : 'cursor-not-allowed'}`}
                  aria-label={`${step.id}. lépés: ${step.title}`}
                  aria-current={isActive ? 'step' : undefined}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </button>
                <div
                  className={`absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium ${
                    isActive ? 'text-blue-600' : 'text-gray-500'
                  }`}
                >
                  {step.title}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};