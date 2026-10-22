import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useHamperStore } from '@/store/hamperStore';
import StepContainer from '@/components/builder/StepContainer';
import StepItems from '@/components/builder/StepItems';
import StepMessage from '@/components/builder/StepMessage';
import StepReview from '@/components/builder/StepReview';

const steps = [
  { num: 1, label: 'Packaging' },
  { num: 2, label: 'Pick Items' },
  { num: 3, label: 'Personal Message' },
  { num: 4, label: 'Review & Order' },
];

export default function BuilderPage() {
  const navigate = useNavigate();
  const step = useHamperStore((s) => s.step);
  const setStep = useHamperStore((s) => s.setStep);
  const selectedContainer = useHamperStore((s) => s.selectedContainer);
  const getItemCount = useHamperStore((s) => s.getItemCount);
  const getTotal = useHamperStore((s) => s.getTotal);
  const isStepValid = useHamperStore((s) => s.isStepValid);

  const count = getItemCount();
  const total = getTotal();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const canProceed = isStepValid(step);
  const stepLabels: Record<number, string> = {
    1: selectedContainer ? 'Selected!' : 'Select a packaging',
    2: count > 0 ? `${count} item${count !== 1 ? 's' : ''} added` : 'Add at least 1 item',
    3: 'Ready to review',
    4: 'Complete your order',
  };

  return (
    <div className="min-h-screen pb-32 lg:pb-0">
      {/* Sticky progress bar */}
      <div className="sticky top-16 z-30 glass border-b border-linen">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 py-3">
          {/* Progress tracker */}
          <div className="flex items-center justify-between gap-2 overflow-x-auto scrollbar-hide">
            {steps.map((s, idx) => (
              <div key={s.num} className="flex items-center flex-shrink-0">
                <button
                  onClick={() => {
                    if (s.num === 1) setStep(1);
                    else if (s.num === 2 && isStepValid(1)) setStep(2);
                    else if (s.num === 3 && isStepValid(2)) setStep(3);
                    else if (s.num === 4) setStep(4);
                  }}
                  className={`flex items-center gap-2 transition-colors ${
                    step === s.num
                      ? 'text-clay'
                      : step > s.num
                        ? 'text-sage-dark'
                        : 'text-espresso/30'
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-all ${
                      step === s.num
                        ? 'bg-clay text-pearl'
                        : step > s.num
                          ? 'bg-sage text-white'
                          : 'bg-oat text-espresso/40'
                    }`}
                  >
                    {step > s.num ? <Check size={14} /> : s.num}
                  </span>
                  <span className="hidden sm:inline text-xs font-medium whitespace-nowrap">
                    {s.label}
                  </span>
                </button>
                {idx < steps.length - 1 && (
                  <div
                    className={`mx-1 sm:mx-2 h-px w-4 sm:w-8 transition-colors ${
                      step > s.num ? 'bg-sage' : 'bg-linen'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Live counters */}
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-espresso/60">{stepLabels[step]}</span>
            <div className="flex items-center gap-4">
              {selectedContainer && (
                <span className="text-espresso/60">
                  {count} / {selectedContainer.capacity} items
                </span>
              )}
              <span className="font-semibold text-clay">₹{total}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Step content */}
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            {step === 1 && <StepContainer />}
            {step === 2 && <StepItems />}
            {step === 3 && <StepMessage />}
            {step === 4 && <StepReview />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      {step < 4 && (
        <div className="sticky bottom-0 lg:bottom-6 z-30 mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 pb-4 lg:pb-0">
          <div className="flex items-center justify-between gap-3 rounded-2xl bg-white border border-linen p-3 shadow-lg">
            <button
              onClick={() => {
                if (step === 1) navigate('/');
                else setStep(step - 1);
              }}
              className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-espresso/70 hover:bg-oat"
            >
              <ChevronLeft size={16} />
              {step === 1 ? 'Home' : 'Back'}
            </button>
            <button
              disabled={!canProceed}
              onClick={() => setStep(step + 1)}
              className={`flex items-center gap-1.5 rounded-full px-6 py-2.5 text-sm font-medium transition-all ${
                canProceed
                  ? 'bg-espresso text-pearl hover:bg-clay hover:shadow-lg hover:shadow-clay/20'
                  : 'bg-oat text-espresso/30 cursor-not-allowed'
              }`}
            >
              {step === 1 ? 'Continue to Items' : step === 2 ? 'Continue to Message' : 'Review Order'}
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
