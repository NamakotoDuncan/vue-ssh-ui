/* eslint-disable no-unused-vars */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


import {FormFilePlugin,InputGroupPlugin,  FormPlugin,  ImagePlugin,NavPlugin,SpinnerPlugin,
  AlertPlugin, PaginationPlugin, PopoverPlugin, TooltipPlugin, IconsPlugin, ToastPlugin, ModalPlugin, ButtonPlugin, LayoutPlugin, 
  OverlayPlugin, FormDatepickerPlugin, CardPlugin, TablePlugin, FormSelectPlugin, FormRadioPlugin, TimePlugin, ButtonGroupPlugin,
   FormGroupPlugin, FormInputPlugin, SidebarPlugin, FormCheckboxPlugin,
   DropdownPlugin, TabsPlugin, CollapsePlugin, ListGroupPlugin, BadgePlugin, AvatarPlugin, FormTextareaPlugin, BFormTextarea,
} from 'bootstrap-vue'


Vue.use(ToastPlugin)
Vue.use(ModalPlugin)
Vue.use(LayoutPlugin)
Vue.use(OverlayPlugin)
Vue.use(ButtonPlugin)
Vue.use(FormDatepickerPlugin)
Vue.use(CardPlugin)
Vue.use(TablePlugin)
Vue.use(FormSelectPlugin)
Vue.use(FormRadioPlugin)
Vue.use(TimePlugin)
Vue.use(ButtonGroupPlugin)
Vue.use(FormGroupPlugin)
Vue.use(FormInputPlugin)
Vue.use(SidebarPlugin)
Vue.use(FormCheckboxPlugin)
Vue.use(FormTextareaPlugin)
Vue.use(DropdownPlugin)
Vue.use(PopoverPlugin)
Vue.use(IconsPlugin)
Vue.use(TabsPlugin)
Vue.use(CollapsePlugin)
Vue.use(ListGroupPlugin)
Vue.use(TooltipPlugin)
Vue.use(BadgePlugin)
Vue.use(AvatarPlugin)
Vue.use(PaginationPlugin)
Vue.use(AlertPlugin)
Vue.use(FormFilePlugin)
Vue.use(InputGroupPlugin)
Vue.use( FormPlugin)
Vue.use( ImagePlugin)
Vue.use(NavPlugin)
Vue.use(SpinnerPlugin);
// Vue.use(BFormTextarea);

Vue.config.productionTip = false
Vue.use(BootstrapVue);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
