<template>
  <div class="wrapper">
    <div class="nav clearfix">
      <notifications />
    </div>
    <tabs />
  </div>
</template>

<script>
import notifications from "./notifications.vue";
import tabs from "./tabs.vue";

export default {
  components: {
    notifications,
    tabs
  }
};
</script>

<style lang="scss">
.wrapper {
  font-family: "Montserrat", sans-serif;

  .nav {
    background-color: #eff3f6;
  }
}
</style>
