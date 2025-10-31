export default function Card({
  title,
  subtitle,
  children,
  className = "",
  variant = "solid", // "solid" | "glass"
  hover = true,
}) {
  const base =
    "relative h-full flex flex-col rounded-2xl p-6 pb-24 shadow-sm transition-transform duration-200";
  const variants = {
    solid: "bg-white border border-slate-200",
    glass: "bg-white/15 border border-white/30 ring-1 ring-white/20 backdrop-blur-xl",
  };
  const hoverFx = hover ? "hover:-translate-y-1" : "";

  const isGlass = variant === "glass";
  const titleCls = isGlass ? "text-white/95" : "text-slate-900";
  const subCls   = isGlass ? "text-white/80" : "text-slate-600";
  // Removed bodyCls to prevent interference with child styles

  return (
    <div className={`${base} ${variants[variant]} ${hoverFx} ${className}`}>
      {title && <h3 className={`text-lg font-semibold ${titleCls}`}>{title}</h3>}
      {subtitle && <p className={`mt-1 ${subCls}`}>{subtitle}</p>}
      {/* Removed text color class from children wrapper to allow child components to control their own styling */}
      <div className="mt-3 flex-1">{children}</div>
    </div>
  );
}