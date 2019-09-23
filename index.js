import Vue from "/web_modules/vue/dist/vue.esm.browser.js";
import VueRouter from "/web_modules/vue-router/dist/vue-router.esm.browser.js";
import httpVueLoader from "/web_modules/http-vue-loader/src/httpVueLoader.js";
import VueTypeIt from "/src/plugins/typeit.js";
import VueRemarkable from "/src/plugins/remarkable.js";
import Chat from "/web_modules/vue-beautiful-chat/dist/index.js";
// import * as faceapi_module from "/web_modules/face-api.js/dist/face-api.min.js";
import Oscilloscope from "/web_modules/oscilloscope/dist/oscilloscope.es.js";
import drag from "/src/plugins/v-drag.js";
import MarqueeText from "/web_modules/vue-marquee-text-component/dist/MarqueeText.common.js";

Vue.use(drag);
Vue.component('marquee-text', MarqueeText)
Vue.use(VueRouter);
Vue.use(Chat);
Vue.use(VueRemarkable);
Vue.use(VueTypeIt);

Vue.prototype.$vue = Vue;
Vue.prototype.$Oscilloscope = Oscilloscope;

const router = new VueRouter({
  routes: [
    { path: "/", component: httpVueLoader("./src/pages/home.vue") },
    { path: "/monitor", component: httpVueLoader("./src/pages/monitor.vue") },
    { path: "/monitor2", component: httpVueLoader("./src/pages/monitor2.vue") },
    { path: "/about", component: httpVueLoader("./src/pages/about.vue") }
  ]
});

new Vue({
  router: router,
  template: "<router-view></router-view>"
}).$mount("#app");
