// ════════════════════════════════════════════════════════════
//  YAARA GIFTING HOUSE — PRODUCT CATALOG
//  All 34 products with realistic INR pricing and Pexels imagery
// ════════════════════════════════════════════════════════════

export type ProductCategory =
  | 'packaging'
  | 'keepsakes'
  | 'decor'
  | 'stationery'
  | 'treats';

export type FilterCategory =
  | 'all'
  | 'keepsakes'
  | 'ambiance'
  | 'stationery'
  | 'plants'
  | 'treats';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: ProductCategory;
  filterCategory: FilterCategory;
  tags: string[];
  capacity?: number; // only for packaging
  occasions?: string[];
}

export const products: Product[] = [
  // ─── A. PACKAGING CONTAINERS ───────────────────────────────
  {
    id: 'pack-kraft-box',
    name: 'Kraft Gift Box',
    description: 'Sturdy earth-toned box with satin ribbon. A timeless, minimal base.',
    price: 199,
    image: 'https://images.pexels.com/photos/5404193/pexels-photo-5404193.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'packaging',
    filterCategory: 'all',
    tags: ['eco', 'minimal', 'ribbon'],
    capacity: 6,
  },
  {
    id: 'pack-cane-jhuri',
    name: 'Cane Jhuri Basket',
    description: 'Artisanal handwoven cane basket. Rustic, reusable, and brimming with charm.',
    price: 349,
    image: 'https://images.pexels.com/photos/9173943/pexels-photo-9173943.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'packaging',
    filterCategory: 'all',
    tags: ['handwoven', 'rustic', 'reusable'],
    capacity: 8,
  },
  {
    id: 'pack-organza-potli',
    name: 'Organza Potli Bag',
    description: 'Sheer festive drawstring pouch. Delicate and luminous for small treasures.',
    price: 99,
    image: 'https://images.pexels.com/photos/3631685/pexels-photo-3631685.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'packaging',
    filterCategory: 'all',
    tags: ['festive', 'sheer', 'compact'],
    capacity: 3,
  },
  {
    id: 'pack-jute-pouch',
    name: 'Jute Pouch',
    description: 'Eco-friendly rustic pouch with wooden bead closure. Natural and grounding.',
    price: 129,
    image: 'https://images.pexels.com/photos/35110202/pexels-photo-35110202.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'packaging',
    filterCategory: 'all',
    tags: ['eco', 'rustic', 'natural'],
    capacity: 4,
  },
  {
    id: 'pack-paper-bag',
    name: 'Paper Gift Bag',
    description: 'Thick craft paper bag with rope handles. Simple, quick, and recyclable.',
    price: 79,
    image: 'https://images.pexels.com/photos/10673679/pexels-photo-10673679.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'packaging',
    filterCategory: 'all',
    tags: ['craft', 'rope handles', 'recyclable'],
    capacity: 4,
  },

  // ─── B. KEEPSAKES, WEARABLES & ACCESSORIES ─────────────────
  {
    id: 'keep-cute-keychain',
    name: 'Cute Keychain',
    description: 'Whimsical resin/acrylic charm. A little joy for everyday carry.',
    price: 149,
    image: 'https://images.pexels.com/photos/4452374/pexels-photo-4452374.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'keepsakes',
    filterCategory: 'keepsakes',
    tags: ['charm', 'resin', 'everyday'],
    occasions: ['Birthday', 'Thank You'],
  },
  {
    id: 'keep-alphabet-keychain',
    name: 'Alphabet Keychain',
    description: 'Custom brass/resin initial keychain. Personal and meaningful.',
    price: 179,
    image: 'https://images.pexels.com/photos/14086840/pexels-photo-14086840.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'keepsakes',
    filterCategory: 'keepsakes',
    tags: ['personalized', 'initial', 'brass'],
    occasions: ['Birthday', 'Anniversary'],
  },
  {
    id: 'keep-friendship-bracelet',
    name: 'Friendship Bracelet',
    description: 'Woven adjustable cord bracelet. A nostalgic symbol of closeness.',
    price: 199,
    image: 'https://images.pexels.com/photos/1212048/pexels-photo-1212048.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'keepsakes',
    filterCategory: 'keepsakes',
    tags: ['woven', 'adjustable', 'nostalgic'],
    occasions: ['Birthday', 'Friendship'],
  },
  {
    id: 'keep-beaded-bracelet',
    name: 'Beaded Bracelet',
    description: 'Natural stone & glass seed beads. Earthy elegance for the wrist.',
    price: 249,
    image: 'https://images.pexels.com/photos/36823004/pexels-photo-36823004.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'keepsakes',
    filterCategory: 'keepsakes',
    tags: ['stone beads', 'earthy', 'handcrafted'],
    occasions: ['Birthday', 'Anniversary'],
  },
  {
    id: 'keep-hair-scrunchie',
    name: 'Silk Hair Scrunchie',
    description: 'Mulberry silk / satin oversized scrunchie. Soft, gentle, and luxurious.',
    price: 129,
    image: 'https://images.pexels.com/photos/14610788/pexels-photo-14610788.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'keepsakes',
    filterCategory: 'keepsakes',
    tags: ['silk', 'satin', 'soft'],
    occasions: ['Birthday', 'Thank You'],
  },
  {
    id: 'keep-hair-clips',
    name: 'Pearl Hair Clips',
    description: 'Pearl & pastel resin clip pair. Dainty accents for everyday grace.',
    price: 159,
    image: 'https://images.pexels.com/photos/17049710/pexels-photo-17049710.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'keepsakes',
    filterCategory: 'keepsakes',
    tags: ['pearl', 'pastel', 'pair'],
    occasions: ['Birthday', 'Thank You'],
  },
  {
    id: 'keep-bag-charm',
    name: 'Bag Charm',
    description: 'Boho tassel and mini brass bell. A playful accessory for any bag.',
    price: 189,
    image: 'https://images.pexels.com/photos/8281773/pexels-photo-8281773.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'keepsakes',
    filterCategory: 'keepsakes',
    tags: ['boho', 'tassel', 'brass bell'],
    occasions: ['Birthday', 'Thank You'],
  },
  {
    id: 'keep-mini-pendant',
    name: 'Mini Pendant',
    description: 'Dainty gold-plated charm on chain. A whisper of everyday luxury.',
    price: 349,
    image: 'https://images.pexels.com/photos/13325937/pexels-photo-13325937.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'keepsakes',
    filterCategory: 'keepsakes',
    tags: ['gold-plated', 'dainty', 'chain'],
    occasions: ['Anniversary', 'Birthday'],
  },
  {
    id: 'keep-fridge-magnet',
    name: 'Hand-Painted Fridge Magnet',
    description: 'Quirky hand-painted illustration magnet. A tiny daily smile on the fridge.',
    price: 129,
    image: 'https://images.pexels.com/photos/17210072/pexels-photo-17210072.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'keepsakes',
    filterCategory: 'keepsakes',
    tags: ['hand-painted', 'quirky', 'illustration'],
    occasions: ['Thank You', 'Housewarming'],
  },
  {
    id: 'keep-soft-toy',
    name: 'Mini Soft Toy',
    description: 'Mini plush bear/bunny companion. Cuddly comfort in pocket size.',
    price: 299,
    image: 'https://images.pexels.com/photos/35579568/pexels-photo-35579568.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'keepsakes',
    filterCategory: 'keepsakes',
    tags: ['plush', 'cuddly', 'comfort'],
    occasions: ['Birthday', 'Long Distance'],
  },

  // ─── C. DECOR, AMBIANCE & LIVING ───────────────────────────
  {
    id: 'decor-scented-candle',
    name: 'Mini Scented Candle',
    description: 'Soy wax in amber jar. Vanilla & Sandalwood. Warm, slow, enveloping glow.',
    price: 249,
    image: 'https://images.pexels.com/photos/30235391/pexels-photo-30235391.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'decor',
    filterCategory: 'ambiance',
    tags: ['soy wax', 'amber jar', 'vanilla sandalwood'],
    occasions: ['Birthday', 'Thank You', 'Festive/Diwali'],
  },
  {
    id: 'decor-diya',
    name: 'Decorative Diya',
    description: 'Handcrafted painted clay diya. Light, tradition, and warmth in one.',
    price: 149,
    image: 'https://images.pexels.com/photos/29629443/pexels-photo-29629443.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'decor',
    filterCategory: 'ambiance',
    tags: ['clay', 'handcrafted', 'festive'],
    occasions: ['Festive/Diwali', 'Thank You'],
  },
  {
    id: 'decor-terracotta',
    name: 'Terracotta Keepsake',
    description: 'Hand-molded traditional terracotta figurine. Artisanal heritage on a shelf.',
    price: 219,
    image: 'https://images.pexels.com/photos/27556611/pexels-photo-27556611.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'decor',
    filterCategory: 'ambiance',
    tags: ['terracotta', 'hand-molded', 'heritage'],
    occasions: ['Festive/Diwali', 'Housewarming'],
  },
  {
    id: 'decor-ceramic-mug',
    name: 'Ceramic Mug',
    description: 'Minimalist speckled stoneware mug. For slow mornings and warm hands.',
    price: 399,
    image: 'https://images.pexels.com/photos/34299343/pexels-photo-34299343.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'decor',
    filterCategory: 'ambiance',
    tags: ['stoneware', 'speckled', 'minimalist'],
    occasions: ['Birthday', 'Thank You', 'Long Distance'],
  },
  {
    id: 'decor-mini-plant-art',
    name: 'Mini Artificial Plant',
    description: 'Cute desk succulent in ceramic pot. Greenery without the worry.',
    price: 199,
    image: 'https://images.pexels.com/photos/29796722/pexels-photo-29796722.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'decor',
    filterCategory: 'plants',
    tags: ['succulent', 'ceramic pot', 'desk'],
    occasions: ['Housewarming', 'Thank You'],
  },
  {
    id: 'decor-mini-plant-real',
    name: 'Real Plant in Mini Pot',
    description: 'Hardy jade or snake plant sapling. Living, breathing green companionship.',
    price: 299,
    image: 'https://images.pexels.com/photos/13336361/pexels-photo-13336361.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'decor',
    filterCategory: 'plants',
    tags: ['jade', 'snake plant', 'living'],
    occasions: ['Housewarming', 'Thank You'],
  },
  {
    id: 'decor-origami-bouquet',
    name: 'Paper Origami Flower Bouquet',
    description: 'Handmade everlasting paper blooms. Color that never fades.',
    price: 249,
    image: 'https://images.pexels.com/photos/28927576/pexels-photo-28927576.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'decor',
    filterCategory: 'plants',
    tags: ['origami', 'everlasting', 'handmade'],
    occasions: ['Birthday', 'Anniversary', 'Thank You'],
  },
  {
    id: 'decor-fresh-posy',
    name: 'Fresh Mini Flower Posy',
    description: 'Wrapped seasonal fresh blooms. Fleeting, fragrant, and utterly beautiful.',
    price: 299,
    image: 'https://images.pexels.com/photos/3648977/pexels-photo-3648977.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'decor',
    filterCategory: 'plants',
    tags: ['fresh', 'seasonal', 'fragrant'],
    occasions: ['Birthday', 'Anniversary'],
  },

  // ─── D. STATIONERY & PERSONAL TOUCH ────────────────────────
  {
    id: 'stat-greeting-card',
    name: 'Gold Foil Greeting Card',
    description: 'Gold foil textured luxury card. Elegant words on an elegant canvas.',
    price: 99,
    image: 'https://images.pexels.com/photos/33228105/pexels-photo-33228105.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'stationery',
    filterCategory: 'stationery',
    tags: ['gold foil', 'luxury', 'textured'],
    occasions: ['Birthday', 'Anniversary', 'Thank You'],
  },
  {
    id: 'stat-message-card',
    name: 'Mini Message Card',
    description: 'Pocket-sized botanical notecard. Small words, big heart.',
    price: 49,
    image: 'https://images.pexels.com/photos/7784602/pexels-photo-7784602.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'stationery',
    filterCategory: 'stationery',
    tags: ['botanical', 'pocket-sized', 'notecard'],
    occasions: ['Thank You', 'Birthday'],
  },
  {
    id: 'stat-photo-bookmark',
    name: 'Photo Bookmark',
    description: 'Custom polaroid-style laminated bookmark. Memories tucked between pages.',
    price: 89,
    image: 'https://images.pexels.com/photos/29010900/pexels-photo-29010900.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'stationery',
    filterCategory: 'stationery',
    tags: ['polaroid', 'laminated', 'custom'],
    occasions: ['Long Distance', 'Birthday'],
  },
  {
    id: 'stat-quote-bookmark',
    name: 'Quote Bookmark',
    description: 'Embossed calligraphy cardstock. A favorite line, every time you read.',
    price: 69,
    image: 'https://images.pexels.com/photos/39964693/pexels-photo-39964693.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'stationery',
    filterCategory: 'stationery',
    tags: ['embossed', 'calligraphy', 'cardstock'],
    occasions: ['Thank You', 'Long Distance'],
  },
  {
    id: 'stat-pocket-notebook',
    name: 'Mini Pocket Notebook',
    description: 'Hand-stitched blank kraft journal. For thoughts that deserve paper.',
    price: 149,
    image: 'https://images.pexels.com/photos/5321357/pexels-photo-5321357.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'stationery',
    filterCategory: 'stationery',
    tags: ['hand-stitched', 'kraft', 'blank'],
    occasions: ['Birthday', 'Thank You'],
  },
  {
    id: 'stat-sticker-sheet',
    name: 'Sticker Sheet',
    description: 'Cozy aesthetic illustrated vinyl stickers. Small joys to stick anywhere.',
    price: 99,
    image: 'https://images.pexels.com/photos/30101191/pexels-photo-30101191.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'stationery',
    filterCategory: 'stationery',
    tags: ['vinyl', 'illustrated', 'cozy'],
    occasions: ['Birthday', 'Thank You'],
  },
  {
    id: 'stat-postcard',
    name: 'Printed Postcard',
    description: 'Artisan photography art print postcard. A frame-worthy greeting.',
    price: 69,
    image: 'https://images.pexels.com/photos/34144383/pexels-photo-34144383.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'stationery',
    filterCategory: 'stationery',
    tags: ['photography', 'art print', 'mail'],
    occasions: ['Long Distance', 'Thank You'],
  },
  {
    id: 'stat-bengali-postcard',
    name: 'Bengali-Themed Postcard',
    description: 'Nostalgic Kolkata/Bengali typography & cultural art. Roots and warmth.',
    price: 79,
    image: 'https://images.pexels.com/photos/15415129/pexels-photo-15415129.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'stationery',
    filterCategory: 'stationery',
    tags: ['bengali', 'kolkata', 'cultural'],
    occasions: ['Long Distance', 'Festive/Diwali'],
  },
  {
    id: 'stat-letter-set',
    name: 'Handwritten Letter Set',
    description: 'Parchment sheet + vintage wax-sealed envelope. Old-world romance, revived.',
    price: 149,
    image: 'https://images.pexels.com/photos/9700836/pexels-photo-9700836.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'stationery',
    filterCategory: 'stationery',
    tags: ['parchment', 'wax seal', 'vintage'],
    occasions: ['Long Distance', 'Anniversary'],
  },
  {
    id: 'stat-photo-frame',
    name: 'Mini Photo Frame',
    description: 'Wooden 3x3 tabletop memory frame. For the moments worth displaying.',
    price: 279,
    image: 'https://images.pexels.com/photos/1214205/pexels-photo-1214205.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'stationery',
    filterCategory: 'stationery',
    tags: ['wooden', '3x3', 'tabletop'],
    occasions: ['Long Distance', 'Anniversary', 'Birthday'],
  },

  // ─── E. TREATS ─────────────────────────────────────────────
  {
    id: 'treat-chocolates',
    name: 'Artisan Chocolates (Pack of 3)',
    description: 'Individually wrapped dark hazelnut pralines. A bite of quiet indulgence.',
    price: 199,
    image: 'https://images.pexels.com/photos/6487798/pexels-photo-6487798.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'treats',
    filterCategory: 'treats',
    tags: ['dark chocolate', 'hazelnut praline', 'pack of 3'],
    occasions: ['Birthday', 'Anniversary', 'Thank You', 'Festive/Diwali', 'Long Distance'],
  },
];

