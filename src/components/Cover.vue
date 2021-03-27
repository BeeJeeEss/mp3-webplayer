<template>
  <div>
    <img
      v-if="cover != 'icons'"
      :src="imageUrl"
      :alt="cover"
      @click="getSongs(cover)"
    />
  </div>
</template>
<script>
export default {
  props: ["cover"],
  data: function () {
    return {
      imageUrl: `http://localhost:3000/${this.cover}/cover.jpg`,
    };
  },

  methods: {
    getSongs(cover) {
      this.$store.commit("SET_COVER", cover);
      this.$store.dispatch("nextAction");
    },
  },
};
</script>
