import Vue from 'vue';
import Vuex from 'vuex';
import {ApiChannel, ApiUser, Map} from '@/types';
import {api} from '@/services';

Vue.use(Vuex);

export interface AppState {
    channels: ApiChannel[] | null;
    users: Map<ApiUser> | null;
}

export default new Vuex.Store<AppState>({
    state: {
        channels: null,
        users: null,
    },
    mutations: {
        setChannels(state, channels: ApiChannel[]) {
            channels.sort((first, second) => {
                if (first.members_count === second.members_count) {
                    return 0;
                }

                return (second.members_count > first.members_count) ? 1 : -1;
            });

            state.channels = channels;
        },

        setUsers(state, users: Map<ApiUser>) {
            state.users = users;
        },
    },
    actions: {
        loadChannels: ({commit}) => {
            api.fetchChannels().then((channels) => commit('setChannels', channels));
        },

        loadUsers: ({commit}) => {
            api.fetchUsers().then((users) => commit('setUsers', users));
        },
    },
});
