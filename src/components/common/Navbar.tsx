import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Gift, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { useHamperStore } from '@/store/hamperStore';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Build a Hamper', path: '/builder' },
  { label: 'Shop', path: '/shop' },
  { label: 'Corporate', path: '/corporate' },
  { label: 'About', path: '/about' },
  { label: 'FAQ', path: '/faq' },
];

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const itemCount = useHamperStore((s) => s.getItemCount());
  const selectedContainer = useHamperStore((s) => s.selectedContainer);

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <>
      <header className="sticky top-0 z-50 glass border-b border-linen">
        <nav className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group" onClick={() => setIsOpen(false)}>
              <motion.div
                whileHover={{ rotate: -8 }}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-clay text-pearl"
              >
                <Gift size={18} strokeWidth={1.5} />
              </motion.div>
              <div className="flex flex-col leading-none">
                <span className="font-serif text-xl font-semibold tracking-wide text-espresso">
                  YAARA
                </span>
                <span className="text-[9px] tracking-[0.2em] uppercase text-clay">
                  Gifting House
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(link.path) ? 'text-clay' : 'text-espresso hover:text-clay'
                  }`}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute -bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-clay"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <Link
                to="/builder"
                className="relative hidden sm:flex items-center gap-2 rounded-full bg-espresso px-4 py-2 text-sm font-medium text-pearl transition-all hover:bg-clay hover:shadow-lg hover:shadow-clay/20"
              >
                <ShoppingBag size={16} strokeWidth={1.5} />
                <span>My Hamper</span>
                {itemCount > 0 && selectedContainer && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1.5 text-[11px] font-bold text-espresso">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* Mobile toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden flex h-10 w-10 items-center justify-center rounded-lg text-espresso hover:bg-oat"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden border-t border-linen"
            >
              <div className="px-4 py-3 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive(link.path)
                        ? 'bg-clay/10 text-clay'
                        : 'text-espresso hover:bg-oat'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/builder"
                  onClick={() => setIsOpen(false)}
                  className="mt-2 flex items-center justify-center gap-2 rounded-full bg-espresso px-4 py-3 text-sm font-medium text-pearl"
                >
                  <ShoppingBag size={16} />
                  My Hamper{itemCount > 0 ? ` (${itemCount})` : ''}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
