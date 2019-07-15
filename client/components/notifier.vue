<template>
  <span class="notifier" :class="notifier.status">{{ notifier.message }}</span>
</template>

<script>
export default {
  props: ["bus"],
  data() {
    return {
      notifier: {
        message: "",
        status: ""
      }
    };
  },
  methods: {
    notify(message, status, duration) {
      if (this.notifier.timer) {
        clearTimeout(this.notifier.timer);
        this.notifier.timer = 0;
      }

      this.notifier.message = message || "";
      this.notifier.status = status || "";
      if (duration && Number.isInteger(+duration)) {
        this.notifier.timer = setTimeout(() => {
          this.notifier.message = "";
          this.notifier.status = "";
        }, duration);
      }
    }
  },
  mounted() {
    let _this = this;
    this.bus.$on("notify", function() {
      if (arguments) {
        _this.notify(...arguments);
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.notifier {
  &.danger {
    color: red;
  }

  &.warning{
    color: orange;
  }

  &.success {
    color: green;
  }
}
</style>