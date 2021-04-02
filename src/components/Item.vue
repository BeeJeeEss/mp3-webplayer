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
      <span class="icon" v-if="!inState">
        <img
          src="http://localhost:3000/icons/heart.svg"
          width="24"
          alt="<3"
          @click="add(item.dir, item.file)"
        />
      </span>
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
    add(dir, file) {
      let obj = {
        dir,
        file,
      };
      this.$store.commit("SET_SONG_PLAYLIST", obj);
      this.$store.dispatch("sendSong");
      alert("Dodano do playlisty");
    },
  },
  computed: {
    song() {
      return this.$store.getters.getCurrSong;
    },
    album() {
      return this.$store.getters.getFirstData;
    },
    inState() {
      return this.$store.getters.getIn;
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
.icon {
  margin-right: 10px;
}
</style>