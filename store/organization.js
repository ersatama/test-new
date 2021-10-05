export const state = () => ({
  status: true,
  menu: [],
  found: -1,
  page: 1,
  organizations: []
})
export const mutations = {
  setMenu(state,value) {
    state.menu = value;
  },
  setFound(state,value) {
    state.found = value;
  },
  setOrganizations(state,value) {
    state.organizations = state.organizations.concat(value);
  },
  setStatus(state,value) {
    state.status  = value;
  },
  setPage(state,value) {
    state.page  = value;
  },
  init(state) {
    state.page  = 1;
    state.status  = true;
  }
}
export const actions = {
  async menu({commit}) {
    const res = await this.$repository.menu.list()
    const { status, data } = res
    if (status === 200) {
      commit('setMenu',data.data);
    } else {
      commit('setMenu',[]);
    }
  },
  async getCountOrganizationsByCategoryId({commit},payload) {
    const res = await this.$repository.organization.getCountOrganizationsByCategoryId(payload.city,payload.page,payload.filters);
    const { status, data } = res
    if (status === 200) {
      commit('setFound',data);
    } else {
      commit('setFound',-1);
    }
  },
  async getOrganizationsByCategoryId({commit, state},payload) {
    const res = await this.$repository.organization.getOrganizationsByCategoryId(payload.city,payload.page,payload.filters);
    const { status, data } = res
    if (status === 200) {
      let len = data.data.length;
      for (let i = 0; i < len; i++) {
        data.data[i].timeTitle  = this.$helper(data.data[i]);
      }
      if (len === 15) {
        commit('setStatus',true);
      }
      commit('setPage',state.page + 1);
      commit('setOrganizations',data.data);
    } else {
      commit('setOrganizations',[]);
    }
  },
}
