import React from "react";

export default function Image({ fill, sizes: _sizes, priority, style, ...props }) {
  const fillStyle = fill ? { position: "absolute", inset: 0, width: "100%", height: "100%" } : {};
  return (
    <img loading={priority ? "eager" : "lazy"} style={{ ...fillStyle, ...style }} {...props} />
  );
}
