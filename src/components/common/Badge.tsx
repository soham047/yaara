import { motion } from 'framer-motion';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'gold' | 'sage' | 'clay';
  size?: 'sm' | 'md';
}

const variantStyles = {
  default: 'bg-oat text-espresso border-linen',
  gold: 'bg-gold/15 text-gold border-gold/30',
  sage: 'bg-sage/15 text-sage-dark border-sage/30',
  clay: 'bg-clay/15 text-clay border-clay/30',
};

const sizeStyles = {
  sm: 'text-[10px] px-2 py-0.5',
  md: 'text-xs px-2.5 py-1',
};

export default function Badge({ children, variant = 'default', size = 'md' }: BadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center rounded-full border font-medium ${variantStyles[variant]} ${sizeStyles[size]}`}
    >
      {children}
    </motion.span>
  );
}
