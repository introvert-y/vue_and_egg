import Vue from 'vue'
import App from './App.vue'
import router from './router';

import ElementUI, { Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VConsole from "vconsole";

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import VueI18n from 'vue-i18n'
import commonReffer from 'mock-public-zzc'

console.log('main', commonReffer);
Vue.use(VueI18n)

Vue.use(VueQuillEditor);
Vue.use(ElementUI);

Vue.config.productionTip = false

new VConsole();

// 多语言
const i18n = new VueI18n({
  locale: 'zh',
  messages: {
    'zh': require('@assets/lang/zh.js'),
    'en': require('@assets/lang/en.js')
  }
});

// 消息封装
const myMessage =  function (args) {
	Message.closeAll();
	return Message(args);
};
['success', 'warning', 'info', 'error'].forEach(type => {
	myMessage[type] = options => {
			if (typeof options === 'string') {
					options = {
							message: options
					};
			}
			options.type = type;
			return Message(options);
	};
});

myMessage.close = Message.close;
myMessage.closeAll = Message.closeAll;
Vue.prototype.$message =  myMessage;

new Vue({
  router,
	i18n,
  render: h => h(App),
}).$mount('#app')
