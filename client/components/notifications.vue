<template>
  <div class="notifications-wrapper">
    <button class="btn" @click="toggleNotifications()">
      Notifications ({{ notifications.filter(n=> !n.expired).length }})
      <span>
        <span class="background"></span>
        <span class="count">{{ notifications.filter(n=> n.type !== 'bonus' && !n.expired).length }}</span>
      </span>
    </button>
    <div class="drop-down" v-bind:class="{open: isOpen}">
      <div class="header uppercase">Notifications</div>
      <transition-group name="list" tag="div" class="notifications">
        <notificationItem
          v-for="n in notifications.filter(n=> !n.expired)"
          :key="n.id"
          :notificationId="n.id"
        />
      </transition-group>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import notificationItem from "./notification-item.vue";

export default {
  components: {
    notificationItem
  },
  computed: mapState({
    notifications: state => state.notifications.all,
    isOpen: state => state.notifications.isOpen
  }),
  methods: {
    toggleNotifications() {
      this.$store.commit("notifications/toggle");
    }
  },
  created() {
    this.$store.dispatch("notifications/getAllNotifications");
  }
};
</script>

<style lang="scss">
@import "../styles/shared.scss";

.notifications-wrapper {
  padding: 20px 30px;
  float: right;
  position: relative;

  button {
    position: relative;

    span {
      @include abs-top-right;
      color: #fff;
      transform: translate(50%, -50%);
      z-index: 1;

      .background {
        padding: 0.75em;
        border-radius: 50%;
        background-color: #e64d2d;
      }
    }
  }
}

.drop-down {
  position: absolute;
  right: 10px;
  width: 307px;
  border-radius: 5px;
  box-shadow: 2px 3px 5px 0px rgba(0, 0, 0, 0.4);
  @include opening-transition;

  .header {
    background-color: $lightBlue;
    @include border-top-radius(5px);

    color: #fff;
    font-size: 0.85em;
    letter-spacing: -0.2px;
    padding: 0.9em 1.4rem;

    @include top-beak(11px, $lightBlue, -10px, 30px);
  }

  .notifications {
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 330px;
    background-color: #fff;
    @include border-bottom-radius(5px);
    padding: 0.5em 1rem;

    .list-enter-active,
    .list-leave-active {
      transition: opacity 1s, transform 0.9s;
    }

    .list-enter,
    .list-leave-to {
      opacity: 0;
      transform: translateX(30px);
    }
  }
}
</style>
