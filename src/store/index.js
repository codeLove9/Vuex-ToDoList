import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    inputValue: 'aaa',
    highLightBtn: 'all'
  },
  getters: {
    unDoneListLength (state) {
      return state.list.filter(item => item.done === false).length
    }
  },
  mutations: {
    initList (state, list) {
      state.list = list
    },
    initInputValue (state, value) {
      state.inputValue = value
    },
    addItem (state) {
      const obj = {
        id: state.list.length,
        info: state.inputValue,
        done: false
      }
      state.list.push(obj)
      state.inputValue = ''
    },
    removeItem (state, id) {
      const res = state.list.filter(item => {
        return item.id !== id
      })
      state.list = res
    },
    changeStatus (state, params) {
      const i = state.list.findIndex(item => item.id === params.id)
      if (i !== -1) {
        state.list[params.id].done = params.status
      }
      // console.log(params, state.list[params.id])
    },
    cleanDone (state) {
      state.list = state.list.filter(item => item.done === false)
    },
    changeHighLight (state, btnName) {
      state.highLightBtn = btnName
      console.log(btnName)
    }
  },
  actions: {
    async getList (context) {
      const { data: res } = await axios.get('/listData.json')
      // console.log(res)
      context.commit('initList', res)
    }
  },
  modules: {
  }
})
