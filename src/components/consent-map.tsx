export function ConsentMap({ city, address }: { city: string; address: string }) {
  return <iframe title={`Vaidehi Craft ${city} store location`} src={`https://www.google.com/maps?q=${encodeURIComponent(`Vaidehi Craft, ${address}`)}&output=embed`} width="400" height="200" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen className="mt-4 h-[200px] w-full border-0" />;
}
