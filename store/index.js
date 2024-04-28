// store/index.js

import axios from 'axios';

export const state = () => ({
  lang: localStorage.getItem('lang') || 'ar',
  user_name: localStorage.getItem('user_name'),
  user_permissions: [],
  loading_list: {},
  data_list: [],
  pagination: {
    current_page: 1,
  },
  container: {},
  form_elements: {
    errors: {},
    // submit_button_disabled: false,
    // submit_button_loading: false,
  },
});

export const mutations = {
  updateState(state, stateObject) {
    state[stateObject.state_name] = stateObject.state_value;
  },
  updateContainer(state, stateObject) {
    state.container[stateObject.state_name] = stateObject.state_value;
  },
  updateLoading(state, stateObject) {
    state.loading_list[stateObject.state_name] = stateObject.state_value;
  },
  updateFormElements(state, stateObject) {
    state.form_elements[stateObject.state_name] = stateObject.state_value;
  },
  updatePagination(state, stateObject) {
    state.pagination[stateObject.state_name] = stateObject.state_value;
  },
};

export const actions = {
  updateState({ commit }, stateObject) {
    commit('updateState', stateObject);
  },
  updateContainer({ commit }, stateObject) {
    commit('updateContainer', stateObject);
  },
  updateLoading({ commit }, stateObject) {
    commit('updateLoading', stateObject);
  },
  updateFormElements({ commit }, stateObject) {
    commit('updateFormElements', stateObject);
  },
  updatePagination({ commit }, stateObject) {
    commit('updatePagination', stateObject);
  },

  /* ************************************** Main Endpoints ************************************** */

  async register(_, params) {
    return axios.post('members/register', params);
  },

  async resetPassword(_, v) {
    return axios.post('members/reset-password?v=' + v);
  },

  async checkMemberIsRegistered(_, params) {
    return axios.post('members/is-registered', params);
  },

  async getPackages() {
    return axios.get('packages/index');
  },

  async getPackage(_, params) {
    return axios.get('packages/view', params);
  },

  async createMembership(_, params) {
    return axios.post('memberships/create', params);
  },

  async getMembership(_, params) {
    return axios.get('memberships/view', params);
  },

  async getMemberships(_, params) {
    return axios.get('members/memberships', params);
  },

  async getMemberProfile(_, params) {
    return axios.get('members/profile', params);
  },

  async checkMemberRequiredInformation(_, params) {
    return axios.get('members/required-information', params);
  },

  async updateMemberProfile(_, params) {
    return axios.patch('members/update-profile', params);
  },

  async updateMemberPassword(_, params) {
    return axios.patch('members/update-password', params);
  },

  async membershipTapCharge(_, params) {
    return axios.post('memberships/tap-charge', params);
  },
  
  async membershipTapChargeApplePay(_, params) {
    return axios.post('memberships/tap-charge-apple-pay', params);
  },
  
  async viewTapCharge(_, params) {
    return axios.get('memberships/view-tap-charge', params);
  },

  async getTamaraPaymentTypes(_, params) {
    return axios.get('tamara/payment-types', params);
  },

  async startTamaraPayment(_, params) {
    return axios.post('memberships/tamara-session', params);
  },

  async viewTamaraSession(_, params) {
    return axios.get('memberships/view-tamara-session', params);
  },
};
