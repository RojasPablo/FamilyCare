import React from "react";

const Gradient = ({
  direction = "to bottom",
  variant = "green",
  fromColor,
  middleColor,
  toColor,
  opacity = 1,
  className = "",
  children,
}) => {
  // Color presets based on variant
  const colorPresets = {
    green: {
      from: "#dfd8d8",
      middle: "#cbd8bd",
      to: "#dfd8d8",
    },
    blue: {
      from: "#dfd8d8",
      middle: "#b5d7ea",
      to: "#dfd8d8",
    },
  };

  const preset = colorPresets[variant] || colorPresets.green;

  const gradientStyle = {
    background: `linear-gradient(${direction}, ${fromColor || preset.from}, ${
      middleColor || preset.middle
    }, ${toColor || preset.to})`,
    opacity: opacity,
  };

  return (
    <div className={`w-full h-full ${className}`} style={gradientStyle}>
      {children}
    </div>
  );
};

export default Gradient;
