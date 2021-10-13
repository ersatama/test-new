export const state = () => ({
  user: false,
  countries: [],
  menus: []
})
export const mutations = {
  setCountries(state, value)
  {
    state.countries = value;
  },
  setUser(state, value) {
    state.user = value;
  }
}
export const actions = {
  getUserByToken({commit,state}, payload) {
    console.log(payload);
  }
}
