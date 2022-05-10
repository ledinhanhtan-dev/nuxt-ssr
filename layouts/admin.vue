<template>
  <div>
    <nuxt />
  </div>
</template>

<script>
export default {
  middleware: 'load-auth',
}
</script>
