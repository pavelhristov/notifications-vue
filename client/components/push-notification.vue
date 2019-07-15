<template>
  <div class="simple-form">
    <label>
      Type:
      <select v-model="model.type">
        <option disabled value>Please select one</option>
        <option value="text">Text</option>
        <option value="bonus">Bonus</option>
        <option value="Promotion">Promotion</option>
      </select>
    </label>

    <label>
      Title:
      <input type="text" v-model="model.title" />
    </label>

    <label>
      Image:
      <input type="text" v-model="model.image" />
    </label>

    <label>
      Link:
      <input type="text" v-model="model.link" />
    </label>

    <label>
      Text:
      <textarea v-model="model.text"></textarea>
    </label>

    <label>
      Requirement:
      <input type="text" v-model="model.requirement" />
    </label>

    <label>
      Expires(ms):
      <input type="number" v-model.number="model.expires" />
    </label>

    <button class="btn" @click="pushNotification()">push notification</button>
    <notifier :bus="bus" />
  </div>
</template>

<script>
import Vue from "vue";
import notifier from "./notifier.vue";

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
      bus: new Vue()
    };
  },
  methods: {
    pushNotification() {
      if (!this.model.type) {
        this.bus.$emit("notify", '"type" is required!', "danger", 3000);
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
      this.bus.$emit("notify", "notification pushed!", "success", 3000);
    }
  },
  components: {
    notifier
  }
};
</script>

<style>
@import "../styles/simple-form.scss";
</style>