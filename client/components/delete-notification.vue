<template>
  <div>
    <label>
      select notification to delete:
      <select v-model="id">
        <option disabled value>Please select one</option>
        <option v-for="n in notifications" :key="n.id" :value="n.id">{{ n.title }} ({{ n.id }})</option>
      </select>
    </label>
    <br />

    <button class="btn" @click="deleteNotification()">delete notification</button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState({
    notifications: state => state.notifications.all
  }),
  data() {
    return {
      id: ""
    };
  },
  methods: {
    deleteNotification() {
      if (this.id) {
        this.$store.dispatch("notifications/deleteNotification", this.id);
        this.id = "";
      }
    }
  }
};
</script>