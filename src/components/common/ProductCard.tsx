import { motion } from 'framer-motion';
import { Plus, Check, Minus } from 'lucide-react';
import type { Product } from '@/data/products';
import Badge from './Badge';
import { useHamperStore } from '@/store/hamperStore';

interface ProductCardProps {
  product: Product;
  showAddButton?: boolean;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, showAddButton = true, onQuickView }: ProductCardProps) {
  const addItem = useHamperStore((s) => s.addItem);
  const items = useHamperStore((s) => s.items);
  const lastAddedId = useHamperStore((s) => s.lastAddedId);

  const inHamper = items.find((i) => i.product.id === product.id);
  const justAdded = lastAddedId === product.id;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      onClick={() => onQuickView?.(product)}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-linen bg-white cursor-pointer transition-shadow hover:shadow-xl hover:shadow-espresso/5"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-oat">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.capacity && (
          <div className="absolute top-3 left-3">
            <Badge variant="sage" size="sm">
              Holds {product.capacity} items
            </Badge>
          </div>
        )}
        {inHamper && (
          <div className="absolute top-3 right-3">
            <Badge variant="clay" size="sm">
              x{inHamper.quantity}
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-serif text-lg font-medium leading-snug text-espresso">{product.name}</h3>
        <p className="mt-1 text-xs leading-relaxed text-espresso/60 line-clamp-2 flex-1">
          {product.description}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-semibold text-clay">₹{product.price}</span>
          {showAddButton && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleAdd}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                justAdded
                  ? 'bg-sage text-white'
                  : 'bg-espresso text-pearl hover:bg-clay'
              }`}
            >
              {justAdded ? (
                <>
                  <Check size={14} /> Added
                </>
              ) : inHamper ? (
                <>
                  <Plus size={14} /> Add more
                </>
              ) : (
                <>
                  <Plus size={14} /> Add to box
                </>
              )}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
