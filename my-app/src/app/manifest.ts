import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Next.js Test Application',
    short_name: 'Next Test App',
    description: 'Демонстрационное приложение с различными методами рендеринга в Next.js',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#667eea',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
    categories: ['education', 'development'],
    lang: 'ru',
    dir: 'ltr',
  };
}

