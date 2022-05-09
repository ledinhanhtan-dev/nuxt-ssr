const POSTS = [
  {
    id: '1',
    title: 'First Post',
    previewText: 'This is our first post!',
    thumbnail:
      'https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg',
    updatedDate: new Date(),
    author: 'Gentek',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: '2',
    title: 'Second Post',
    previewText: 'This is our second post!',
    thumbnail:
      'https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg',
    updatedDate: new Date(),
    author: 'Tenka',
    content:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
]

export const fetchPosts = (pid = null) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = pid ? POSTS.find((post) => post.id === pid) : POSTS
      if (result) resolve(result)
      else reject()
    }, 1000)
  })
}
