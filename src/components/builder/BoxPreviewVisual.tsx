import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useHamperStore } from '@/store/hamperStore';

export default function BoxPreviewVisual() {
  const selectedContainer = useHamperStore((s) => s.selectedContainer);
  const items = useHamperStore((s) => s.items);
  const card = useHamperStore((s) => s.card);

  if (!selectedContainer) {
    return (
      <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border-2 border-dashed border-linen bg-oat">
        <p className="text-sm text-espresso/40">Select a packaging to preview your box</p>
      </div>
    );
  }

  const capacity = selectedContainer.capacity ?? 6;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-linen bg-gradient-to-b from-oat to-pearl p-6">
      {/* Ribbon accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-8 bg-gradient-to-b from-clay to-clay-dark rounded-b-lg" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-clay/20" />

      {/* Box header */}
      <div className="text-center mb-4 mt-4">
        <p className="font-serif text-lg text-espresso">{selectedContainer.name}</p>
        <p className="text-xs text-espresso/50">
          {items.reduce((s, i) => s + i.quantity, 0)} / {capacity} items packed
        </p>
      </div>

      {/* Box interior */}
      <div
        className="relative rounded-xl border-2 border-linen bg-white p-4 min-h-[200px]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(232,226,217,0.3) 8px, rgba(232,226,217,0.3) 9px)',
        }}
      >
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.div
                key={item.product.id}
                layout
                initial={{ opacity: 0, scale: 0.5, y: -30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="relative group"
              >
                <div className="aspect-square rounded-lg overflow-hidden border border-linen bg-oat">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                {item.quantity > 1 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-clay px-1 text-[10px] font-bold text-pearl">
                    {item.quantity}
                  </span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Empty slots */}
          {Array.from({
            length: Math.max(0, capacity - items.reduce((s, i) => s + i.quantity, 0)),
          })
            .slice(0, 6)
            .map((_, idx) => (
              <div
                key={`empty-${idx}`}
                className="aspect-square rounded-lg border-2 border-dashed border-linen/60 flex items-center justify-center"
              >
                <span className="text-xl text-linen">+</span>
              </div>
            ))}
        </div>

        {/* Card preview */}
        {card.product && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center gap-3 rounded-lg border border-gold/30 bg-gold/5 p-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded bg-gold/15 text-gold text-lg">
              ✉
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-espresso">{card.product.name}</p>
              {card.message && (
                <p className="text-[10px] text-espresso/60 truncate">
                  "{card.message.slice(0, 40)}{card.message.length > 40 ? '...' : ''}"
                </p>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
