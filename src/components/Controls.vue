<template>
  <div>
    <div class="flex">
      <div class="icons">
        <div class="title">{{ song.title }}</div>
        <div class="center">
          <img
            src="http://localhost:3000/icons/previous.svg"
            alt="play"
            id="prev"
            v-on:click="change(queue, 0)"
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
            id="next"
            src="http://localhost:3000/icons/next.svg"
            alt="play"
            v-on:click="change(queue, 1)"
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
    change(item, direction) {
      let songs = [];
      let playingSong = {
        song: this.song.title,
        dir: this.song.dir,
      };
      item.files.forEach((element) => {
        if (element.file != "cover.jpg") {
          let queueItem = { song: element.file, dir: element.dir };
          songs.push(queueItem);
        }
      });
      songs.forEach((element) => {
        if (element.song == playingSong.song) {
          let currIndex = songs.indexOf(element);
          let nextIndex = currIndex + 1;
          let prevIndex = currIndex - 1;
          if (direction) {
            if (songs[nextIndex] != undefined) {
              console.log(songs[nextIndex].song);
              let obj = {
                title: songs[nextIndex].song,
                dir: songs[nextIndex].dir,
              };
              this.$store.commit("SET_CURR_SONG", obj);
            }
          } else {
            if (songs[prevIndex] != undefined) {
              let obj = {
                title: songs[prevIndex].song,
                dir: songs[prevIndex].dir,
              };
              this.$store.commit("SET_CURR_SONG", obj);
            }
          }
        }
      });
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
  width: 150px;
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
.hidden {
  visibility: hidden;
}
</style>