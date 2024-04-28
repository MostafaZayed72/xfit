export default (context, inject) => {
   const baseURL = () => {
      return process.env.NODE_ENV !== 'production'
         ? // ? 'http://127.0.0.1/all/customers/xfit/projects/xfit.com.sa/backend/v2/'
           'http://localhost/'
         : 'https://api1.msapps.net/xfit/apps/com.sa/v2/'
   }

   const axios_config = {
      baseURL: baseURL(),
      headers: {
         // common: {
         //    Authorization: localStorage.getItem('auth._token.local'),
         // },
         'Access-Control-Expose-Headers':
            'X-Pagination-Current-Page, X-Pagination-Page-Count',
      },
   }

   context.$axios.onRequest((config) => {
      context.store.dispatch('updateLoading', {
         state_name: config.url,
         state_value: true,
      })
   })

   context.$axios.onResponse((response) => {
      context.store.dispatch('updateLoading', {
         state_name: response.config.url,
         state_value: false,
      })
   })

   context.$axios.onResponseError((error) => {
      context.store.dispatch('updateLoading', {
         state_name: error.response.config.url,
         state_value: false,
      })

      if (error.response.data.status === 401) {
         context.store.dispatch('updateState', {
            state_name: 'user_name',
            state_value: null,
         })
         context.$auth.logout()
      }

      // context.$notify('danger', context.$t('Server error'))
   })

   const axios_get_list = context.$axios.create(axios_config)
   inject('axios_get_list', axios_get_list)

   axios_get_list.onRequest(() => {
      context.store.dispatch('updateState', {
         state_name: 'data_list',
         state_value: [],
      })
      context.store.dispatch('updateState', {
         state_name: 'loading_list',
         state_value: true,
      })
   })

   axios_get_list.onResponse((response) => {
      context.store.dispatch('updateState', {
         state_name: 'data_list',
         state_value: response.data,
      })
      context.store.dispatch('updateState', {
         state_name: 'loading_list',
         state_value: false,
      })
      let pagination = {
         current_page: Number(response.headers['x-pagination-current-page']),
         pages_count: Number(response.headers['x-pagination-page-count']),
         per_page: Number(response.headers['x-pagination-per-page']),
         total_count: Number(response.headers['x-pagination-total-count']),
      }
      context.store.dispatch('updateState', {
         state_name: 'pagination',
         state_value: pagination,
      })
   })

   axios_get_list.onResponseError((error) => {
      context.store.dispatch('updateState', {
         state_name: 'loading_list',
         state_value: false,
      })

      if (error.response && error.response.data.status === 403) {
         context.$notify('danger', context.$t(error.response.data.message))
         return
      }

      context.$notify('danger', context.$t('Server error'))
   })
}
