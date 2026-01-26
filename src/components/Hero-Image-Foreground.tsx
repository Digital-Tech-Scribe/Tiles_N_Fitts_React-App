export function HeroImageForeground() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <img
        src={`${import.meta.env.BASE_URL}Hero Home/Hero-Image-Foreground.png`}
        alt="Hero foreground house"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
