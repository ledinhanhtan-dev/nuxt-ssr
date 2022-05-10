export const state = () => ({
  posts: [],
})

export const getters = {
  loadedPosts(state) {
    return state.posts
  },
  getPostById: state => postId => {
    return state.posts.find(post => post.id === postId)
  },
}

export const mutations = {
  setPosts(state, posts) {
    state.posts = posts
  },
  addPost(state, newPost) {
    state.posts.push(newPost)
  },
  editPost(state, editedPost) {
    const index = state.posts.findIndex(post => post.id === editedPost.id)
    state.posts[index] = editedPost
  },
}

export const actions = {
  nuxtServerInit(vuexContext, context) {
    const transformResponse = data =>
      Object.entries(data).map(entry => ({
        id: entry[0],
        ...entry[1],
      }))

    return context.app.$axios
      .get(`${process.env.postUrl}.json`)
      .then(res =>
        vuexContext.commit(
          'setPosts',
          res.data ? transformResponse(res.data) : []
        )
      )
      .catch(e => context.error(e))
  },
  setPosts(context, posts) {
    context.commit('setPosts', posts)
  },
  addPost(context, postData) {
    return this.$axios
      .post(`${process.env.postUrl}.json`, postData)
      .then(res =>
        context.commit('addPost', { ...postData, id: res.data.name })
      )
      .catch(e => console.log(e))
  },
  editPost(context, editedPost) {
    return this.$axios
      .put(`${process.env.postUrl}/${editedPost.id}.json`, editedPost)
      .then(() =>
        context.commit('editPost', { ...editedPost, id: editedPost.id })
      )
      .catch(e => console.log(e))
  },
}
