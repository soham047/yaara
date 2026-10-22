import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Gift,
  Package,
  PenLine,
  MessageCircle,
  ArrowRight,
  Heart,
  Hand,
  Truck,
  Sparkles,
} from 'lucide-react';
import { useState } from 'react';
import {
  curatedHampers,
  getProductsByFilter,
  type Product,
} from '@/data/products';
import { useHamperStore } from '@/store/hamperStore';
import { BUSINESS_WHATSAPP_NUMBER } from '@/config';
import { generateCuratedOrderUrl } from '@/utils/whatsapp';
import QuickViewModal from '@/components/common/QuickViewModal';

const teaserItems = [
  { id: 'keep-cute-keychain', label: 'Keychain' },
  { id: 'decor-scented-candle', label: 'Candle' },
  { id: 'stat-greeting-card', label: 'Greeting Card' },
  { id: 'treat-chocolates', label: 'Chocolates' },
];

export default function HomePage() {
  const addItem = useHamperStore((s) => s.addItem);
  const setContainer = useHamperStore((s) => s.setContainer);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [teaserPacked, setTeaserPacked] = useState<string[]>([]);

  const teaserProducts = getProductsByFilter('all').filter((p) =>
    teaserItems.some((t) => t.id === p.id),
  );

  const handleTeaserClick = (product: Product) => {
    if (teaserPacked.includes(product.id)) return;
    setTeaserPacked([...teaserPacked, product.id]);
  };

  const handleQuickOrder = (hamperId: string) => {
    const hamper = curatedHampers.find((h) => h.id === hamperId);
    if (!hamper) return;
    const url = generateCuratedOrderUrl(
      hamper.name,
      hamper.price,
      hamper.items,
      BUSINESS_WHATSAPP_NUMBER,
    );
    window.open(url, '_blank');
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-oat via-pearl to-pearl" />
        <div className="relative mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-linen bg-white px-4 py-1.5 text-xs font-medium text-sage-dark">
                <Sparkles size={14} />
                Hand-packed with intention
              </span>
              <h1 className="mt-6 font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-espresso text-balance">
                Gifts for the ones who <em className="text-clay">matter.</em>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-espresso/70 max-w-md">
                Curate an intentional, aesthetic gift box packed with keepsakes, warmth, and
                handwritten words.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/builder"
                  className="group flex items-center justify-center gap-2 rounded-full bg-espresso px-6 py-3.5 text-sm font-medium text-pearl transition-all hover:bg-clay hover:shadow-lg hover:shadow-clay/20"
                >
                  <Gift size={18} />
                  Build Your Own Hamper
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
                <Link
                  to="/shop"
                  className="flex items-center justify-center gap-2 rounded-full border border-linen bg-white px-6 py-3.5 text-sm font-medium text-espresso transition-all hover:border-clay hover:text-clay"
                >
                  Explore Ready-to-Gift
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-espresso/10">
                <img
                  src="https://images.pexels.com/photos/20699855/pexels-photo-20699855.jpeg?auto=compress&cs=tinysrgb&h=900&w=900"
                  alt="Luxurious gift hamper with chocolates"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/30 to-transparent" />
              </div>
              {/* Floating cards */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute -bottom-4 -left-4 rounded-2xl bg-white shadow-xl p-3 flex items-center gap-2"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage/15">
                  <Hand size={18} className="text-sage-dark" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-espresso">100% Hand-Packed</p>
                  <p className="text-[10px] text-espresso/50">Every box, made with care</p>
                </div>
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 5, delay: 1 }}
                className="absolute -top-4 -right-4 rounded-2xl bg-white shadow-xl p-3 flex items-center gap-2"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15">
                  <PenLine size={18} className="text-gold" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-espresso">Handwritten Notes</p>
                  <p className="text-[10px] text-espresso/50">Old-world charm, revived</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl text-espresso">How It Works</h2>
          <p className="mt-2 text-sm text-espresso/60">Three simple steps to a meaningful gift</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Package,
              title: 'Choose Your Packaging',
              desc: 'Box, Jhuri, or Potli. Pick the vessel that sets the tone.',
              step: '01',
            },
            {
              icon: Gift,
              title: 'Fill with Handpicked Goodies',
              desc: 'Keepsakes, scents, candles, stationery, or sweet treats.',
              step: '02',
            },
            {
              icon: MessageCircle,
              title: 'Add a Note & Order on WhatsApp',
              desc: 'A handwritten message, then seamless direct ordering.',
              step: '03',
            },
          ].map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative rounded-2xl border border-linen bg-white p-6"
            >
              <span className="absolute top-4 right-4 font-serif text-3xl text-linen">
                {item.step}
              </span>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-clay/10 text-clay mb-4">
                <item.icon size={22} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-xl text-espresso mb-2">{item.title}</h3>
              <p className="text-sm text-espresso/60 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive teaser */}
      <section className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-3xl border border-linen bg-gradient-to-b from-oat to-pearl p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl text-espresso">
                Try it — tap to fill the box
              </h2>
              <p className="mt-3 text-sm text-espresso/60 max-w-md">
                Click the items below and watch them pop into the box. This is a tiny preview of the
                full builder experience.
              </p>
              <Link
                to="/builder"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-espresso px-5 py-2.5 text-sm font-medium text-pearl hover:bg-clay"
              >
                Open Full Builder <ArrowRight size={16} />
              </Link>
            </div>

            <div className="flex flex-col items-center gap-4">
              {/* Virtual box */}
              <div className="relative w-full max-w-sm rounded-2xl border-2 border-dashed border-clay/30 bg-white p-4 min-h-[180px]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-6 bg-clay rounded-b-lg" />
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {teaserProducts.map((product) => {
                    const packed = teaserPacked.includes(product.id);
                    return (
                      <motion.button
                        key={product.id}
                        whileHover={{ scale: packed ? 1 : 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleTeaserClick(product)}
                        className={`relative aspect-square rounded-lg overflow-hidden border transition-all ${
                          packed
                            ? 'border-clay opacity-100'
                            : 'border-linen opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                        {packed && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute bottom-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-clay text-pearl text-[10px]"
                          >
                            ✓
                          </motion.div>
                        )}
                      </motion.button>
                    );
                  })}
                  {Array.from({ length: Math.max(0, 6 - teaserProducts.length) }).map((_, i) => (
                    <div
                      key={`empty-${i}`}
                      className="aspect-square rounded-lg border-2 border-dashed border-linen/50 flex items-center justify-center"
                    >
                      <span className="text-linen text-lg">+</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-xs text-espresso/50">
                {teaserPacked.length} of {teaserProducts.length} items packed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured curated hampers */}
      <section className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl text-espresso">Ready-to-Gift Hampers</h2>
          <p className="mt-2 text-sm text-espresso/60">
            Pre-curated boxes for when you need something beautiful, fast
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {curatedHampers.map((hamper, idx) => (
            <motion.div
              key={hamper.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-linen bg-white transition-shadow hover:shadow-xl hover:shadow-espresso/5"
            >
              <div
                className="relative aspect-[4/3] overflow-hidden bg-oat cursor-pointer"
                onClick={() => {
                  const product = teaserProducts[0];
                  setQuickView(product);
                }}
              >
                <img
                  src={hamper.image}
                  alt={hamper.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="rounded-full bg-pearl/90 px-2.5 py-1 text-[10px] font-medium text-sage-dark">
                    {hamper.occasion}
                  </span>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="font-serif text-lg font-medium text-espresso">{hamper.name}</h3>
                <p className="mt-1 text-xs text-espresso/60 leading-relaxed line-clamp-2 flex-1">
                  {hamper.description}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-lg font-semibold text-clay">₹{hamper.price}</span>
                  <button
                    onClick={() => handleQuickOrder(hamper.id)}
                    className="flex items-center gap-1.5 rounded-full bg-sage px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-sage-dark"
                  >
                    <MessageCircle size={14} />
                    Quick Order
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust badges */}
      <section className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Hand, title: '100% Hand-Packed', desc: 'Every item placed with intention' },
            { icon: PenLine, title: 'Handwritten Letter Included', desc: 'Your words, in our hand' },
            { icon: MessageCircle, title: 'Direct WhatsApp Support', desc: 'Real conversations, no bots' },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-4 rounded-2xl border border-linen bg-white p-5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-clay/10 text-clay flex-shrink-0">
                <item.icon size={20} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-semibold text-espresso">{item.title}</p>
                <p className="text-xs text-espresso/50">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </div>
  );
}
