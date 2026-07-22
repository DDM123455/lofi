import Link from 'next/link'

interface BreadcrumbItem {
  name: string
  url: string
}

function toPath(url: string): string {
  try {
    const { pathname } = new URL(url)
    return pathname || '/'
  } catch {
    return url
  }
}

/**
 * Visible breadcrumb navigation matching the BreadcrumbList JSON-LD schema.
 * Renders the same items passed to <BreadcrumbJsonLd items={...} /> so the
 * structured data always reflects real, visible page content.
 */
export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  if (!items.length) return null

  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-white/40">
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return (
          <span key={item.url} className="flex items-center gap-1.5">
            {index > 0 && <span className="text-white/20">/</span>}
            {isLast ? (
              <span aria-current="page" className="text-white/50">
                {item.name}
              </span>
            ) : (
              <Link href={toPath(item.url)} className="hover:text-violet-300 transition-colors">
                {item.name}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}
