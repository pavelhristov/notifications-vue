<template>
  <div>
    <div class="tabs">
      <div @click="select('push')" :class="{'active': selected('push')}">add</div>
      <div @click="select('delete')" :class="{'active': selected('delete')}">delete</div>
      <div @click="select('update')" :class="{'active': selected('update')}">edit</div>
    </div>
    <div class="content">
      <div v-if="active === 'push'">
        <push-notification />
      </div>
      <div v-if="active === 'delete'">
        <delete-notification />
      </div>
      <div v-if="active === 'update'">
        <update-notification />
      </div>
    </div>
  </div>
</template>

<script>
import pushNotification from "./push-notification.vue";
import deleteNotification from "./delete-notification.vue";
import updateNotification from "./update-notification.vue";

export default {
  components: {
    "push-notification": pushNotification,
    "delete-notification": deleteNotification,
    "update-notification": updateNotification
  },
  data() {
    return {
      active: "push"
    };
  },
  methods: {
    selected(value) {
      return value === this.active;
    },
    select(value) {
      this.active = value;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/shared.scss";
.tabs {
  $borderSize: 1px;
  display: flex;
  margin: 0.7em 0;
  padding: 0 1em;
  border-bottom: $borderSize solid black;

  @media (max-width: $bp-phone){
    font-size: 0.8rem;
  }

  > div {
    padding: 0.4em 1em;
    display: inline-block;
    cursor: pointer;
    transition: color 0.5s;
    margin-bottom: -$borderSize;
    text-transform: capitalize;
    &.active {
      border-bottom: $borderSize solid $lightBlue;
      color: $lightBlue;
      transition: color 0.2s;
    }
  }
}
</style>