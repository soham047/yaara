import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Building2, Gift, Users, Briefcase, Copy, Check } from 'lucide-react';
import { BUSINESS_WHATSAPP_NUMBER } from '@/config';
import { generateCorporateInquiryUrl, copyToClipboard } from '@/utils/whatsapp';

export default function CorporatePage() {
  const [quantity, setQuantity] = useState(50);
  const [budget, setBudget] = useState(500);
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);

  const totalEstimate = quantity * budget;

  const handleInquiry = () => {
    const url = generateCorporateInquiryUrl(quantity, budget, notes, BUSINESS_WHATSAPP_NUMBER);
    window.open(url, '_blank');
  };

  const handleCopy = async () => {
    const url = generateCorporateInquiryUrl(quantity, budget, notes, BUSINESS_WHATSAPP_NUMBER);
    const success = await copyToClipboard(url);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const features = [
    {
      icon: Briefcase,
      title: 'Custom Branding',
      desc: 'Your logo and brand colors on packaging, cards, and ribbons.',
    },
    {
      icon: Users,
      title: 'Bulk Employee Kits',
      desc: 'Onboarding welcome kits for new joiners, festival gifts for teams.',
    },
    {
      icon: Gift,
      title: 'Client Appreciation',
      desc: 'Thoughtful hampers that say thank you to your valued clients.',
    },
    {
      icon: Building2,
      title: 'Pan-India Delivery',
      desc: 'Ship to multiple addresses across the country in one order.',
    },
  ];

  return (
    <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 py-8 pb-32 lg:pb-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-2 rounded-full border border-linen bg-white px-4 py-1.5 text-xs font-medium text-sage-dark">
          <Building2 size={14} />
          Corporate & Bulk Gifting
        </span>
        <h1 className="mt-5 font-serif text-4xl sm:text-5xl lg:text-6xl text-espresso text-balance">
          Gifting that speaks for your <em className="text-clay">brand.</em>
        </h1>
        <p className="mt-4 text-base text-espresso/70 max-w-xl mx-auto leading-relaxed">
          Custom-branded hampers for employee onboarding, client appreciation, and festival
          celebrations. Thoughtful gifts at scale.
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
        {features.map((f, idx) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08 }}
            className="rounded-2xl border border-linen bg-white p-5"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-clay/10 text-clay mb-3">
              <f.icon size={20} strokeWidth={1.5} />
            </div>
            <h3 className="font-serif text-lg text-espresso">{f.title}</h3>
            <p className="mt-1 text-xs text-espresso/60 leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Bulk calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="rounded-3xl border border-linen bg-gradient-to-b from-oat to-pearl p-8">
          <h2 className="font-serif text-2xl text-espresso mb-1">Bulk Inquiry Calculator</h2>
          <p className="text-sm text-espresso/60 mb-6">
            Estimate your order and send us the details on WhatsApp.
          </p>

          {/* Quantity slider */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-espresso">Quantity</label>
              <span className="font-serif text-2xl font-semibold text-clay">
                {quantity} <span className="text-sm font-sans font-normal text-espresso/60">hampers</span>
              </span>
            </div>
            <input
              type="range"
              min={20}
              max={500}
              step={5}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full accent-clay"
            />
            <div className="flex justify-between text-xs text-espresso/40 mt-1">
              <span>20</span>
              <span>500</span>
            </div>
          </div>

          {/* Budget slider */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-espresso">Budget per Hamper</label>
              <span className="font-serif text-2xl font-semibold text-clay">
                ₹{budget}
              </span>
            </div>
            <input
              type="range"
              min={200}
              max={2000}
              step={50}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full accent-clay"
            />
            <div className="flex justify-between text-xs text-espresso/40 mt-1">
              <span>₹200</span>
              <span>₹2,000</span>
            </div>
          </div>

          {/* Notes */}
          <div className="mb-6">
            <label className="text-sm font-medium text-espresso mb-1.5 block">
              Additional Notes <span className="text-espresso/40 font-normal">(optional)</span>
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Tell us about your event, branding needs, delivery timeline..."
              className="w-full rounded-xl border border-linen bg-white px-4 py-2.5 text-sm text-espresso placeholder:text-espresso/40 focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay/30 resize-none"
            />
          </div>

          {/* Total estimate */}
          <div className="rounded-xl bg-white border border-linen p-4 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-espresso/70">Estimated Total</span>
              <span className="font-serif text-3xl font-semibold text-clay">
                ₹{totalEstimate.toLocaleString('en-IN')}
              </span>
            </div>
            <p className="text-xs text-espresso/40 mt-1">
              Final pricing confirmed on WhatsApp based on customization.
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={handleInquiry}
            className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-sage py-3.5 text-sm font-medium text-white shadow-lg shadow-sage/20 transition-colors hover:bg-sage-dark"
          >
            <MessageCircle size={20} />
            Request Corporate Proposal on WhatsApp
          </button>
          <button
            onClick={handleCopy}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-linen bg-pearl py-2.5 text-xs font-medium text-espresso hover:bg-oat"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copied!' : 'Copy inquiry link'}
          </button>
        </div>

        {/* Right side: testimonial-style content */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-linen bg-white p-6">
            <h3 className="font-serif text-xl text-espresso mb-3">Why teams choose YAARA</h3>
            <ul className="space-y-3">
              {[
                'Dedicated account manager for bulk orders',
                'Custom branding on boxes, ribbons, and cards',
                'Multi-address shipping across India',
                'Flexible budgets — from ₹200 to ₹2,000+ per hamper',
                'Handwritten personalized notes for each recipient',
                '3–7 day pan-India delivery',
              ].map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm text-espresso/70">
                  <Check size={16} className="text-sage-dark mt-0.5 flex-shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-espresso p-6 text-pearl">
            <p className="font-serif text-lg italic leading-relaxed">
              "We ordered 120 onboarding kits for our new joiners. Every single one had a
              handwritten welcome note. The feedback was overwhelming."
            </p>
            <p className="mt-3 text-xs text-pearl/60">
              — People Team, Bangalore Tech Startup
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
