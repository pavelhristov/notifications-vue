<template>
  <div class="wrapper">
    <div class="nav clearfix">
      <notifications />
    </div>
    <div>
      <pushNotification />
    </div>
  </div>
</template>

<script>
import notifications from "./notifications.vue";
import pushNotification from "./push-notification.vue";

export default {
  components: { notifications, pushNotification }
};
</script>

<style lang="scss">
.nav {
  background-color: #eff3f6;
  font-family: "Montserrat", sans-serif;
}
</style>
