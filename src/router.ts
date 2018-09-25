import Vue from 'vue';
import Router from 'vue-router';
import Explore from './views/Explore.vue';
import Channel from './views/Explore/Channel.vue';
import Members from './views/Members.vue';
import Member from './views/Members/Member.vue';
import Search from './views/Search.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/explore',
            name: 'explore',
            component: Explore,
            children: [
                {
                    path: ':name',
                    component: Channel,
                },
            ],
        },
        {
            path: '/members',
            name: 'members',
            component: Members,
            children: [
                {
                    path: ':username',
                    component: Member,
                },
            ],
        },
        {
            path: '/search',
            name: 'search',
            component: Search,
        },
        {
            path: '/*',
            redirect: '/explore',
        },
    ],
});
