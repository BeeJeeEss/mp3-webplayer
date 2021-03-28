<template>
  <div>
    <div class="flex">
      <div class="icons">
        <div class="title">{{ song.title }}</div>
        <div class="center">
          <img
            src="http://localhost:3000/icons/previous.svg"
            alt="play"
            height="50"
            width="70"
          /><img
            id="play"
            v-on:click="play()"
            :src="imgSrc"
            alt="play"
            height="70"
            width="90"
          /><img
            src="http://localhost:3000/icons/next.svg"
            alt="play"
            v-on:click="next(queue)"
            height="50"
            width="70"
          />
        </div>
        <audio id="audioId" controls>
          <source :src="song.path" id="songSrc" type="audio/mp3" />
        </audio>
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
    queue() {
      return this.$store.getters.getFirstData;
    },
  },
  data() {
    return {
      isPlaying: false,
      imgSrc: "http://localhost:3000/icons/play.svg",
    };
  },
  methods: {
    play() {
      let audioItem = document.getElementById("audioId");
      if (this.song.loaded == undefined) {
        audioItem.load();
        this.song.loaded = true;
      }
      if (this.isPlaying) {
        this.imgSrc = "http://localhost:3000/icons/play.svg";
        this.isPlaying = false;
        audioItem.pause();
      } else {
        this.imgSrc = "http://localhost:3000/icons/pause.svg";
        this.isPlaying = true;
        audioItem.play();
      }
    },
    next(item) {
      let songs = [];
      item.files.forEach((element) => {
        let queueItem = { song: element.file, dir: element.dir };
        songs.push(queueItem);
      });
      console.log(songs);
    },
  },
  watch: {
    song: function () {
      this.isPlaying = false;
      this.play();
    },
  },
};
</script>
<style scoped>
.center {
  display: flex;
  align-items: center;
}
.flex {
  overflow: hidden;
  max-height: inherit;
  display: flex;
  align-items: center;
  width: 100%;
  height: 15vh;
}
.title {
  margin-bottom: 15px;
  font-weight: bold;
  font-size: 1.1em;
}
.icons {
  position: absolute;
  display: flex;
  align-items: center;
  left: 45%;
  flex-direction: column;
  justify-content: center;
}
audio {
  display: none;
}
img:hover {
  cursor: pointer;
}
</style>