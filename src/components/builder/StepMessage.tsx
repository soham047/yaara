import { motion } from 'framer-motion';
import { Link as LinkIcon } from 'lucide-react';
import { products } from '@/data/products';
import { useHamperStore } from '@/store/hamperStore';

const cardProducts = products.filter(
  (p) =>
    p.id === 'stat-greeting-card' ||
    p.id === 'stat-bengali-postcard' ||
    p.id === 'stat-letter-set' ||
    p.id === 'stat-message-card',
);

const MAX_MESSAGE = 300;

export default function StepMessage() {
  const card = useHamperStore((s) => s.card);
  const setCard = useHamperStore((s) => s.setCard);

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="font-serif text-3xl sm:text-4xl text-espresso">The Personal Touch</h2>
        <p className="mt-2 text-sm text-espresso/60 max-w-md mx-auto">
          Choose a card and pen a message. We'll handwrite it for you. Add a digital memory link for
          an extra touch.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Card selection + form */}
        <div className="space-y-6">
          {/* Card type selection */}
          <div>
            <label className="text-sm font-semibold text-espresso mb-3 block">
              1. Choose a Card
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {cardProducts.map((c) => (
                <motion.button
                  key={c.id}
                  whileHover={{ y: -2 }}
                  onClick={() => setCard({ product: c })}
                  className={`flex flex-col overflow-hidden rounded-xl border-2 text-left transition-all ${
                    card.product?.id === c.id
                      ? 'border-clay shadow-md shadow-clay/10'
                      : 'border-linen hover:border-clay/40'
                  }`}
                >
                  <div className="aspect-square overflow-hidden bg-oat">
                    <img src={c.image} alt={c.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-2">
                    <p className="text-[11px] font-medium text-espresso line-clamp-1">{c.name}</p>
                    <p className="text-[11px] text-clay">₹{c.price}</p>
                  </div>
                </motion.button>
              ))}
            </div>
            <button
              onClick={() => setCard({ product: null })}
              className="mt-2 text-xs text-espresso/50 hover:text-clay underline"
            >
              Skip the card
            </button>
          </div>

          {/* Form fields */}
          {card.product && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-4"
            >
              <div>
                <label className="text-sm font-semibold text-espresso mb-1.5 block">
                  2. Recipient's Name
                </label>
                <input
                  type="text"
                  value={card.recipientName}
                  onChange={(e) => setCard({ recipientName: e.target.value })}
                  placeholder="To whom is this gift?"
                  className="w-full rounded-xl border border-linen bg-white px-4 py-2.5 text-sm text-espresso placeholder:text-espresso/40 focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay/30"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-espresso mb-1.5 block">
                  3. Sender's Name
                </label>
                <input
                  type="text"
                  value={card.senderName}
                  onChange={(e) => setCard({ senderName: e.target.value })}
                  placeholder="Who is this from?"
                  className="w-full rounded-xl border border-linen bg-white px-4 py-2.5 text-sm text-espresso placeholder:text-espresso/40 focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay/30"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-semibold text-espresso">4. Your Message</label>
                  <span
                    className={`text-xs ${
                      card.message.length > MAX_MESSAGE ? 'text-clay' : 'text-espresso/40'
                    }`}
                  >
                    {card.message.length} / {MAX_MESSAGE}
                  </span>
                </div>
                <textarea
                  value={card.message}
                  onChange={(e) =>
                    setCard({ message: e.target.value.slice(0, MAX_MESSAGE) })
                  }
                  rows={4}
                  placeholder="Write from the heart. We'll handwrite it on the card..."
                  className="w-full rounded-xl border border-linen bg-white px-4 py-2.5 text-sm text-espresso placeholder:text-espresso/40 focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay/30 resize-none"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-espresso mb-1.5 block">
                  5. Digital Memory Link <span className="text-espresso/40 font-normal">(optional)</span>
                </label>
                <div className="relative">
                  <LinkIcon
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-espresso/40"
                  />
                  <input
                    type="url"
                    value={card.digitalLink}
                    onChange={(e) => setCard({ digitalLink: e.target.value })}
                    placeholder="Spotify song, Google Drive photo album, YouTube video..."
                    className="w-full rounded-xl border border-linen bg-white py-2.5 pl-9 pr-4 text-sm text-espresso placeholder:text-espresso/40 focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay/30"
                  />
                </div>
                <p className="mt-1 text-xs text-espresso/40">
                  We'll generate an aesthetic QR code on the card linking to this URL.
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right: Live card mockup */}
        <div className="lg:sticky lg:top-24 h-fit">
          <div className="relative aspect-[3/2] rounded-2xl bg-gradient-to-br from-oat via-pearl to-oat border border-linen p-8 shadow-lg shadow-espresso/5 overflow-hidden">
            {/* Decorative corners */}
            <div className="absolute top-3 left-3 h-8 w-8 border-t-2 border-l-2 border-gold/40 rounded-tl-lg" />
            <div className="absolute top-3 right-3 h-8 w-8 border-t-2 border-r-2 border-gold/40 rounded-tr-lg" />
            <div className="absolute bottom-3 left-3 h-8 w-8 border-b-2 border-l-2 border-gold/40 rounded-bl-lg" />
            <div className="absolute bottom-3 right-3 h-8 w-8 border-b-2 border-r-2 border-gold/40 rounded-br-lg" />

            <div className="flex h-full flex-col items-center justify-center text-center">
              {card.product ? (
                <>
                  <p className="font-serif text-xs uppercase tracking-[0.3em] text-gold mb-4">
                    {card.product.name}
                  </p>
                  <div className="flex-1 flex flex-col items-center justify-center">
                    {card.recipientName && (
                      <p className="font-serif text-2xl italic text-espresso mb-3">
                        Dear {card.recipientName},
                      </p>
                    )}
                    <p className="font-serif text-lg leading-relaxed text-espresso/80 max-w-xs">
                      {card.message || (
                        <span className="text-espresso/30 italic">
                          Your handwritten message will appear here...
                        </span>
                      )}
                    </p>
                    {card.senderName && (
                      <p className="font-serif text-lg italic text-espresso mt-4">
                        — {card.senderName}
                      </p>
                    )}
                  </div>
                  {card.digitalLink && (
                    <div className="mt-4 flex items-center gap-2 rounded-full bg-gold/10 px-3 py-1">
                      <div className="h-8 w-8 rounded bg-espresso/80 grid grid-cols-3 grid-rows-3 gap-0.5 p-1">
                        {Array.from({ length: 9 }).map((_, i) => (
                          <div
                            key={i}
                            className={`rounded-[1px] ${
                              [0, 2, 3, 4, 5, 6, 8].includes(i)
                                ? 'bg-pearl'
                                : 'bg-espresso/80'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-espresso/60">Scan for memory</span>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center text-espresso/30">
                  <p className="font-serif text-xl italic">No card selected</p>
                  <p className="text-xs mt-1">Choose a card to see your message preview</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
