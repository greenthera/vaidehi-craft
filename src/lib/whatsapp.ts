export function whatsappLink(phone: string) {
  return `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent("Hi, I would like to know more about Vaidehi Craft.")}`;
}
export const whatsappUrl = whatsappLink("+919824177913");
