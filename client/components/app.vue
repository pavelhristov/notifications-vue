<template>
  <div class="wrapper">
    <div class="nav clearfix">
      <notifications />
    </div>
    <div>
      <push-notification />
      <delete-notification />
      <update-notification />
    </div>
  </div>
</template>

<script>
import notifications from "./notifications.vue";
import pushNotification from "./push-notification.vue";
import deleteNotification from "./delete-notification.vue";
import updateNotification from "./update-notification.vue";

export default {
  components: {
    notifications,
    "push-notification": pushNotification,
    "delete-notification": deleteNotification,
    "update-notification": updateNotification
  }
};
</script>

<style lang="scss">
.nav {
  background-color: #eff3f6;
  font-family: "Montserrat", sans-serif;
}
</style>
