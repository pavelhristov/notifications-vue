<template>
  <div class="notification-item">
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
      <span v-if="notification.date">{{ notification.date | localTime }}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Vue from "vue";

Vue.filter("localTime", function(value) {
  if (value) {
    let date = new Date(value);
    let today = new Date();
    if (
      date.getDate() == today.getDate() &&
      date.getMonth() == today.getMonth() &&
      date.getFullYear() == today.getFullYear()
    ) {
      return date.toLocaleTimeString();
    } else {
      return date.toLocaleDateString();
    }
  }
});

export default {
  props: {
    notificationId: { type: Number, required: true }
  },
  computed: mapState({
    notification(state) {
      return state.notifications.all.find(n => n.id === this.notificationId);
    }
  })
};
</script>

<style lang="scss">
.notification-item {
  padding: 0.5em 0.3em;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }

  > div:first-child {
    text-align: right;

    > span {
      font-size: 0.6em;
      padding: 0.2em 1em;
      color: white;
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
        color: black;
      }
    }
  }

  > div:last-child {
    text-align: right;
    font-size: 0.75rem;
  }
}
</style>