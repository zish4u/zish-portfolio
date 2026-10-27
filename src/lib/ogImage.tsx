import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { site } from "@/content/site";
import { colors } from "@/lib/tokens";

export const ogSize = { width: 1200, height: 630 };

/** 1200×630 social card: name, title, core stack, accent. */
export function renderOgImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: colors.bg,
        color: colors.text,
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: 28,
          fontWeight: 700,
        }}
      >
        {site.wordmark}
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 88,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          {profile.name}
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 48,
            fontWeight: 700,
            color: colors.accent,
          }}
        >
          {profile.title}
        </div>
        <div style={{ marginTop: 28, fontSize: 30, color: colors.body }}>
          {profile.coreStack.join(" · ")}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          fontSize: 26,
          color: colors.muted,
          borderTop: `1px solid ${colors.border}`,
          paddingTop: 28,
        }}
      >
        <div style={{ width: 12, height: 12, background: colors.success }} />
        {profile.availability}
      </div>
    </div>,
    ogSize,
  );
}
