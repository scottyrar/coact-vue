import "/src/assets/main.css?t=1686410950826"

import { createApp } from "/node_modules/.vite/deps/vue.js?v=c799227b"
import { createPinia } from "/node_modules/.vite/deps/pinia.js?v=c799227b"

import App from "/src/App.vue"
import router from "/src/router/index.js?t=1686410950826"

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
