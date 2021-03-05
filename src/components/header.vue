<template>
  <div class="header">
    <van-nav-bar :title="title" :left-arrow="leftState" @click-left="leftClick">
      <template #right v-if="rightCode != null">
        <van-tag
          :type="
            rightCode === 0 ? 'primary' : rightCode === 1 ? 'success' : 'danger'
          "
        >
          {{
            rightCode === 0
              ? "processing"
              : rightCode === 1
              ? "completed"
              : "over"
          }}
        </van-tag>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    leftState: {
      type: Boolean,
    },
    rightCode: {
      type: Number,
    },
  },
  methods: {
    leftClick(e) {
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style>
</style>