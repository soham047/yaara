import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Search } from 'lucide-react';
import {
  products,
  curatedHampers,
  allOccasions,
  type Product,
} from '@/data/products';
import { BUSINESS_WHATSAPP_NUMBER } from '@/config';
import { generateCuratedOrderUrl } from '@/utils/whatsapp';
import ProductCard from '@/components/common/ProductCard';
import QuickViewModal from '@/components/common/QuickViewModal';

type Tab = 'hampers' | 'items';

export default function ShopPage() {
  const [tab, setTab] = useState<Tab>('hampers');
  const [occasion, setOccasion] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [quickViewCurated, setQuickViewCuried] = useState<{
    items: string[];
    price: number;
    name: string;
  } | null>(null);

  const nonPackaging = products.filter((p) => p.category !== 'packaging');

  let filteredHampers = curatedHampers;
  if (occasion !== 'all') {
    filteredHampers = curatedHampers.filter((h) => h.occasion === occasion);
  }

  let filteredItems = nonPackaging;
  if (occasion !== 'all') {
    filteredItems = nonPackaging.filter((p) => p.occasions?.includes(occasion));
  }
  if (search.trim()) {
    const q = search.toLowerCase();
    filteredItems = filteredItems.filter(
      (p) =>
        p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q),
    );
  }

  const handleHamperClick = (hamperId: string) => {
    const hamper = curatedHampers.find((h) => h.id === hamperId);
    if (!hamper) return;
    const product = products.find((p) => p.id === hamper.items[0]);
    if (product) {
      setQuickViewCuried({
        items: hamper.items,
        price: hamper.price,
        name: hamper.name,
      });
      setQuickView(product);
    }
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
    <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 py-8 pb-32 lg:pb-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="font-serif text-4xl sm:text-5xl text-espresso">Ready-to-Gift Catalog</h1>
        <p className="mt-3 text-sm text-espresso/60 max-w-md mx-auto">
          Browse pre-curated hampers and individual items. Order any of them instantly on WhatsApp.
        </p>
      </div>

      {/* Tab toggle */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <button
          onClick={() => setTab('hampers')}
          className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
            tab === 'hampers' ? 'bg-espresso text-pearl' : 'bg-oat text-espresso hover:bg-linen'
          }`}
        >
          Pre-Curated Hampers
        </button>
        <button
          onClick={() => setTab('items')}
          className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
            tab === 'items' ? 'bg-espresso text-pearl' : 'bg-oat text-espresso hover:bg-linen'
          }`}
        >
          Individual Items
        </button>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        {/* Occasion filter */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setOccasion('all')}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
              occasion === 'all'
                ? 'bg-clay text-pearl'
                : 'bg-white border border-linen text-espresso hover:border-clay'
            }`}
          >
            All Occasions
          </button>
          {allOccasions.map((occ) => (
            <button
              key={occ}
              onClick={() => setOccasion(occ)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                occasion === occ
                  ? 'bg-clay text-pearl'
                  : 'bg-white border border-linen text-espresso hover:border-clay'
              }`}
            >
              {occ}
            </button>
          ))}
        </div>

        {/* Search (items only) */}
        {tab === 'items' && (
          <div className="relative max-w-md mx-auto">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-espresso/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search items..."
              className="w-full rounded-full border border-linen bg-white py-2.5 pl-10 pr-4 text-sm text-espresso placeholder:text-espresso/40 focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay/30"
            />
          </div>
        )}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {tab === 'hampers' ? (
          <motion.div
            key="hampers"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {filteredHampers.length === 0 ? (
              <p className="text-center text-sm text-espresso/50 py-12">
                No hampers for this occasion. Try another filter.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {filteredHampers.map((hamper) => (
                  <motion.div
                    key={hamper.id}
                    layout
                    className="group flex flex-col overflow-hidden rounded-2xl border border-linen bg-white transition-shadow hover:shadow-xl hover:shadow-espresso/5"
                  >
                    <div
                      className="relative aspect-[4/3] overflow-hidden bg-oat cursor-pointer"
                      onClick={() => handleHamperClick(hamper.id)}
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
                          Order
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="items"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {filteredItems.length === 0 ? (
              <p className="text-center text-sm text-espresso/50 py-12">
                No items match your search. Try a different term or filter.
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
                {filteredItems.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    showAddButton={false}
                    onQuickView={(p) => {
                      setQuickViewCuried(null);
                      setQuickView(p);
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <QuickViewModal
        product={quickView}
        onClose={() => {
          setQuickView(null);
          setQuickViewCuried(null);
        }}
        curatedItems={quickViewCurated?.items}
        curatedPrice={quickViewCurated?.price}
        curatedName={quickViewCurated?.name}
      />
    </div>
  );
}
