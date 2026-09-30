import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'LofiSpace — Free Online Study Room',
    short_name: 'LofiSpace',
    description: 'Free online study room with lofi music, ambient sounds, Pomodoro timer and XP system.',
    start_url: '/workspace?utm_source=pwa',
    scope: '/',
    display: 'standalone',
    orientation: 'any',
    background_color: '#0d0d14',
    theme_color: '#7c3aed',
    categories: ['productivity', 'music', 'education', 'lifestyle'],
    icons: [
      { src: '/logo.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/logo.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/logo.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
    shortcuts: [
      { name: 'Start a focus session', short_name: 'Focus', url: '/workspace?pom=1&utm_source=pwa' },
      { name: 'Focus dashboard', short_name: 'Dashboard', url: '/dashboard?utm_source=pwa' },
    ],
  }
}
