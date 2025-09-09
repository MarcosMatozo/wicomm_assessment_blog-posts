import React from 'react'

type Props = {
  name: string
}

function BlogPosts({ name }: Props) {
  return <div>Hey, {name}</div>
}

export default BlogPosts
