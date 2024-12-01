import { createStore } from "vuex";
import menuList from './modules/menuList'

const store = createStore({
  modules: {
    menuList,
  },
})

export default store;
