import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Search from './views/Search.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'explore',
            component: Home,
        },
        {
            path: '/search',
            name: 'search',
            component: Search,
        },
    ],
});