// ─── PRE-CURATED HAMPERS ────────────────────────────────────
export interface CuratedHamper {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  items: string[]; // product ids
  occasion: string;
  tags: string[];
}

export const curatedHampers: CuratedHamper[] = [
  {
    id: 'cur-nostalgia-box',
    name: 'The Nostalgia Box',
    description: 'A warm hug of Bengal and heritage — Bengali postcard, terracotta keepsake, diya, and artisan chocolates.',
    image: 'https://images.pexels.com/photos/15415129/pexels-photo-15415129.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    price: 1074,
    items: ['stat-bengali-postcard', 'decor-terracotta', 'decor-diya', 'treat-chocolates'],
    occasion: 'Festive/Diwali',
    tags: ['Bengal', 'heritage', 'festive'],
  },
  {
    id: 'cur-self-care-mini',
    name: 'The Self-Care Mini',
    description: 'Slow mornings in a box — scented candle, silk scrunchie, ceramic mug, and an embossed quote bookmark.',
    image: 'https://images.pexels.com/photos/30235391/pexels-photo-30235391.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    price: 1026,
    items: ['decor-scented-candle', 'keep-hair-scrunchie', 'decor-ceramic-mug', 'stat-quote-bookmark'],
    occasion: 'Thank You',
    tags: ['self-care', 'cozy', 'minimal'],
  },
  {
    id: 'cur-long-distance-warmth',
    name: 'The Long-Distance Warmth Box',
    description: 'For someone far away — handwritten letter set, mini photo frame, alphabet keychain, and chocolates.',
    image: 'https://images.pexels.com/photos/9700836/pexels-photo-9700836.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    price: 1006,
    items: ['stat-letter-set', 'stat-photo-frame', 'keep-alphabet-keychain', 'treat-chocolates'],
    occasion: 'Long Distance',
    tags: ['long distance', 'personal', 'warm'],
  },
  {
    id: 'cur-birthday-joy',
    name: 'The Birthday Joy Box',
    description: 'A celebration in a box — friendship bracelet, mini soft toy, sticker sheet, greeting card, and chocolates.',
    image: 'https://images.pexels.com/photos/5485170/pexels-photo-5485170.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    price: 945,
    items: ['keep-friendship-bracelet', 'keep-soft-toy', 'stat-sticker-sheet', 'stat-greeting-card', 'treat-chocolates'],
    occasion: 'Birthday',
    tags: ['birthday', 'playful', 'colorful'],
  },
];

// ─── HELPERS ────────────────────────────────────────────────
export const packagingProducts = products.filter((p) => p.category === 'packaging');
export const nonPackagingProducts = products.filter((p) => p.category !== 'packaging');

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProductsByFilter(filter: FilterCategory): Product[] {
  if (filter === 'all') return nonPackagingProducts;
  return nonPackagingProducts.filter((p) => p.filterCategory === filter);
}

export const allOccasions = ['Birthday', 'Anniversary', 'Long Distance', 'Festive/Diwali', 'Thank You', 'Housewarming', 'Friendship'];
