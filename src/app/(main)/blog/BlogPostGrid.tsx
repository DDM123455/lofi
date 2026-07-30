import Link from 'next/link'
import type { BlogPost } from '@/lib/blogPosts'

interface Props {
  posts: BlogPost[]
}

export function BlogPostGrid({ posts }: Props) {
  const featured = posts[0]
  const rest = posts.slice(1)

  return (
    <>
      {posts.length === 0 && (
        <p className="py-16 text-center text-white/30">No posts in this category yet.</p>
      )}

      {/* Featured post */}
      {featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="group mb-8 flex overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all hover:border-violet-500/40 hover:bg-white/8"
        >
          <div
            className="hidden w-2/5 shrink-0 items-center justify-center text-7xl sm:flex"
            style={{ background: `linear-gradient(135deg, ${featured.coverGradient[0]}, ${featured.coverGradient[1]})` }}
          >
            {featured.emoji}
          </div>
          <div className="flex flex-col justify-center p-6">
            <span className="mb-2 inline-block w-fit rounded-full bg-violet-900/40 px-3 py-0.5 text-xs text-violet-300">
              {featured.category}
            </span>
            <h2 className="text-xl font-bold text-white group-hover:text-violet-300 transition-colors">
              {featured.title}
            </h2>
            <p className="mt-2 text-sm text-white/50 line-clamp-2">{featured.excerpt}</p>
            <div className="mt-4 flex items-center gap-4 text-xs text-white/30">
              <span>{new Date(featured.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
              <span>{featured.readTime} min read</span>
            </div>
          </div>
        </Link>
      )}

      {/* Post grid */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map(post => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all hover:border-violet-500/30 hover:bg-white/8"
            >
              <div
                className="flex h-36 items-center justify-center text-5xl"
                style={{ background: `linear-gradient(135deg, ${post.coverGradient[0]}, ${post.coverGradient[1]})` }}
              >
                {post.emoji}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="mb-2 inline-block w-fit rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-white/50">
                  {post.category}
                </span>
                <h3 className="flex-1 font-semibold text-white group-hover:text-violet-300 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-white/40 line-clamp-2">{post.excerpt}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-white/25">
                  <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  <span>{post.readTime} min read</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
