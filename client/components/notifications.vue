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
        <div v-for="notification in notifications.filter(n=> !n.expired)" :key="notification.id">
          <div>
            <span v-if="!notification.seen" class="uppercase">new</span>
          </div>
          <div class="notification-content">
            <div>
              <img v-if="notification.image" :src="notification.image" />
            </div>
            <div>
              <a v-if="notification.link" :href="notification.link">{{ notification.title }}</a>
              <span v-else class="title">{{ notification.title }}</span>
              <span v-if="notification.text">{{ notification.text }}</span>
              <span v-if="notification.requirement">{{ notification.text }}</span>
            </div>
          </div>
          <div>
            <span v-if="notification.expires">{{ notification.expires }}</span>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
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
  padding: 10px 30px;
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
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

    color: #fff;
    font-size: 0.85em;
    letter-spacing: -0.2px;
    padding: 0.9em 1.4rem;

    @include top-beak(11px, $lightBlue, -10px, 30px);
  }

  .notifications {
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 320px;
    background-color: #fff;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    padding: 5px 17px;

    > div {
      border-bottom: 1px solid #eee;
      &:last-child {
        border-bottom: none;
      }

      > div:first-child {
        text-align: right;
        height: 23px;
        > span {
          margin-top: 8px;
          display: inline-block;
          font-size: 0.5em;
          padding: 2px 9px;
          color: #fff;
          background-color: #8ac640;
          border-radius: 5px;
        }
      }

      .notification-content {
        display: flex;

        > div:first-child {
          flex: 1;
          img {
            max-width: 40px;
            max-height: 40px;
            border-radius: 50%;
          }
        }

        > div:last-child {
          flex: 3;
          font-size: 0.7rem;
          padding: 5px 21px 5px 16px;
          letter-spacing: 0.3px;
          color: #888;

          .title {
            color: #000;
          }
        }
      }

      > div:last-child {
        text-align: right;
        font-size: 0.75rem;
      }
    }

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
