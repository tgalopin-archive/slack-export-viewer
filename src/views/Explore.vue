<template>
    <div class="explore">
        <div class="explore__channels">
            <ChannelChooser v-bind:channels="channels" />
        </div>
        <div class="explore__messages">
            <router-view></router-view>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .explore {
        display: flex;

        &__channels {
            flex-grow: 0.23;
            flex-basis: 0;
            min-width: 200px;
        }

        &__messages {
            flex-grow: 0.77;
            flex-basis: 0;
        }
    }
</style>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import ChannelChooser from '@/components/ChannelChooser.vue';

    @Component({
        components: {
            ChannelChooser,
        },
    })
    export default class Explore extends Vue {
        public get channels() {
            return this.$store.state.channels;
        }
    }
</script>
