import './assets/main.css'

import { createApp } from 'vue'
import { setActivePinia, createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueApexCharts from "vue3-apexcharts";
import PrimeVue from 'primevue/config';
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.use(VueApexCharts);
app.use(PrimeVue);

app.component("vue-select", vSelect);

app.component('Carousel', Carousel)
app.component('Slide', Slide)
app.component('Pagination', Pagination)
app.component('Navigation', Navigation)

app.mount('#app')