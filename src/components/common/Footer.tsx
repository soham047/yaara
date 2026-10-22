import { Link } from 'react-router-dom';
import { Gift, Instagram, Mail, MessageCircle, Heart } from 'lucide-react';
import { BUSINESS_PHONE_DISPLAY } from '@/config';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-linen bg-oat">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-clay text-pearl">
                <Gift size={18} strokeWidth={1.5} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-serif text-xl font-semibold text-espresso">YAARA</span>
                <span className="text-[9px] tracking-[0.2em] uppercase text-clay">Gifting House</span>
              </div>
            </div>
            <p className="text-sm text-espresso/70 max-w-md leading-relaxed">
              Curating intentional, aesthetic gift hampers packed with keepsakes, warmth, and
              handwritten words. Every box is hand-packed with care.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-pearl border border-linen text-espresso transition-colors hover:bg-clay hover:text-pearl hover:border-clay"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-pearl border border-linen text-espresso transition-colors hover:bg-clay hover:text-pearl hover:border-clay"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-pearl border border-linen text-espresso transition-colors hover:bg-clay hover:text-pearl hover:border-clay"
                aria-label="WhatsApp"
              >
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-espresso mb-3">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/builder" className="text-espresso/70 hover:text-clay">Build a Hamper</Link></li>
              <li><Link to="/shop" className="text-espresso/70 hover:text-clay">Ready-to-Gift</Link></li>
              <li><Link to="/corporate" className="text-espresso/70 hover:text-clay">Corporate Gifting</Link></li>
              <li><Link to="/about" className="text-espresso/70 hover:text-clay">Our Story</Link></li>
              <li><Link to="/faq" className="text-espresso/70 hover:text-clay">FAQ & Delivery</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-espresso mb-3">Get in Touch</h4>
            <ul className="space-y-2 text-sm text-espresso/70">
              <li>WhatsApp: {BUSINESS_PHONE_DISPLAY}</li>
              <li>Pan-India delivery</li>
              <li>3–6 business days</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-linen flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-espresso/50">
            © {new Date().getFullYear()} YAARA Gifting House. All rights reserved.
          </p>
          <p className="text-xs text-espresso/50 flex items-center gap-1">
            Made with <Heart size={12} className="text-clay fill-clay" /> for thoughtful gifting
          </p>
        </div>
      </div>
    </footer>
  );
}
