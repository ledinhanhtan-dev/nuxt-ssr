import axios from 'axios'
import { POSTS_API } from '../constants/api'

export const state = () => ({
  posts: [],
})

export const getters = {
  loadedPosts(state) {
    return state.posts
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

    return axios
      .get(`${POSTS_API}.json`)
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
  addPost(context, newPost) {
    context.commit('addPost', newPost)
  },
  editPost(context, editedPost) {
    context.commit('editPost', editedPost)
  },
}
