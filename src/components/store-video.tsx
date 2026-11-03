export function StoreVideo({ src = "/media/canearth15-store-tour.mp4", poster = "/images/canearth15-store-video-poster.webp", label = "A tour of the Canearth15 pop-up store" }: { src?: string; poster?: string; label?: string }) {
  return (
    <div className="relative h-full min-w-0 [min-height:inherit] bg-[#dcc7b3]">
      <video autoPlay muted loop playsInline controls={false} disablePictureInPicture disableRemotePlayback preload="metadata" poster={poster} aria-label={label} className="pointer-events-none absolute inset-0 h-full w-full object-cover">
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
