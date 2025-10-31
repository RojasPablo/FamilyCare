import { useState } from "react";

export default function ImageWithFallback({
  src,
  alt,
  className = "",
  fallback = "/placeholder.jpg"
}) {
  const [error, setError] = useState(false);
  return (
    <img
      src={error ? fallback : src}
      alt={alt}
      onError={() => setError(true)}
      className={className}
      loading="lazy"
      decoding="async"
    />
  );
}
