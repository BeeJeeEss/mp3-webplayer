<template>
  <div>
    <div
      class="song"
      v-if="item.file != 'cover.jpg'"
      v-on:click="play(item.file, item.dir)"
      v-bind:class="{ playing: item.file == song.title }"
    >
      <span class="subInfo">{{ item.dir }}</span>
      <span class="title">{{ item.file }}</span>
      <span class="subInfo">{{ item.size }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  methods: {
    play(title, dir) {
      let obj = {
        title,
        dir,
      };
      this.$store.commit("SET_CURR_SONG", obj);
    },
  },
  computed: {
    song() {
      return this.$store.getters.getCurrSong;
    },
    album() {
      return this.$store.getters.getFirstData;
    },
  },
};
</script>

<style scoped>
.song {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 15px;
  padding: 5px;
  height: 50px;
}
.song:hover {
  background: lightblue;
  cursor: pointer;
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
.playing {
  background: pink !important;
}
</style>