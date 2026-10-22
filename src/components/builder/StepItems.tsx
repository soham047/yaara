import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Search } from 'lucide-react';
import {
  getProductsByFilter,
  type FilterCategory,
  type Product,
} from '@/data/products';
import { useHamperStore } from '@/store/hamperStore';
import Toast from '@/components/common/Toast';

const filterTabs: { label: string; value: FilterCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'Keepsakes & Trinkets', value: 'keepsakes' },
  { label: 'Ambiance & Candles', value: 'ambiance' },
  { label: 'Stationery', value: 'stationery' },
  { label: 'Plants & Flowers', value: 'plants' },
  { label: 'Sweet Treats', value: 'treats' },
];

export default function StepItems() {
  const [filter, setFilter] = useState<FilterCategory>('all');
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const selectedContainer = useHamperStore((s) => s.selectedContainer);
  const items = useHamperStore((s) => s.items);
  const addItem = useHamperStore((s) => s.addItem);
  const updateQuantity = useHamperStore((s) => s.updateQuantity);
  const removeItem = useHamperStore((s) => s.removeItem);

  const capacity = selectedContainer?.capacity ?? 0;
  const currentCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const isFull = currentCount >= capacity;

  let products = getProductsByFilter(filter);
  if (search.trim()) {
    const q = search.toLowerCase();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(q)),
    );
  }

  const handleAdd = (product: Product) => {
    const success = addItem(product);
    if (!success) {
      setToastMsg(
        `Your ${selectedContainer?.name} holds ${capacity} items. Upgrade the Cane Jhuri for more space, or proceed to the next step!`,
      );
      setToast(true);
      setTimeout(() => setToast(false), 4000);
    }
  };

  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="font-serif text-3xl sm:text-4xl text-espresso">Fill the Box</h2>
        <p className="mt-2 text-sm text-espresso/60 max-w-md mx-auto">
          Pick from keepsakes, candles, stationery, plants and treats. Fill to your container's
          capacity.
        </p>
      </div>

      {/* Capacity bar */}
      <div className="mb-6 rounded-xl border border-linen bg-white p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-espresso">
            {currentCount} / {capacity} items packed
          </span>
          <span className={`text-xs font-medium ${isFull ? 'text-clay' : 'text-sage-dark'}`}>
            {isFull ? 'Box is full!' : `${capacity - currentCount} slots left`}
          </span>
        </div>
        <div className="h-2 rounded-full bg-oat overflow-hidden">
          <motion.div
            animate={{ width: `${(currentCount / capacity) * 100}%` }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className={`h-full rounded-full ${isFull ? 'bg-clay' : 'bg-sage'}`}
          />
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-espresso/40" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search items..."
          className="w-full rounded-full border border-linen bg-white py-2.5 pl-10 pr-4 text-sm text-espresso placeholder:text-espresso/40 focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay/30"
        />
      </div>

      {/* Filter tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {filterTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
              filter === tab.value
                ? 'bg-espresso text-pearl'
                : 'bg-oat text-espresso hover:bg-linen'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        <AnimatePresence mode="popLayout">
          {products.map((product) => {
            const inHamper = items.find((i) => i.product.id === product.id);
            return (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group flex flex-col overflow-hidden rounded-xl border border-linen bg-white"
              >
                <div className="relative aspect-square overflow-hidden bg-oat">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {inHamper && (
                    <span className="absolute top-2 right-2 rounded-full bg-clay px-2 py-0.5 text-[10px] font-bold text-pearl">
                      x{inHamper.quantity}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-3">
                  <h3 className="text-sm font-medium leading-snug text-espresso line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-[11px] text-espresso/50 line-clamp-2 mt-0.5 flex-1">
                    {product.description}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm font-semibold text-clay">₹{product.price}</span>
                    {inHamper ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() =>
                            inHamper.quantity === 1
                              ? removeItem(product.id)
                              : updateQuantity(product.id, inHamper.quantity - 1)
                          }
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-oat text-espresso hover:bg-linen"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-5 text-center text-xs font-medium">
                          {inHamper.quantity}
                        </span>
                        <button
                          onClick={() => handleAdd(product)}
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-espresso text-pearl hover:bg-clay"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAdd(product)}
                        className="flex items-center gap-1 rounded-full bg-espresso px-2.5 py-1 text-[11px] font-medium text-pearl transition-colors hover:bg-clay"
                      >
                        <Plus size={12} /> Add
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <Toast message={toastMsg} show={toast} onClose={() => setToast(false)} />
    </div>
  );
}
