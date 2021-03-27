<template>
  <div>
    <div class="flex">
      <div class="title">{{ song }}</div>
      <div class="icons">
        <img
          src="http://localhost:3000/icons/previous.svg"
          alt="play"
          height="60"
          width="80"
        /><img
          src="http://localhost:3000/icons/play.svg"
          alt="play"
          height="80"
          width="100"
        /><img
          src="http://localhost:3000/icons/next.svg"
          alt="play"
          height="60"
          width="80"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["cover"],
  computed: {
    song() {
      return this.$store.getters.getCurrSong;
    },
  },
};
</script>
<style scoped>
.flex {
  overflow: hidden;
  max-height: inherit;
  display: flex;
  align-items: center;
  width: 100%;
  height: 15vh;
}
.title {
  width: 300px;
  margin-left: 10px;
}
.icons {
  position: absolute;
  display: flex;
  align-items: center;
  left: 45%;
}
</style>