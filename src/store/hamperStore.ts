import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/data/products';

export interface HamperItem {
  product: Product;
  quantity: number;
}

export interface CardData {
  product: Product | null;
  recipientName: string;
  senderName: string;
  message: string;
  digitalLink: string;
}

export interface CustomerData {
  senderName: string;
  senderPhone: string;
  recipientName: string;
  deliveryAddress: string;
  city: string;
  state: string;
  pincode: string;
  deliveryDatePreference: string;
  specialInstructions: string;
}

interface HamperState {
  step: number;
  selectedContainer: Product | null;
  items: HamperItem[];
  card: CardData;
  customer: CustomerData;
  lastAddedId: string | null;

  setStep: (step: number) => void;
  setContainer: (container: Product) => void;
  addItem: (product: Product) => boolean;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  setCard: (card: Partial<CardData>) => void;
  setCustomer: (data: Partial<CustomerData>) => void;
  setLastAddedId: (id: string | null) => void;

  getItemCount: () => number;
  getItemsTotal: () => number;
  getCardTotal: () => number;
  getTotal: () => number;
  isStepValid: (step: number) => boolean;

  reset: () => void;
}

const defaultCard: CardData = {
  product: null,
  recipientName: '',
  senderName: '',
  message: '',
  digitalLink: '',
};

const defaultCustomer: CustomerData = {
  senderName: '',
  senderPhone: '',
  recipientName: '',
  deliveryAddress: '',
  city: '',
  state: '',
  pincode: '',
  deliveryDatePreference: '',
  specialInstructions: '',
};

export const useHamperStore = create<HamperState>()(
  persist(
    (set, get) => ({
      step: 1,
      selectedContainer: null,
      items: [],
      card: defaultCard,
      customer: defaultCustomer,
      lastAddedId: null,

      setStep: (step) => set({ step }),

      setContainer: (container) => set({ selectedContainer: container }),

      addItem: (product) => {
        const state = get();
        const container = state.selectedContainer;
        if (!container || !container.capacity) return false;

        const existing = state.items.find((i) => i.product.id === product.id);
        const currentCount = state.items.reduce((sum, i) => sum + i.quantity, 0);

        if (existing) {
          if (currentCount >= container.capacity) return false;
          set({
            items: state.items.map((i) =>
              i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
            ),
            lastAddedId: product.id,
          });
          return true;
        }

        if (currentCount >= container.capacity) return false;
        set({
          items: [...state.items, { product, quantity: 1 }],
          lastAddedId: product.id,
        });
        return true;
      },

      removeItem: (productId) =>
        set((s) => ({ items: s.items.filter((i) => i.product.id !== productId) })),

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        const state = get();
        const container = state.selectedContainer;
        if (container && container.capacity) {
          const otherCount = state.items
            .filter((i) => i.product.id !== productId)
            .reduce((sum, i) => sum + i.quantity, 0);
          const maxAllowed = container.capacity - otherCount;
          if (quantity > maxAllowed) return;
        }
        set({
          items: state.items.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i,
          ),
        });
      },

      setCard: (card) => set((s) => ({ card: { ...s.card, ...card } })),
      setCustomer: (data) => set((s) => ({ customer: { ...s.customer, ...data } })),
      setLastAddedId: (id) => set({ lastAddedId: id }),

      getItemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      getItemsTotal: () => get().items.reduce((sum, i) => sum + i.quantity * i.product.price, 0),
      getCardTotal: () => (get().card.product ? get().card.product!.price : 0),
      getTotal: () => {
        const s = get();
        const container = s.selectedContainer?.price ?? 0;
        const items = s.items.reduce((sum, i) => sum + i.quantity * i.product.price, 0);
        const card = s.card.product?.price ?? 0;
        return container + items + card;
      },

      isStepValid: (step) => {
        const s = get();
        if (step === 1) return s.selectedContainer !== null;
        if (step === 2) return s.items.length > 0;
        if (step === 3) return true;
        if (step === 4) {
          return (
            s.customer.senderName.trim() !== '' &&
            s.customer.senderPhone.trim().length >= 10 &&
            s.customer.recipientName.trim() !== '' &&
            s.customer.deliveryAddress.trim() !== '' &&
            s.customer.city.trim() !== '' &&
            s.customer.pincode.trim().length >= 6
          );
        }
        return false;
      },

      reset: () =>
        set({
          step: 1,
          selectedContainer: null,
          items: [],
          card: defaultCard,
          customer: defaultCustomer,
          lastAddedId: null,
        }),
    }),
    {
      name: 'yaara-hamper-store',
      partialize: (s) => ({
        selectedContainer: s.selectedContainer,
        items: s.items,
        card: s.card,
      }),
    },
  ),
);
