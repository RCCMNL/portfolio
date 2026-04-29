import { useEffect } from 'react';

const DEFAULTS = {
  title: 'Emanuele Riccardi | Software Engineer & Full Stack Developer',
  description:
    "Portfolio di Emanuele Riccardi: progetti web, backend engineering, React, Java e soluzioni scalabili.",
  keywords:
    'Emanuele Riccardi, Software Engineer, Full Stack Developer, Backend Developer, Java, Spring Boot, React, Portfolio, Web Developer',
  image: '/profilo.webp',
  type: 'website',
  robots: 'index, follow',
};

const ensureMetaTag = (selector, attributes) => {
  let node = document.head.querySelector(selector);

  if (!node) {
    node = document.createElement('meta');
    document.head.appendChild(node);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    node.setAttribute(key, value);
  });
};

const ensureLinkTag = (selector, attributes) => {
  let node = document.head.querySelector(selector);

  if (!node) {
    node = document.createElement('link');
    document.head.appendChild(node);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    node.setAttribute(key, value);
  });
};

const resolveUrl = (value, origin) => {
  if (!value) return undefined;
  return new URL(value, origin).toString();
};

export const useSEO = ({
  title = DEFAULTS.title,
  description = DEFAULTS.description,
  keywords = DEFAULTS.keywords,
  image = DEFAULTS.image,
  type = DEFAULTS.type,
  path,
  robots = DEFAULTS.robots,
} = {}) => {
  useEffect(() => {
    const origin = window.location.origin;
    const url = resolveUrl(path || `${window.location.pathname}${window.location.search}`, origin);
    const imageUrl = resolveUrl(image, origin);

    document.title = title;

    ensureMetaTag('meta[name="description"]', { name: 'description', content: description });
    ensureMetaTag('meta[name="keywords"]', { name: 'keywords', content: keywords });
    ensureMetaTag('meta[name="robots"]', { name: 'robots', content: robots });
    ensureMetaTag('meta[name="author"]', { name: 'author', content: 'Emanuele Riccardi' });
    ensureMetaTag('meta[name="theme-color"]', { name: 'theme-color', content: '#0f172a' });

    ensureMetaTag('meta[property="og:type"]', { property: 'og:type', content: type });
    ensureMetaTag('meta[property="og:site_name"]', { property: 'og:site_name', content: 'Emanuele Riccardi Portfolio' });
    ensureMetaTag('meta[property="og:locale"]', { property: 'og:locale', content: 'it_IT' });
    ensureMetaTag('meta[property="og:title"]', { property: 'og:title', content: title });
    ensureMetaTag('meta[property="og:description"]', { property: 'og:description', content: description });
    ensureMetaTag('meta[property="og:url"]', { property: 'og:url', content: url });
    ensureMetaTag('meta[property="og:image"]', { property: 'og:image', content: imageUrl });

    ensureMetaTag('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    ensureMetaTag('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    ensureMetaTag('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    ensureMetaTag('meta[name="twitter:image"]', { name: 'twitter:image', content: imageUrl });
    ensureMetaTag('meta[name="twitter:url"]', { name: 'twitter:url', content: url });

    ensureLinkTag('link[rel="canonical"]', { rel: 'canonical', href: url });
  }, [description, image, keywords, path, robots, title, type]);
};
