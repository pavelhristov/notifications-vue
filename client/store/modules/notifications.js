import notificationsData from '../../data/notifications';

// initial state
const state = {
    all: [],
    isOpen: false
};

// getters
const getters = {};

// actions
const actions = {
    getAllNotifications({ commit }) {
        notificationsData.getAll().then(notifications => {
            commit('setNotifications', notifications);
        });
    }
};

// mutations
const mutations = {
    setNotifications(state, notifications) {
        state.all = notifications;
    },
    toggle(state){
        state.isOpen = !state.isOpen;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
