import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, MessageCircle, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '@/data/products';
import { useHamperStore } from '@/store/hamperStore';
import { BUSINESS_WHATSAPP_NUMBER } from '@/config';
import { generateCuratedOrderUrl, copyToClipboard } from '@/utils/whatsapp';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  curatedItems?: string[];
  curatedPrice?: number;
  curatedName?: string;
}

export default function QuickViewModal({
  product,
  onClose,
  curatedItems,
  curatedPrice,
  curatedName,
}: QuickViewModalProps) {
  const addItem = useHamperStore((s) => s.addItem);
  const items = useHamperStore((s) => s.items);
  const [copied, setCopied] = useState(false);

  const inHamper = product ? items.find((i) => i.product.id === product.id) : null;
  const isCurated = !!curatedItems;

  const handleWhatsApp = () => {
    if (isCurated && curatedName && curatedItems && curatedPrice) {
      const url = generateCuratedOrderUrl(curatedName, curatedPrice, curatedItems, BUSINESS_WHATSAPP_NUMBER);
      window.open(url, '_blank');
    }
  };

  const handleCopy = async () => {
    if (isCurated && curatedName && curatedItems && curatedPrice) {
      const url = generateCuratedOrderUrl(curatedName, curatedPrice, curatedItems, BUSINESS_WHATSAPP_NUMBER);
      const success = await copyToClipboard(url);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-espresso/50 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="pointer-events-auto relative w-full max-w-2xl overflow-hidden rounded-3xl bg-pearl shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-pearl/80 text-espresso hover:bg-oat"
              >
                <X size={18} />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2">
                <div className="aspect-square sm:aspect-auto bg-oat">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-col p-6">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {product.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-sage/15 px-2 py-0.5 text-[10px] font-medium text-sage-dark"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="font-serif text-2xl font-medium text-espresso">{product.name}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-espresso/70">
                    {product.description}
                  </p>
                  {product.capacity && (
                    <p className="mt-3 text-sm text-sage-dark">
                      Holds up to {product.capacity} items
                    </p>
                  )}

                  <div className="mt-4">
                    <span className="font-serif text-3xl font-semibold text-clay">
                      ₹{curatedPrice ?? product.price}
                    </span>
                  </div>

                  <div className="mt-auto pt-6 space-y-2">
                    {isCurated ? (
                      <>
                        <button
                          onClick={handleWhatsApp}
                          className="flex w-full items-center justify-center gap-2 rounded-full bg-sage py-3 text-sm font-medium text-white transition-colors hover:bg-sage-dark"
                        >
                          <MessageCircle size={18} />
                          Order on WhatsApp
                        </button>
                        <button
                          onClick={handleCopy}
                          className="flex w-full items-center justify-center gap-2 rounded-full border border-linen bg-pearl py-3 text-sm font-medium text-espresso hover:bg-oat"
                        >
                          {copied ? <Check size={16} /> : <Copy size={16} />}
                          {copied ? 'Copied!' : 'Copy order link'}
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addItem(product);
                          onClose();
                        }}
                        className="flex w-full items-center justify-center gap-2 rounded-full bg-espresso py-3 text-sm font-medium text-pearl transition-colors hover:bg-clay"
                      >
                        <Plus size={18} />
                        {inHamper ? 'Add another to box' : 'Add to hamper box'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
