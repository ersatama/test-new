export const state = () => ({
  user: false,
  countries: []
})

export const mutations = {
  setCountries(state,value) {
    state.countries = value;
  },
  setUser(state,value) {
    state.user  = value;
  }
}
