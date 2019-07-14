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
    /**
     * Handles state synchronization with the API.
     * 
     * @param {Object} context context
     */
    getAllNotifications({ commit, state }) {
        notificationsData.getAll().then(notifications => {
            let ids = state.all.map(n => n.id);
            let toAdd = [];
            let toQueueExpire = [];
            let toUpdate = [];
            notifications.forEach(n => {
                if (ids.indexOf(n.id) > -1) { //update
                    let localNotification = state.all.find(ln => ln.id === n.id);
                    // basic object comparison, going deep seems out of scope
                    if (!localNotification.expired && JSON.stringify(n) !== JSON.stringify(localNotification)) { // check if its expired
                        toUpdate.push(n);
                        if (!localNotification.expires && (n.expires || n.expires === 0)) { // if expiration has been added
                            toQueueExpire.push(n);
                        }
                    }
                } else {  //add
                    toAdd.push(n);
                    if (n.expires || n.expires === 0) {
                        toQueueExpire.push(n);
                    }
                }
            });

            if (toAdd.length > 0)
                commit('addNotifications', toAdd);

            if (toQueueExpire.length > 0)
                toQueueExpire.filter(n => n.expires || n.expires === 0).forEach(n => {
                    let id = n.id;
                    setTimeout(function () {
                        commit('expireNotification', id);
                    }, n.expires);
                });

            if (toUpdate.length > 0)
                commit('updateNotifications', toUpdate);

            let incomingIds = notifications.map(n => n.id);
            let toDelete = state.all.filter(n => incomingIds.indexOf(n.id) < 0);
            if (toDelete.length > 0)
                commit('deleteNotifications', toDelete);
        });
    },
    /**
     * Pushes notification to the API and signals for notifications update.
     * 
     * @param {Object} context context
     * @param {Object} notification notification to add.
     */
    pushNotification({ dispatch }, notification) {
        notificationsData.add(notification).then(() => {
            dispatch('getAllNotifications');
        });
    },
    /**
     * Deletes notification from the API and signals for notifications update.
     * 
     * @param {Object} context context
     * @param {Object} notificationId notification id to delete.
     */
    deleteNotification({ dispatch }, notificationId) {
        notificationsData.delete(notificationId).then(() => {
            dispatch('getAllNotifications');
        });
    },
    /**
     * Updates notification in the API and signals for notifications update.
     * 
     * @param {Object} context context
     * @param {Object} notification notification to update.
     */
    updateNotification({ dispatch }, notification) {
        notificationsData.update(notification).then(() => {
            dispatch('getAllNotifications');
        });
    }
};

// mutations
const mutations = {
    addNotifications(state, notifications) {
        state.all = Array.isArray(notifications) ?
            [...state.all, ...notifications] :
            [...state.all, notifications];
    },
    updateNotifications,
    toggle(state) {
        state.isOpen = !state.isOpen;
        if (!state.isOpen) {
            let toUpdate = state.all.filter(n => !n.seen);
            toUpdate.forEach(n => n.seen = true);
            if (toUpdate.length > 0)
                updateNotifications(state, toUpdate);
        }
    },
    expireNotification(state, id) {
        let notification = state.all.find(n => n.id === id);
        if (notification) {
            notification.expired = true;
            updateNotifications(state, [notification]);
        }
    },
    deleteNotifications(state, notifications) {
        let ids = notifications.map(n => n.id);
        state.all = [...state.all.filter(n => ids.indexOf(n.id) < 0)];
    }
};

// Mutation that updates provided notifications.
function updateNotifications(state, notifications) {
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
