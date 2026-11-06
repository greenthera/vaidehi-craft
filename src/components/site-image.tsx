import Image, { type ImageProps } from "next/image";
import { assetPath } from "@/lib/site-path";

export default function SiteImage(props: ImageProps) {
  return <Image {...props} alt={props.alt} src={typeof props.src === "string" ? assetPath(props.src) : props.src} />;
}
