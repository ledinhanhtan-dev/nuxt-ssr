import Vuex from 'vuex'
import { fetchPosts } from '../data/posts'

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
}

export const actions = {
  async nuxtServerInit(vuexContext, context) {
    const posts = await fetchPosts()
    vuexContext.commit('setPosts', posts)
  },
  setPosts(context, posts) {
    context.commit('setPosts', posts)
  },
}
