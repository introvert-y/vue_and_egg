import Vue from "vue";
import VueRouter from "vue-router";
import { getCookie } from "@utils/index";

Vue.use(VueRouter);

const prefix = getCookie("reqPrefix") || "";
const routes = [
	{
		path: `/`,
		name: "home",
		component: () => import( /* webpackChunkName: "home" */ "../views/home/index.vue"),
	},
	{
		path: `/editor`,
		name: "editor",
		meta: {
			title: '编辑页',
		},
		component: () => import( /* webpackChunkName: "editor" */ "../views/editor/index.vue"),
	},
	{
		path: `/template`,
		name: "template",
		meta: {
			title: '展示页',
		},
		component: () => import( /* webpackChunkName: "template" */ "../views/template/index.vue"),
	},
];
console.log("routes", routes);

const router = new VueRouter({
	mode: "history",
	base: prefix,
	routes
});
router.beforeEach((to, from, next) => {
	console.log('to', to)
	router.app.$message && router.app.$message.closeAll()
	if (to.meta.title) {
		document.title = to.meta.title
	}
	// chrome
	document.body.scrollTop = 0
	// firefox
	document.documentElement.scrollTop = 0
	// safari
	window.pageYOffset = 0
	router.app.$nextTick(() => {
		next();
	})
})
export default router;
