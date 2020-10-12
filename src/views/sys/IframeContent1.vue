<template>
  <iframe id="iframe1_id" :src="$route.query.src" width="100%" height="500px"></iframe>
</template>

<script>
  export default {
    name: 'IframeContent1',
    created() {
      let iframe = document.getElementById("iframe1_id");
      let clientHeight = document.documentElement.offsetHeight;
    }
  }

</script>

<style scoped>

</style>

