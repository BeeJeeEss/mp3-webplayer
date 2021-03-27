<template>
  <div>
    <div
      class="song"
      v-if="item.file != 'cover.jpg'"
      @mouseover="hover = true"
      @mouseleave="hover = false"
    >
      <span class="subInfo">{{ item.dir }}</span>
      <span class="title">{{ item.file }}</span>
      <span class="subInfo">{{ item.size }}</span>
      <span class="controlBtn" v-if="hover">
        <img
          :src="imgSrc"
          v-on:click="play(audioId, item.file)"
          :id="imgId"
          class="btn"
          alt="play"
          width="24"
          height="24"
        />
      </span>
      <audio :id="audioId" controls>
        <source :src="songSrc" :id="songSrc" type="audio/mp3" />
      </audio>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  data: function () {
    return {
      playing: false,
      hover: false,
      imgSrc: "http://localhost:3000/icons/play.png",
      audioId: this.item.file.replaceAll(" ", "").replaceAll(".", ""),
      songSrc: `http://localhost:3000/${this.item.dir}/${this.item.file}`,
      imgId: toString(this.audioId) + "img",
    };
  },
  methods: {
    play(audio, title) {
      this.$store.commit("SET_CURR_SONG", title);
      let audioItem = document.getElementById(audio);
      if (this.playing) {
        audioItem.pause();
        this.imgSrc = "http://localhost:3000/icons/play.png";
        this.playing = false;
      } else {
        this.imgSrc = "http://localhost:3000/icons/pause.svg";
        this.playing = true;
        console.log(audio);
        audioItem.play();
      }
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
}
.song:hover {
  background: lightblue;
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
audio {
  display: none;
}
.btn {
  margin-right: 10px;
}
</style>