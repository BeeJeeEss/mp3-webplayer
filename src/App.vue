<template>
  <div class="flex">
    <div class="covers">
      <Cover v-for="datum in data.dirs" :key="datum" :cover="datum"></Cover>
    </div>
    <div class="titles">
      <h1>mp3 player</h1>
      <Item v-for="datum in data.files" :key="datum.file" :item="datum"></Item>
    </div>
  </div>
</template>

<script>
import Cover from "./components/Cover.vue";
import Item from "./components/Item.vue";
export default {
  components: { Cover, Item },
  mounted() {
    this.$store.dispatch("getFirstDataAction");
  },
  computed: {
    data() {
      return this.$store.getters.getFirstData;
    },
  },
};
</script>

<style scoped>
* {
  margin: 0 !important;
}
.covers {
  float: left;
  width: 300px;
  height: 100vh;
  overflow-x: auto;
}
.titles {
  width: 100%;
  height: 100vh;
  background: rgb(219, 246, 255);
  text-align: center;
}
</style>