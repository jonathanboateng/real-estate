'use client';
import { generateWhatsAppLink } from '@/lib/whatsapp';

export default function ContactButtons({ 
  phone, 
  whatsapp, 
  propertyTitle, 
  location, 
  price 
}: any) {
  const waLink = generateWhatsAppLink(whatsapp || phone, propertyTitle, location, price);
  const callLink = `tel:${phone}`;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 pb-safe flex gap-3 md:relative md:border-none md:p-0 z-50 shadow-lg md:shadow-none">
      <a 
        href={callLink}
        className="flex-1 bg-gray-900 text-white flex justify-center items-center py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
      >
        📞 Call Owner
      </a>
      
      <a 
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 bg-green-500 text-white flex justify-center items-center py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
      >
        💬 WhatsApp
      </a>
    </div>
  );
}
