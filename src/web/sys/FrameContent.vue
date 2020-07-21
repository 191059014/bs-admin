<template>
  <iframe id="contentIFrameId" :src="singleMenuData.url" width="100%"
          :height="iframeHeight" frameborder="no" scrolling="auto"></iframe>
</template>

<script>
  export default {
    name: "FrameContent",
    data() {
      return {}
    },
    methods: {},
    mounted() {

    },
    props: ['singleMenuData', 'iframeHeight'] // 接受父页面传过来的单个菜单信息，和iframe初始化高度
  }
</script>

<style scoped>

</style>
