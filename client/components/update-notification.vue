<template>
  <div>
    <label>
      select notification to update:
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

      <button class="btn" @click="updateNotification()">update notification</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

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
      // todo: notify
    },
    onSelectNotification(ev) {
      let notification = this.notifications.find(n => n.id === +this.id);
      for (const key in this.model) {
        if (this.model.hasOwnProperty(key)) {
          this.model[key] = notification[key] || "";
        }
      }
    }
  }
};
</script>