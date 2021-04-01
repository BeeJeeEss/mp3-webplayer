<template>
  <div>
    <div class="flex">
      <div class="icons">
        <div class="center">
          <div class="title">{{ song.title }}</div>
          <div class="elapsed">
            <div class="time" id="update">00:00</div>
            <input type="range" id="elapsed" value="0" min="0" />
            <div class="time" id="duration">00:00</div>
          </div>
          <div class="controls">
            <img
              src="http://localhost:3000/icons/previous.svg"
              alt="play"
              id="prev"
              v-on:click="change(queue, 0)"
              height="40"
              width="20"
            /><img
              id="play"
              v-on:click="play()"
              :src="imgSrc"
              alt="play"
              height="50"
              width="90"
            /><img
              id="next"
              src="http://localhost:3000/icons/next.svg"
              alt="play"
              v-on:click="change(queue, 1)"
              height="40"
              width="20"
            />
          </div>
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
      songDuration: "",
    };
  },
  methods: {
    play() {
      let audioItem = document.getElementById("audioId");
      let progressBar = document.getElementById("elapsed");
      if (this.song.loaded == undefined) {
        audioItem.load();
        this.song.loaded = true;
        audioItem.onloadeddata = function () {
          var minutes = parseInt(audioItem.duration / 60, 10);
          var seconds = parseInt(audioItem.duration % 60);
          if (minutes < 10) minutes = "0" + minutes;
          if (seconds < 10) seconds = "0" + seconds;
          this.songDuration = `${minutes}:${seconds}`;
          document.getElementById("duration").innerText = this.songDuration;
          progressBar.setAttribute("max", audioItem.duration);
          audioItem.ontimeupdate = () => {
            let s = parseInt(audioItem.currentTime % 60);
            let m = parseInt((audioItem.currentTime / 60) % 60);
            if (s < 10) s = "0" + s;
            if (m < 10) m = "0" + m;
            this.timeUpdate = `${m}:${s}`;
            document.getElementById("update").innerText = this.timeUpdate;
            progressBar.value = audioItem.currentTime;
            progressBar.addEventListener("input", () => {
              audioItem.currentTime = progressBar.value;
            });
          };
        };
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
  flex-direction: column;
  justify-content: center;
}
.flex {
  overflow: hidden;
  max-height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 150px;
}
.elapsed {
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: baseline;
  height: 15px;
  margin-bottom: 20px;
}
.controls {
  display: flex;
  align-items: center;
  justify-content: center;
}
.title {
  font-weight: bold;
  font-size: 1.1em;
  float: left;
  height: 15px;
  padding: 5px;
}
.time {
  align-self: center;
  margin: 10px;
  float: left;
}
.icons {
  display: flex;
  align-items: center;
  width: 100%;
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

/*Chrome*/
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  input[type="range"] {
    overflow: hidden;
    -webkit-appearance: none;
    background-color: lightblue;
    width: 500px;
    border-radius: 15px;
    margin-bottom: 10px;
  }

  input[type="range"]:hover {
    background: lightcoral;
  }

  input[type="range"]::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    margin-top: -1px;
    width: 400px;
  }
}
/**FF*/
input[type="range"]::-moz-range-progress {
  background-color: pink;
}
input[type="range"]::-moz-range-track {
  background-color: lightblue;
}
</style>