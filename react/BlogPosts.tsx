import React, { useEffect, useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'

import './css/style.css'

type Post = {
  yoast_head_json: any
  id: number
  link: string
  title: {
    rendered: string
  }
}

const CSS_HANDLES = ['blog_section', 'blog_container', 'blog_li_post', 'blog_inner', 'blog_title', 'blog_desc', 'blog_image', 'blog_link', 'inner_content'] as const

function BlogPosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  const { handles } = useCssHandles(CSS_HANDLES)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('https://blog.amakhaparis.com.br/wp-json/wp/v2/posts')
        const data = await res.json()
        console.log('Data with posts:', data)
        setPosts(data)
      } catch (err) {
        console.error('Error fetching posts:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className={handles.blog_section}>
      <div className={handles.blog_container}>
        {loading ? (
          <p>Carregando posts...</p>
        ) : (
          <ul>
            {posts.slice(0, 3).map(post => (
              <li key={post.id} className={handles.blog_li_post}>
                {/* Image */}
                <img src={post?.yoast_head_json?.og_image?.[0]?.url || ''} alt={post.title.rendered} className={handles.blog_image} />

                <div className={handles.inner_content}>
                    {/* Title */}
                  <h3 className={handles.blog_title}>
                    {post.title.rendered}
                  </h3>

                  {/* Description */}
                  <p className={handles.blog_desc}>
                    {post?.yoast_head_json?.og_description || ''}
                  </p>

                  {/* See more */}
                  <p className={handles.blog_link}>
                    <a href={post?.link || ''} target='_blank' rel='noreferrer'>
                      Leia mais
                    </a>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default BlogPosts