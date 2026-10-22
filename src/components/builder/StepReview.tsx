import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  MessageCircle,
  Copy,
  Check,
  X,
  AlertCircle,
} from 'lucide-react';
import { useHamperStore } from '@/store/hamperStore';
import { BUSINESS_WHATSAPP_NUMBER, BUSINESS_PHONE_DISPLAY } from '@/config';
import {
  generateWhatsAppOrderUrl,
  generateOrderId,
  copyToClipboard,
  type HamperOrderData,
} from '@/utils/whatsapp';
import BoxPreviewVisual from './BoxPreviewVisual';

export default function StepReview() {
  const selectedContainer = useHamperStore((s) => s.selectedContainer);
  const items = useHamperStore((s) => s.items);
  const card = useHamperStore((s) => s.card);
  const customer = useHamperStore((s) => s.customer);
  const setCustomer = useHamperStore((s) => s.setCustomer);
  const getTotal = useHamperStore((s) => s.getTotal);
  const getItemsTotal = useHamperStore((s) => s.getItemsTotal);
  const getCardTotal = useHamperStore((s) => s.getCardTotal);
  const isStepValid = useHamperStore((s) => s.isStepValid);

  const [showFallback, setShowFallback] = useState(false);
  const [copied, setCopied] = useState(false);
  const [lastOrderUrl, setLastOrderUrl] = useState('');
  const [validationError, setValidationError] = useState('');

  const total = getTotal();
  const itemsTotal = getItemsTotal();
  const cardTotal = getCardTotal();
  const containerPrice = selectedContainer?.price ?? 0;

  const inputClass =
    'w-full rounded-xl border border-linen bg-white px-4 py-2.5 text-sm text-espresso placeholder:text-espresso/40 focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay/30 transition-colors';

  const triggerConfetti = () => {
    const colors = ['#C86D51', '#D4AF37', '#7E8D78', '#FDFBF7'];
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 }, colors });
    setTimeout(() => confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0 }, colors }), 200);
    setTimeout(() => confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1 }, colors }), 400);
  };

  const buildOrderData = (): HamperOrderData => ({
    orderId: generateOrderId(),
    container: {
      name: selectedContainer!.name,
      price: selectedContainer!.price,
    },
    items: items.map((i) => ({
      name: i.product.name,
      quantity: i.quantity,
      price: i.product.price,
    })),
    card: {
      name: card.product?.name ?? 'No card selected',
      message: card.message || '—',
      from: card.senderName || '—',
      to: card.recipientName || '—',
      digitalLink: card.digitalLink || undefined,
    },
    customer: {
      senderName: customer.senderName,
      senderPhone: customer.senderPhone,
      recipientName: customer.recipientName,
      deliveryAddress: customer.deliveryAddress,
      city: customer.city,
      pincode: customer.pincode,
      deliveryDatePreference: customer.deliveryDatePreference || undefined,
      specialInstructions: customer.specialInstructions || undefined,
    },
    totalPrice: total,
  });

  const handleWhatsAppOrder = () => {
    setValidationError('');
    if (!isStepValid(4)) {
      setValidationError(
        'Please fill in your name, phone number (at least 10 digits), recipient name, delivery address, city, and PIN code (6 digits).',
      );
      return;
    }

    const order = buildOrderData();
    const url = generateWhatsAppOrderUrl(order, BUSINESS_WHATSAPP_NUMBER);
    setLastOrderUrl(url);

    triggerConfetti();

    const newTab = window.open(url, '_blank');
    if (!newTab) {
      setShowFallback(true);
    } else {
      setTimeout(() => {
        if (newTab.closed || newTab.location.href === 'about:blank') {
          setShowFallback(true);
        }
      }, 2000);
    }
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(lastOrderUrl);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="font-serif text-3xl sm:text-4xl text-espresso">Review & Order</h2>
        <p className="mt-2 text-sm text-espresso/60 max-w-md mx-auto">
          Almost there. Review your hamper, fill in delivery details, and send the order straight to
          our WhatsApp.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Box preview + cost breakdown */}
        <div className="space-y-6">
          <BoxPreviewVisual />

          {/* Cost breakdown */}
          <div className="rounded-2xl border border-linen bg-white p-5">
            <h3 className="font-serif text-lg text-espresso mb-3">Cost Breakdown</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-espresso/70">
                <span>Base container: {selectedContainer?.name}</span>
                <span>₹{containerPrice}</span>
              </div>
              <div className="flex justify-between text-espresso/70">
                <span>
                  Curated items ({items.reduce((s, i) => s + i.quantity, 0)} items)
                </span>
                <span>₹{itemsTotal}</span>
              </div>
              {cardTotal > 0 && (
                <div className="flex justify-between text-espresso/70">
                  <span>Personal card: {card.product?.name}</span>
                  <span>₹{cardTotal}</span>
                </div>
              )}
              <div className="flex justify-between text-espresso/50">
                <span>Estimated shipping</span>
                <span className="italic">Calculated on WhatsApp</span>
              </div>
              <div className="pt-2 border-t border-linen flex justify-between items-baseline">
                <span className="font-semibold text-espresso">Total Hamper Value</span>
                <span className="font-serif text-2xl font-semibold text-clay">₹{total}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Customer form */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-linen bg-white p-5 space-y-4">
            <h3 className="font-serif text-lg text-espresso">Delivery Details</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-espresso/70 mb-1 block">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={customer.senderName}
                  onChange={(e) => setCustomer({ senderName: e.target.value })}
                  placeholder="Your name"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-espresso/70 mb-1 block">
                  Your Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  value={customer.senderPhone}
                  onChange={(e) => setCustomer({ senderPhone: e.target.value })}
                  placeholder="10-digit mobile number"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-espresso/70 mb-1 block">
                Recipient's Full Name *
              </label>
              <input
                type="text"
                value={customer.recipientName}
                onChange={(e) => setCustomer({ recipientName: e.target.value })}
                placeholder="Who receives this gift?"
                className={inputClass}
              />
            </div>

            <div>
              <label className="text-xs font-medium text-espresso/70 mb-1 block">
                Complete Delivery Address *
              </label>
              <textarea
                value={customer.deliveryAddress}
                onChange={(e) => setCustomer({ deliveryAddress: e.target.value })}
                rows={2}
                placeholder="House no, street, area, landmark..."
                className={`${inputClass} resize-none`}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-medium text-espresso/70 mb-1 block">City *</label>
                <input
                  type="text"
                  value={customer.city}
                  onChange={(e) => setCustomer({ city: e.target.value })}
                  placeholder="City"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-espresso/70 mb-1 block">State</label>
                <input
                  type="text"
                  value={customer.state}
                  onChange={(e) => setCustomer({ state: e.target.value })}
                  placeholder="State"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-espresso/70 mb-1 block">PIN *</label>
                <input
                  type="text"
                  maxLength={6}
                  value={customer.pincode}
                  onChange={(e) => setCustomer({ pincode: e.target.value.replace(/\D/g, '') })}
                  placeholder="6-digit PIN"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-espresso/70 mb-1 block">
                Preferred Delivery Date <span className="text-espresso/40">(optional)</span>
              </label>
              <input
                type="date"
                value={customer.deliveryDatePreference}
                onChange={(e) => setCustomer({ deliveryDatePreference: e.target.value })}
                className={inputClass}
              />
            </div>

            <div>
              <label className="text-xs font-medium text-espresso/70 mb-1 block">
                Special Instructions <span className="text-espresso/40">(optional)</span>
              </label>
              <textarea
                value={customer.specialInstructions}
                onChange={(e) => setCustomer({ specialInstructions: e.target.value })}
                rows={2}
                placeholder="Any notes for us? Gift wrapping preferences, surprise instructions..."
                className={`${inputClass} resize-none`}
              />
            </div>
          </div>

          {/* Validation error */}
          <AnimatePresence>
            {validationError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-start gap-2 rounded-xl border border-clay/30 bg-clay/5 p-3 text-sm text-clay"
              >
                <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                <span>{validationError}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handleWhatsAppOrder}
            className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-sage py-4 text-base font-medium text-white shadow-lg shadow-sage/20 transition-colors hover:bg-sage-dark"
          >
            <MessageCircle size={22} />
            Complete Order via WhatsApp
          </motion.button>

          <p className="text-center text-xs text-espresso/50">
            You'll be redirected to WhatsApp with a pre-filled order message. No payment is required
            here — we'll share UPI/payment details on WhatsApp.
          </p>
        </div>
      </div>

      {/* Fallback modal */}
      <AnimatePresence>
        {showFallback && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFallback(false)}
              className="fixed inset-0 z-[70] bg-espresso/50 backdrop-blur-sm"
            />
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="pointer-events-auto relative w-full max-w-md rounded-3xl bg-pearl p-6 shadow-2xl text-center"
              >
                <button
                  onClick={() => setShowFallback(false)}
                  className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-oat text-espresso"
                >
                  <X size={16} />
                </button>
                <h3 className="font-serif text-xl text-espresso mb-2">
                  WhatsApp didn't open?
                </h3>
                <p className="text-sm text-espresso/60 mb-4">
                  Copy your order summary and message us directly at{' '}
                  <span className="font-medium text-clay">{BUSINESS_PHONE_DISPLAY}</span>
                </p>
                <button
                  onClick={handleCopy}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-espresso py-3 text-sm font-medium text-pearl hover:bg-clay"
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                  {copied ? 'Copied to clipboard!' : 'Copy Order Summary to Clipboard'}
                </button>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
