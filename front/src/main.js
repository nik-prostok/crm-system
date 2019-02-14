import Multiselect from 'vue-multiselect';

import 'pretty-checkbox/src/pretty-checkbox.scss';
import PrettyInput from 'pretty-checkbox-vue/input';
import PrettyCheck from 'pretty-checkbox-vue/check';
import PrettyRadio from 'pretty-checkbox-vue/radio';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBars,
  faChartBar,
  faCaretDown,
  faCaretRight,
  faSearch,
  faEllipsisH,
  faPercent,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue';
import router from './router';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes',
  ],
  styles: [
    'https://fonts.googleapis.com/css?family=Open+Sans',
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
  ],
};

Vue.component('multiselect', Multiselect);
Vue.use(BootstrapVue);
library.add(faBars, faChartBar, faCaretDown, faCaretRight, faSearch, faEllipsisH, faPercent);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('p-input', PrettyInput);
Vue.component('p-check', PrettyCheck);
Vue.component('p-radio', PrettyRadio);
Vue.use(options);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
