<template>
  <div class="simple-form">
    <label>
      Select notification to update:
      <select v-model="id" @change="onSelectNotification($event)">
        <option disabled value>Please select one</option>
        <option
          v-for="n in notifications"
          :key="n.id"
          :value="n.id"
          :disabled="n.expires || n.expired"
        >
          {{ n.title }} ({{ n.id }})
          <template v-if="n.expired">- expired</template>
          <template v-else-if="n.expires">- will expire</template>
        </option>
      </select>
    </label>

    <div v-if="id">
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

      <button class="btn" @click="updateNotification()">update notification</button>
    </div>
    <notifier :bus="bus" />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Vue from "vue";
import notifier from "./notifier.vue";

export default {
  computed: {
    ...mapState({
      notifications: state => state.notifications.all
    }),
    ...mapGetters({
      getNotificationById: "getNotificationById"
    })
  },
  data() {
    return {
      bus: new Vue(),
      id: "",
      model: {
        title: "",
        image: "",
        link: "",
        text: "",
        requirement: "",
        expires: ""
      }
    };
  },
  getters: {
    getNotificationById: (state, id) =>
      state.notifications.find(n => n.id === id)
  },
  methods: {
    updateNotification() {
      if (!this.id) {
        this.bus.$emit("notify", "select notification first", "danger", 3000);
      }

      let notification = { id: this.id };
      for (const key in this.model) {
        if (
          !this.model.hasOwnProperty(key) ||
          (!this.model[key] && this.model[key] !== 0)
        ) {
          continue;
        }

        const element = this.model[key];
        if (key === "expires" && !Number.isInteger(+element)) {
          continue;
        }

        notification[key] = element;
      }

      this.$store.dispatch("notifications/updateNotification", notification);
      this.id = "";
      this.bus.$emit("notify", "notification updated", "success", 3000);
    },
    onSelectNotification(ev) {
      let notification = this.notifications.find(n => n.id === +this.id);
      for (const key in this.model) {
        if (this.model.hasOwnProperty(key)) {
          this.model[key] = notification[key] || "";
        }
      }
    }
  },
  components: {
    notifier
  }
};
</script>

<style lang="scss">
@import "../styles/simple-form.scss";
</style>