export default function sanityImageLoader({ src, width, quality }) {
  return `${src}?w=${width}&q=${quality || 75}`;
} 