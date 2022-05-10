import cookie from 'js-cookie'

export const state = () => ({
  posts: [],
  token: null,
})

export const getters = {
  loadedPosts(state) {
    return state.posts
  },
  getPostById: state => postId => {
    return state.posts.find(post => post.id === postId)
  },
  isAuth(state) {
    return !!state.token
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
  setAuth(state, token) {
    state.token = token
  },
  clearToken(state) {
    state.token = null
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
      .post(`${process.env.postUrl}.json?auth=${context.state.token}`, postData)
      .then(res =>
        context.commit('addPost', { ...postData, id: res.data.name })
      )
      .catch(e => console.log(e))
  },
  editPost(context, editedPost) {
    return this.$axios
      .put(
        `${process.env.postUrl}/${editedPost.id}.json?auth=${context.state.token}`,
        editedPost
      )
      .then(() =>
        context.commit('editPost', { ...editedPost, id: editedPost.id })
      )
      .catch(e => console.log(e))
  },
  authenticateUser(context, { isLogin, authData }) {
    const url = isLogin
      ? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
      : 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='

    return this.$axios
      .post(`${url}${process.env.fbAPIkey}`, authData)
      .then(res => {
        const { idToken: token, expiresIn } = res.data
        const expirationDate = new Date().getTime() + expiresIn * 1000

        context.commit('setAuth', token)
        context.dispatch('setAutoLogout', expiresIn * 1000)

        localStorage.setItem('token', token)
        localStorage.setItem('expirationDate', expirationDate)

        cookie.set('jwt', token)
        cookie.set('expirationDate', expirationDate)
      })
      .catch(e => console.log(e))
  },
  loadAuth(context, req) {
    if (req) {
      if (!req.headers.cookie) return
      const jwtCookie = req.headers.cookie
        .split(';')
        .find(c => c.trim().startsWith('jwt='))
      const jwtExpirationDate = req.headers.cookie
        .split(';')
        .find(c => c.trim().startsWith('expirationDate='))

      if (!jwtCookie || !jwtExpirationDate) return

      const token = jwtCookie.split('=')[1]
      const expirationDate = jwtExpirationDate.split('=')[1]
      context.commit('setAuth', token)
    } else {
      if (process.server) return
      const token = localStorage.getItem('token')
      const expirationDate = localStorage.getItem('expirationDate')
      if (!token || !expirationDate || new Date() > +expirationDate) return
      context.commit('setAuth', token)
    }
  },
  setAutoLogout(context, duration) {
    setTimeout(() => context.commit('clearToken'), duration)
  },
}
