<template>
  <div class="notifications-wrapper">
    <button class="btn" @click="toggleNotifications()">
      Notifications ({{ notifications.length }})
      <span>
        <span class="background"></span>
        <span class="count">{{ notifications.filter(n=> n.type !== 'bonus').length }}</span>
      </span>
    </button>
    <transition name="dropdown">
      <div class="drop-down" v-if="isOpen" v-bind:class="{open: isOpen}">
        <div class="header uppercase">Notifications</div>
        <transition-group name="list" tag="div" class="notifications" v-if="notifications.length>0">
          <notificationItem v-for="n in notifications" :key="n.id" :notificationId="n.id" />
        </transition-group>
        <div v-else class="uppercase no-notifications">there are no notifications</div>
      </div>
    </transition>
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
    notifications: state =>
      state.notifications.all
        .filter(n => !n.expired)
        .sort((a, b) =>
          a.date < b.date || (!a.date && b.date)
            ? 1
            : b.date < a.date || (a.date && !b.date)
            ? -1
            : 0
        ),
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
      color: white;
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
  margin-top: 22px;

  .header {
    background-color: $lightBlue;
    @include border-top-radius(5px);

    color: white;
    font-size: 0.85em;
    letter-spacing: -0.2px;
    padding: 0.9em 1.4rem;

    @include top-beak(11px, $lightBlue, -10px, 30px);
  }

  .notifications {
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 330px;
    background-color: white;
    @include border-bottom-radius(5px);
    padding: 0.5em 1rem;

    .list-enter-active,
    .list-leave-active {
      transition: opacity 1s, transform 0.9s;
    }

    .list-enter {
      opacity: 0;
      transform: translateX(-30px);
    }

    .list-leave-to {
      opacity: 0;
      transform: translateX(30px);
    }
  }

  .no-notifications {
    text-align: center;
    color: $standartGrey;
    font-size: 0.6em;
    padding: 1em;
    background-color: white;
  }
}

.dropdown-enter-active {
  transition: margin 0.6s, opacity 0.6s ease-in-out;
}

.dropdown-leave-active {
  transition: margin 1s, visibility 0.3s, opacity 0.3s ease-in-out;
}

.dropdown-enter,
.dropdown-leave-to {
  opacity: 0;
  margin-top: 0;
}
</style>
