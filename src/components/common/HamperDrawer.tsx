import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Plus, Minus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useHamperStore } from '@/store/hamperStore';

export default function HamperDrawer() {
  const items = useHamperStore((s) => s.items);
  const selectedContainer = useHamperStore((s) => s.selectedContainer);
  const getItemCount = useHamperStore((s) => s.getItemCount);
  const getTotal = useHamperStore((s) => s.getTotal);
  const updateQuantity = useHamperStore((s) => s.updateQuantity);
  const removeItem = useHamperStore((s) => s.removeItem);
  const [isOpen, setIsOpen] = useState(false);

  const count = getItemCount();
  const total = getTotal();

  return (
    <>
      {/* Mobile sticky bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 glass border-t border-linen">
        <button
          onClick={() => setIsOpen(true)}
          className="flex w-full items-center justify-between px-4 py-3"
        >
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-clay" />
            <span className="text-sm font-medium text-espresso">
              {count} item{count !== 1 ? 's' : ''} packed
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-serif text-lg font-semibold text-clay">₹{total}</span>
            <span className="rounded-full bg-espresso px-3 py-1 text-xs text-pearl">View Box</span>
          </div>
        </button>
      </div>

      {/* Desktop floating summary */}
      <div className="hidden lg:block fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-3 rounded-2xl bg-espresso px-5 py-3 text-pearl shadow-xl shadow-espresso/20"
        >
          <ShoppingBag size={18} />
          <div className="flex flex-col items-start leading-none">
            <span className="text-xs opacity-70">{count} items · ₹{total}</span>
            <span className="text-sm font-medium">View Hamper</span>
          </div>
          {count > 0 && (
            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-gold px-1.5 text-xs font-bold text-espresso">
              {count}
            </span>
          )}
        </motion.button>
      </div>

      {/* Slide-up drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-espresso/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 max-h-[80vh] overflow-hidden rounded-t-3xl bg-pearl shadow-2xl"
            >
              {/* Handle */}
              <div className="flex items-center justify-center pt-3 pb-2">
                <div className="h-1.5 w-10 rounded-full bg-linen" />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-5 pb-3 border-b border-linen">
                <div>
                  <h3 className="font-serif text-xl font-semibold text-espresso">Your Hamper</h3>
                  {selectedContainer && (
                    <p className="text-xs text-espresso/60">
                      {selectedContainer.name} · {count} / {selectedContainer.capacity} items
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-oat text-espresso hover:bg-linen"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Items */}
              <div className="max-h-[50vh] overflow-y-auto px-5 py-4">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <ShoppingBag size={40} className="text-linen mb-3" />
                    <p className="text-sm text-espresso/60">Your hamper is empty.</p>
                    <Link
                      to="/builder"
                      onClick={() => setIsOpen(false)}
                      className="mt-3 rounded-full bg-clay px-4 py-2 text-sm text-pearl"
                    >
                      Start Building
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-center gap-3 rounded-xl border border-linen bg-white p-2"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-14 w-14 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-espresso truncate">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-clay">₹{item.product.price} each</p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-oat text-espresso hover:bg-linen"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-oat text-espresso hover:bg-linen"
                          >
                            <Plus size={14} />
                          </button>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="flex h-7 w-7 items-center justify-center rounded-full text-espresso/40 hover:text-clay hover:bg-clay/10 ml-1"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t border-linen px-5 py-4 bg-oat">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-espresso/70">Total (excl. shipping)</span>
                    <span className="font-serif text-2xl font-semibold text-clay">₹{total}</span>
                  </div>
                  <Link
                    to="/builder"
                    onClick={() => setIsOpen(false)}
                    className="block w-full rounded-full bg-espresso py-3 text-center text-sm font-medium text-pearl transition-colors hover:bg-clay"
                  >
                    Continue to Checkout
                  </Link>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
