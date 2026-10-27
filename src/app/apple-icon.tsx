import { ImageResponse } from "next/og";
import { colors } from "@/lib/tokens";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Same "Z" mark as icon.svg; iOS rounds the corners itself.
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: colors.surface,
      }}
    >
      <svg width="120" height="120" viewBox="0 0 32 32">
        <path
          d="M10.5 10.5h11l-11 11h11"
          fill="none"
          stroke={colors.accent}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>,
    size,
  );
}
