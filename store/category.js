export const state = () => ({
  category: false
});
export const mutations = {
  setCategory(state,value) {
    state.category  = value;
  }
}
export const actions = {
  async getCategoryBySlug({commit},payload) {
    const res = await this.$repository.category.getCategoryBySlug(payload.slug);
    const { status, data } = res
    if (status === 200) {
      commit('setCategory',data.data);
    } else {
      commit('setCategory',[]);
    }
  }
}
