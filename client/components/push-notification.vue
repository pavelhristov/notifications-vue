<template>
  <div>
    <label>
      type
      <select v-model="model.type">
        <option disabled value>Please select one</option>
        <option value="text">Text</option>
        <option value="bonus">Bonus</option>
        <option value="Promotion">Promotion</option>
      </select>
    </label>
    <br />

    <label>
      title
      <input type="text" v-model="model.title" />
    </label>
    <br />

    <label>
      image
      <input type="text" v-model="model.image" />
    </label>
    <br />

    <label>
      link
      <input type="text" v-model="model.link" />
    </label>
    <br />

    <label>
      text
      <textarea v-model="model.text"></textarea>
    </label>
    <br />

    <label>
      requirement:
      <input type="text" v-model="model.requirement" />
    </label>
    <br />

    <label>
      expires(ms):
      <input type="number" v-model.number="model.expires" />
    </label>
    <br />

    <button class="btn" @click="pushNotification()">push notification</button>
    <span class="notifier" :class="notifier.status">{{ notifier.message }}</span>
  </div>
</template>

<script>
import { setTimeout } from "timers";
export default {
  data() {
    return {
      model: {
        type: "",
        title: "",
        image: "",
        link: "",
        text: "",
        requirement: "",
        expires: ""
      },
      notifier: {
        message: "",
        status: ""
      }
    };
  },
  methods: {
    pushNotification() {
      if (!this.model.type) {
        this.notify('"type" is required!', "warning", 3000);
        return;
      }

      let notification = {};
      for (const key in this.model) {
        if (
          !this.model.hasOwnProperty(key) ||
          (!this.model[key] && this.model[key] !== 0)
        ) {
          continue;
        }

        const element = this.model[key];
        this.model[key] = "";
        if (key === "expires" && !Number.isInteger(+element)) {
          continue;
        }

        notification[key] = element;
      }

      this.$store.dispatch("notifications/pushNotification", notification);
      this.notify("notification pushed!", "success", 3000);
    },
    notify(message, status, duration) {
      if (this.notifier.timer) {
        clearTimeout(this.notifier.timer);
        this.notifier.timer = 0;
      }

      this.notifier.message = message || "";
      this.notifier.status = status || "";
      if (duration && Number.isInteger(+duration)) {
        this.notifier.timer = setTimeout(() => {
          this.notifier.message = "";
          this.notifier.status = "";
        }, duration);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.notifier {
  &.warning {
    color: red;
  }

  &.success {
    color: green;
  }
}
</style>