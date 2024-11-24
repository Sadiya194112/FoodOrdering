// Vuetify
import 'vuetify/styles'
import vuetify from './plugins/vuetify'
import router from './router/index.js'
import store from './store'


// Components
import { createApp } from 'vue'
import App from './App.vue'


createApp(App)
        .use(vuetify)
        .use(router)
        .use(store)
        .mount('#app')
