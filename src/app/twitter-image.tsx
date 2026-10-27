import { site } from "@/content/site";
import { ogSize, renderOgImage } from "@/lib/ogImage";

export const alt = site.seo.ogAlt;
export const size = ogSize;
export const contentType = "image/png";

export default function TwitterImage() {
  return renderOgImage();
}
