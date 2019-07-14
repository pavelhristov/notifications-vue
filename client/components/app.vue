<template>
  <div class="wrapper clearfix">
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
  background-color: #eff3f6;
  font-family: "Montserrat", sans-serif;
}
</style>
