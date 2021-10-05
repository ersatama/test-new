export const state = () => ({
  token: '',
  user: '',
  auth: true,
  modal: false,
  favorite: [],
  city: '',
  notifications: [],
  booking: '',
  sidebar: {
    show: false,
    view: 0,
    notifications: 0,
  }
})

export const mutations = {
  addFavorite(state,value) {
    state.favorite.push(value);
  },
  spliceFavorite(state,value) {
    state.favorite.splice(value,1);
  },
  setAuth(state,value) {
    state.auth  = value;
  },
  setCity(state,value) {
    state.city = value
  },
  setToken(state,value) {
    state.token = value;
  },
  setSidebarShow(state,value) {
    state.sidebar.show  = value;
  },
  setSidebarNotifications(state,value) {
    state.sidebar.notifications = value;
  },
  addNotifications(state,value) {
    state.notifications.push(value);
  },
  setBooking(state,value) {
    state.booking = value;
  },
  setModal(state,value) {
    state.modal = value;
  }
}

export const actions = {
  favorite({commit},id) {
    /*
    favorite: function(id) {
      alert(id);
      let status  =   true;
      for (let i = 0; i < this.$store.state.localStorage.favorite.length; i++) {
        if (this.$store.state.localStorage.favorite[i] === id) {
          this.$store.commit('localStorage/spliceFavorite',i);
          status  =   false;
        }
      }
      if (status) {
        this.$store.commit('localStorage/addFavorite',id);
      }
    },
     */
  }
}
