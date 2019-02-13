// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './components/App'
import router from './router'


import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faChartBar, faCaretDown,  faCaretRight, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faBars, faChartBar, faCaretDown,  faCaretRight, faSearch)
Vue.component('font-awesome-icon', FontAwesomeIcon)

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);

import Multiselect from 'vue-multiselect'
Vue.component('multiselect', Multiselect)


import 'pretty-checkbox/src/pretty-checkbox.scss';
import PrettyInput from 'pretty-checkbox-vue/input';
import PrettyCheck from 'pretty-checkbox-vue/check';
import PrettyRadio from 'pretty-checkbox-vue/radio';

Vue.component('p-input', PrettyInput);
Vue.component('p-check', PrettyCheck);
Vue.component('p-radio', PrettyRadio);

const options = {
	name: '_blank',
	specs: [
	'fullscreen=yes',
	'titlebar=yes',
	'scrollbars=yes'
	],
	styles: [
	'https://fonts.googleapis.com/css?family=Open+Sans',
	'static/style/main.css',
	'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
	'https://use.fontawesome.com/releases/v5.3.1/css/all.css'
	]
}

import VueHtmlToPaper from 'vue-html-to-paper';
Vue.use(VueHtmlToPaper, options);

Vue.config.productionTip = false

new Vue({
	el: '#app',
	router,
	template: '<App></App>',
	components: { App }
})