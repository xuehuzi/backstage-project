// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import AV from 'leancloud-storage'

Vue.use(ElementUI);
Vue.config.productionTip = false;
/* eslint-disable no-new */

AV.init({
  appId: "URfkqxY5iOa3IVFJ8WohECzS-gzGzoHsz",
  appKey: "8G8oDsxnDJ4TTDTA4AapbOLO",
  serverURLs: "https://urfkqxy5.lc-cn-n1-shared.com"
});

new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});
