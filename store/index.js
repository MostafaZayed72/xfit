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
})

export const mutations = {
   updateState(state, stateObject) {
      state[stateObject['state_name']] = stateObject['state_value']
   },
   updateContainer(state, stateObject) {
      state.container[stateObject['state_name']] = stateObject['state_value']
   },
   updateLoading(state, stateObject) {
      state.loading_list[stateObject['state_name']] = stateObject['state_value']
   },
   updateFormElements(state, stateObject) {
      state.form_elements[stateObject['state_name']] =
         stateObject['state_value']
   },
   updatePagination(state, stateObject) {
      state.pagination[stateObject['state_name']] = stateObject['state_value']
   },
}

export const actions = {
   updateState({ commit }, stateObject) {
      commit('updateState', stateObject)
   },
   updateContainer({ commit }, stateObject) {
      commit('updateContainer', stateObject)
   },
   updateLoading({ commit }, stateObject) {
      commit('updateLoading', stateObject)
   },
   updateFormElements({ commit }, stateObject) {
      commit('updateFormElements', stateObject)
   },
   updatePagination({ commit }, stateObject) {
      commit('updatePagination', stateObject)
   },

   // Main Endpoints

   async register({ commit }, params) {
      return await this.$axios.post('members/register', params)
   },

   async resetPassword({ commit }, v) {
      return await this.$axios.post('members/reset-password?v=' + v)
   },

   async checkMemberIsRegistered({ commit }, params) {
      return await this.$axios.post('members/is-registered', params)
   },

   async getPackages({ commit }) {
      return await this.$axios.get('packages/index')
   },

   async getPackage({ commit }, params) {
      return await this.$axios.get('packages/view', { params })
   },

   async createMembership({ commit }, params) {
      return await this.$axios.post('memberships/create', params)
   },

   async getMembership({ commit }, params) {
      return await this.$axios.get('memberships/view', { params })
   },

   async getMemberships({ commit }, params) {
      return await this.$axios.get('members/memberships', { params })
   },

   async getMemberProfile({ commit }, params) {
      return await this.$axios.get('members/profile', { params })
   },

   async checkMemberRequiredInformation({ commit }, params) {
      return await this.$axios.get('members/required-information', { params })
   },

   async updateMemberProfile({ commit }, params) {
      return await this.$axios.patch('members/update-profile', params)
   },

   async updateMemberPassword({ commit }, params) {
      return await this.$axios.patch('members/update-password', params)
   },

   async membershipTapCharge({ commit }, params) {
      return await this.$axios.post('memberships/tap-charge', params)
   },

   async membershipTapChargeApplePay({ commit }, params) {
      return await this.$axios.post('memberships/tap-charge-apple-pay', params)
   },

   async viewTapCharge({ commit }, params) {
      try {
         const response = await axios.get('memberships/view-tap-charge', { params });
         return response.data;
      } catch (error) {
         console.error('Error while fetching viewTapCharge:', error);
         throw error;
      }
   },
   async getTamaraPaymentTypes({ commit }, params) {
      return await this.$axios.get('tamara/payment-types', { params })
   },

   async startTamaraPayment({ commit }, params) {
      return await this.$axios.post('memberships/tamara-session', params)
   },

   async viewTamaraSession({ commit }, params) {
      return await this.$axios.get('memberships/view-tamara-session', { params })
   },
}
