<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
      <AdminPostForm @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
import AdminPostForm from '@/components/Admin/AdminPostForm'

export default {
  layout: 'admin',
  components: {
    AdminPostForm,
  },
  methods: {
    ...mapActions(['addPost']),
    onSubmitted(postData) {
      axios
        .post(
          'https://nuxt-ssr-0-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
          postData
        )
        .then(res => console.log(res.data))
        .catch(e => console.log(e))
    },
  },
}
</script>

<style scoped>
.new-post-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .new-post-form {
    width: 500px;
  }
}
</style>
