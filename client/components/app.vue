<template>
  <div class="wrapper">
    <notifications />
  </div>
</template>

<script>
import notifications from "./notifications.vue";

export default {
  components: { notifications }
};
</script>

<style lang="scss">
.wrapper {
  height: 600px;

  background-color: #eff3f6;
  font-family: "Montserrat", sans-serif;
}
</style>
