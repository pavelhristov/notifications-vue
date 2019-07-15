<template>
  <div class="simple-form">
    <label>
      Select notification to delete:
      <select v-model="id">
        <option disabled value>Please select one</option>
        <option v-for="n in notifications" :key="n.id" :value="n.id">{{ n.title }} ({{ n.id }})</option>
      </select>
    </label>

    <button class="btn" @click="deleteNotification()">delete notification</button>
    <notifier :bus="bus" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Vue from "vue";
import notifier from "./notifier.vue";

export default {
  computed: mapState({
    notifications: state => state.notifications.all
  }),
  data() {
    return {
      bus: new Vue(),
      id: ""
    };
  },
  methods: {
    deleteNotification() {
      if (this.id) {
        this.$store.dispatch("notifications/deleteNotification", this.id);
        this.id = "";
        this.bus.$emit("notify", "notification deleted", "success", 3000);
      } else {
        this.bus.$emit("notify", "select notification first", "danger", 3000);
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