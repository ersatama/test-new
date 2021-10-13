export const state = () => ({
  token: false,
  user: false,
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
  favorite({commit, state},id) {
    let status  =   true;
    for (let i = 0; i < state.favorite.length; i++) {
      if (state.favorite[i] === id) {
        commit('spliceFavorite',i);
        status  =   false;
      }
    }
    if (status) {
      commit('addFavorite',id);
    }
  },
  getUser({commit, state}) {
    console.log(this.$store.state.sessionStorage.user);
    console.log('asdasd');
    /*if (!state.user) {
      if (state.token) {

      }
    }*/
  }
}
