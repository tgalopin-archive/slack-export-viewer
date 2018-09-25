<template>
    <div id="app">
        <div class="loader" v-if="isLoading">
            Loading...
        </div>

        <div class="loaded" v-if="!isLoading">
            <nav class="navbar navbar-expand-sm navbar-dark bg-primary">
                <a class="navbar-brand" href="#">
                    Slack Export Viewer
                </a>

                <ul class="navbar-nav">
                    <router-link tag="li" to="/explore" class="nav-item" active-class="active">
                        <a class="nav-link">
                            Explore
                        </a>
                    </router-link>
                    <router-link tag="li" to="/members" class="nav-item" active-class="active">
                        <a class="nav-link">
                            Members
                        </a>
                    </router-link>
                    <router-link tag="li" to="/search" class="nav-item" active-class="active">
                        <a class="nav-link">
                            Search
                        </a>
                    </router-link>
                </ul>
            </nav>

            <router-view />
        </div>
    </div>
</template>

<style scoped lang="scss">
    .loader {
        text-align: center;
        padding: 100px 0 0 0;
    }
</style>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class App extends Vue {
        public created() {
            this.$store.dispatch('loadChannels');
            this.$store.dispatch('loadUsers');
        }

        public get isLoading() {
            return this.$store.state.users === null || this.$store.state.channels === null;
        }
    }
</script>
