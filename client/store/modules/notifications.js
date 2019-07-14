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
            notifications.filter(n => n.expires || n.expires === 0).forEach(n => {
                let id = n.id;
                setTimeout(function () {
                    commit('expireNotification', id);
                }, n.expires);
            });

            commit('setNotifications', notifications);
        });
    },
    pushNotification({ dispatch }, notification) {
        notificationsData.add(notification);
        dispatch('getAllNotifications');
    }
};

// mutations
const mutations = {
    setNotifications(state, notifications) {
        state.all = notifications;
    },
    toggle(state) {
        state.isOpen = !state.isOpen;
        if (!state.isOpen) {
            let toUpdate = state.all.filter(n => !n.seen);
            toUpdate.forEach(n => n.seen = true);
            updateNotificationsState(state, toUpdate);
        }
    },
    expireNotification(state, id) {
        let notification = state.all.find(n => n.id === id);
        if (notification) {
            notification.expired = true;
            updateNotificationsState(state, [notification]);
        }
    }
};

function updateNotificationsState(state, notifications) {
    let ids = notifications.map(n => n.id);
    state.all = [
        ...state.all.filter(n => ids.indexOf(n.id) < 0),
        ...notifications
    ];
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
