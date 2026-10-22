// ════════════════════════════════════════════════════════════
//  WHATSAPP MESSAGE ROUTING ENGINE
// ════════════════════════════════════════════════════════════

export interface HamperOrderData {
  orderId: string;
  container: { name: string; price: number };
  items: Array<{ name: string; quantity: number; price: number }>;
  card: { name: string; message: string; from: string; to: string; digitalLink?: string };
  customer: {
    senderName: string;
    senderPhone: string;
    recipientName: string;
    deliveryAddress: string;
    city: string;
    pincode: string;
    deliveryDatePreference?: string;
    specialInstructions?: string;
  };
  totalPrice: number;
}

export function generateWhatsAppOrderUrl(order: HamperOrderData, businessNumber: string): string {
  const itemList = order.items
    .map((item, idx) => `  ${idx + 1}. ${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}`)
    .join('\n');

  const rawMessage = `
🎁 *NEW CUSTOM HAMPER ORDER #${order.orderId}*
━━━━━━━━━━━━━━━━━━━━━

📦 *PACKAGING BASE:*
• ${order.container.name} (₹${order.container.price})

🎀 *CURATED CONTENTS:*
${itemList}

💌 *PERSONALIZED MESSAGE:*
• *Card:* ${order.card.name}
• *To:* ${order.card.to}
• *From:* ${order.card.from}
• *Message:* "${order.card.message}"
${order.card.digitalLink ? `• *Digital Memory Link:* ${order.card.digitalLink}` : ''}

💰 *TOTAL HAMPER VALUE:* ₹${order.totalPrice}
_(Excluding courier charges)_

━━━━━━━━━━━━━━━━━━━━━
📍 *DELIVERY DETAILS:*
• *Recipient Name:* ${order.customer.recipientName}
• *Sender Name:* ${order.customer.senderName} (${order.customer.senderPhone})
• *Address:* ${order.customer.deliveryAddress}
• *City & PIN:* ${order.customer.city} - ${order.customer.pincode}
${order.customer.deliveryDatePreference ? `• *Target Delivery Date:* ${order.customer.deliveryDatePreference}` : ''} ${order.customer.specialInstructions ? `• *Note:* ${order.customer.specialInstructions}` : ''}
━━━━━━━━━━━━━━━━━━━━━
_Please confirm product availability, shipping fee, and provide the UPI payment link._
`.trim();

  return `https://wa.me/${businessNumber}?text=${encodeURIComponent(rawMessage)}`;
}

export function generateCuratedOrderUrl(
  hamperName: string,
  hamperPrice: number,
  items: string[],
  businessNumber: string,
): string {
  const itemList = items.map((item, idx) => `  ${idx + 1}. ${item}`).join('\n');
  const rawMessage = `
🎁 *NEW ORDER — ${hamperName}*
━━━━━━━━━━━━━━━━━━━━━

🎀 *CONTENTS:*
${itemList}

💰 *PRICE:* ₹${hamperPrice}
_(Excluding courier charges)_

━━━━━━━━━━━━━━━━━━━━━
_Please confirm availability, shipping fee, and provide the UPI payment link._
`.trim();

  return `https://wa.me/${businessNumber}?text=${encodeURIComponent(rawMessage)}`;
}

export function generateCorporateInquiryUrl(
  quantity: number,
  budgetPerHamper: number,
  notes: string,
  businessNumber: string,
): string {
  const totalEstimate = quantity * budgetPerHamper;
  const rawMessage = `
🏢 *CORPORATE BULK GIFTING INQUIRY*
━━━━━━━━━━━━━━━━━━━━━

📊 *Estimated Quantity:* ${quantity} hampers
💰 *Budget per Hamper:* ₹${budgetPerHamper}
💵 *Estimated Total:* ₹${totalEstimate.toLocaleString('en-IN')}

📝 *Notes:* ${notes || 'No additional notes'}

━━━━━━━━━━━━━━━━━━━━━
_I'd like to discuss custom branding, packaging options, and delivery timelines for our team._
`.trim();

  return `https://wa.me/${businessNumber}?text=${encodeURIComponent(rawMessage)}`;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return true;
    } catch {
      return false;
    }
  }
}

export function generateOrderId(): string {
  const date = new Date();
  const stamp = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `YR-${stamp}-${rand}`;
}
