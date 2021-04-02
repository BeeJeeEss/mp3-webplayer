<template>
  <div>
    <div class="flex">
      <div class="covers">
        <cover v-for="datum in data.dirs" :key="datum" :cover="datum"></cover>
      </div>
      <div class="titles">
        <h1>{{ header }}</h1>
        <div class="item">
          <img
            @click="playlist()"
            id="img"
            :src="src"
            width="32"
            height="32"
            alt=""
          />
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
    src() {
      return this.$store.getters.getPlaySrc;
    },
    header() {
      return this.$store.getters.getHeader;
    },
  },
  methods: {
    playlist() {
      if (!this.$store.getters.getIn) {
        this.$store.dispatch("getPlaylistAction");
        this.$store.commit("SET_IN", true);
        this.$store.commit("SET_SRC", "http://localhost:3000/icons/close.svg");
        this.$store.commit("SET_HEADER", "playlist");
      } else {
        this.$store.dispatch("getFirstDataAction");
        this.$store.commit("SET_IN", false);
        this.$store.commit(
          "SET_SRC",
          "http://localhost:3000/icons/playlist.svg"
        );
        this.$store.commit("SET_HEADER", "mp3 player");
      }
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
}
img {
  margin-top: 10px !important;
}
img:hover {
  cursor: pointer;
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