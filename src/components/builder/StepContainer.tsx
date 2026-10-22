import { motion } from 'framer-motion';
import { Check, Package } from 'lucide-react';
import { packagingProducts } from '@/data/products';
import { useHamperStore } from '@/store/hamperStore';

export default function StepContainer() {
  const selectedContainer = useHamperStore((s) => s.selectedContainer);
  const setContainer = useHamperStore((s) => s.setContainer);

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="font-serif text-3xl sm:text-4xl text-espresso">Choose Your Packaging</h2>
        <p className="mt-2 text-sm text-espresso/60 max-w-md mx-auto">
          Every hamper starts with a vessel. Pick the one that feels right — each sets the tone for
          what goes inside.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {packagingProducts.map((pkg, idx) => {
          const isSelected = selectedContainer?.id === pkg.id;
          return (
            <motion.button
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -4 }}
              onClick={() => setContainer(pkg)}
              className={`relative flex flex-col overflow-hidden rounded-2xl border-2 text-left transition-all ${
                isSelected
                  ? 'border-clay shadow-lg shadow-clay/15'
                  : 'border-linen hover:border-clay/40'
              }`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-clay text-pearl">
                  <Check size={16} />
                </div>
              )}
              <div className="relative aspect-[4/3] overflow-hidden bg-oat">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-2 left-2">
                  <span className="rounded-full bg-sage/90 px-2.5 py-1 text-[10px] font-medium text-white">
                    <Package size={11} className="inline mr-1" />
                    Holds {pkg.capacity} items
                  </span>
                </div>
              </div>
              <div className="p-4 bg-white">
                <h3 className="font-serif text-lg font-medium text-espresso">{pkg.name}</h3>
                <p className="mt-1 text-xs text-espresso/60 leading-relaxed">{pkg.description}</p>
                <p className="mt-2 text-lg font-semibold text-clay">₹{pkg.price}</p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
