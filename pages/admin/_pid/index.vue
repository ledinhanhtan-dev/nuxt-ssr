<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" @submit="submitEditedPost" />
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
import { POSTS_API } from '@/constants/api'
import AdminPostForm from '@/components/admin/AdminPostForm'
import { jsonClone } from '@/utils'

export default {
  layout: 'admin',
  components: {
    AdminPostForm,
  },
  data() {
    return {
      loadedPost: {},
    }
  },
  created() {
    jsonClone
    this.loadedPost = jsonClone(this.getPostById(this.$route.params.pid))
  },
  async fetch() {
    try {
      const res = await axios.get(`${POSTS_API}/${this.$route.params.pid}.json`)
      this.loadedPost = { ...res.data, updatedDate: new Date().getFullYear() }
    } catch (error) {
      console.log(error)
      this.$router.push('/error')
    }
  },
  methods: {
    ...mapActions(['editPost']),
    submitEditedPost(editedPost) {
      this.editPost({ ...editedPost, id: this.$route.params.pid }).finally(() =>
        this.$router.push('/admin')
      )
    },
  },
  computed: {
    ...mapGetters(['loadedPosts', 'getPostById']),
  },
}
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>
