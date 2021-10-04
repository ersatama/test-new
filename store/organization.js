export const state = () => ({
  menus: []
})
export const mutations = {
  setMenu(state,value) {
    state.menus = value;
  }
}
export const actions = {
  async list({commit}) {
    const res = await this.$repository.home.list()
    const { status, data } = res
    if (status === 200) {
      commit('setMenu',data.data);
    } else {

      // Handle error here
    }
  }
}
