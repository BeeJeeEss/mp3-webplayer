<template>
  <div>
    <div class="song" v-if="item.file != 'cover.jpg'">
      <span class="subInfo">{{ item.dir }}</span>
      <span class="title">{{ item.file }}</span>
      <span class="subInfo">{{ item.size }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
};
</script>

<style scoped>
.song {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 15px;
}

.subInfo {
  color: gray;
  width: 30%;
}
.title {
  font-weight: bold;
  font-size: 1.5em;
  width: 40%;
  color: blue;
  text-align: left;
}
</style>