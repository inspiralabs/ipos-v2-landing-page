import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://inspirapos.biz.id';
  const routes = ['', '/demo', '/kontak', '/produk/offline', '/produk/umkm', '/produk/fnb'];
  return routes.map((r) => ({ url: `${base}${r}`, lastModified: new Date(), changeFrequency: 'weekly', priority: r === '' ? 1 : 0.8 }));
}
