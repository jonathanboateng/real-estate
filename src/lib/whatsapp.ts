export const generateWhatsAppLink = (
  phone: string, 
  propertyTitle: string, 
  location: string, 
  price: number
) => {
  let formattedPhone = phone.trim().replace(/\+/g, '');
  if (formattedPhone.startsWith('0')) {
    formattedPhone = `233${formattedPhone.substring(1)}`;
  }

  const message = `Hello! I saw your property "${propertyTitle}" located at ${location} listed for GHS ${price.toLocaleString()} on the platform. Is it still available? I\'d like more details.`;
  
  return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
};
