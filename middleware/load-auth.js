export default context => {
  context.store.dispatch('loadAuth', context.req)
}
