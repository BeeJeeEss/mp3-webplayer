<template>
  <div>
    <div class="flex">
      <div class="covers">
        <cover v-for="datum in data.dirs" :key="datum" :cover="datum"></cover>
      </div>
      <div class="titles">
        <h1>mp3 player</h1>
        <div class="item">
          <item
            v-for="datum in data.files"
            :key="datum.file"
            :item="datum"
          ></item>
        </div>
      </div>
      <div class="controls">
        <controls></controls>
      </div>
    </div>
  </div>
</template>

<script>
import Cover from "./components/Cover.vue";
import Item from "./components/Item.vue";
import Controls from "./components/Controls.vue";
export default {
  components: { Cover, Item, Controls },
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
  height: 85vh;
  overflow-x: auto;
}
.titles {
  width: 100%;
  height: 85vh;
  background: rgb(219, 246, 255);
  text-align: center;
}
.item {
  height: 80vh;
  overflow-x: auto;
}
.controls {
  width: 100%;
  background: lightblue;
}
</style>
<style>
body {
  overflow: hidden;
}
</style>