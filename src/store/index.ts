import {createStore} from 'vuex'
import permission from './modules/permission'

const store = createStore({
  modules:{
    permission
  },
  state:{

  }
})

export default store

