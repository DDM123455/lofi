import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'LofiSpace — Free Online Study Room',
    short_name: 'LofiSpace',
    description: 'Free online study room with lofi music, ambient sounds, Pomodoro timer and XP system.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0d0d14',
    theme_color: '#7c3aed',
    icons: [
      { src: '/logo.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
