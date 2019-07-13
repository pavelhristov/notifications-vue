<template>
  <div class="notifications-wrapper">
    <button class="btn" @click="toggleNotifications()">
      Notifications ({{ notifications.filter(n=> !n.expired).length }})
      <span>
        <span class="background"></span>
        <span class="count">{{ notifications.filter(n=> n.type === 'bonus' && !n.expired).length }}</span>
      </span>
    </button>
    <div class="drop-down" v-bind:class="{open: isOpen}">
      <div class="header">Notifications</div>
      <div class="notifications">
        <div v-for="notification in notifications.filter(n=> !n.expired)" :key="notification.id">
          <div>
            <span v-if="!notification.seen">new</span>
          </div>
          <div class="notification-content">
            <div>
              <img v-if="notification.image" :src="notification.image" />
            </div>
            <div>
              <span v-if="notification.link && notification.title">
                <a href="https://www.google.com/">{{ notification.title }}</a>
              </span>
              <span v-else-if="notification.title">{{ notification.title }}</span>
              <span v-if="notification.text">{{ notification.text }}</span>
              <span v-if="notification.requirement">{{ notification.text }}</span>
            </div>
          </div>
          <div>
            <span v-if="notification.expires">{{ notification.expires }}</span>
          </div>
        </div>
      </div>
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
@import "../styles/variables.scss";

.notifications-wrapper {
  padding: 10px 30px;
  float: right;
  position: relative;

  button {
    position: relative;

    span {
      position: absolute;
      top: 0;
      right: 0;
      color: #fff;
      transform: translate(50%, -50%);
      z-index: 1;

      .background {
        padding: 11px;
        border-radius: 50%;
        background-color: #e64d2d;
      }

      .count {
        margin-top: -1px;
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

  transition: margin 1s, visibility 0.2s, opacity 0.2s ease-in-out;
  visibility: hidden;
  opacity: 0;
  height: 0;

  &.open {
    margin-top: 22px;

    visibility: visible;
    opacity: 1;
    transition: margin 0.6s, opacity 0.6s ease-in-out;
    height: auto;
  }

  .header {
    position: relative;
    background-color: $lightBlue;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

    color: #fff;
    text-transform: uppercase;
    font-size: 0.85em;
    letter-spacing: -0.2px;
    padding: 0.9em 1.4rem;

    &::after {
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 11px 11px 11px;
      border-color: transparent transparent $lightBlue transparent;
      position: absolute;
      z-index: 1;
      top: -9px;
      right: 26px;
      content: "";
    }
  }

  .notifications {
    overflow-y: auto;
    max-height: 320px;
    background-color: #fff;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    padding: 5px 17px;

    > div {
      > div:first-child {
        text-align: right;
        height: 23px;
        > span {
          margin-top: 8px;
          display: inline-block;
          font-size: 0.5em;
          padding: 2px 9px;
          text-transform: uppercase;
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
          > span:first-child {
            color: black;
          }

          > span:last-child {
            color: #888;
          }
        }
      }

      > div:last-child {
        text-align: right;
        font-size: 0.73rem;
        margin: 1px 6px;
        padding-bottom: 6px;
        border-bottom: 1px solid #eee;

        span {
          letter-spacing: 0.2px;
        }
      }
    }
  }
}
</style>
