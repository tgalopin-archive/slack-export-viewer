<template>
    <div class="chooser bg-primary">
        <input class="form-control form-control-sm mb-2" placeholder="Filter ..." v-model="filter" />

        <router-link
                v-for="channel in filteredChannels"
                :key="channel.id"
                :to="'/explore/' + channel.name"
                :class="'link ' + (channel.is_archived ? 'link--archived' : '')"
                active-class="link--active"
        >
            <span class="link__name">
                {{ channel.name }}
            </span>
            <span class="link__count">
                {{ channel.members_count }}
            </span>
        </router-link>
    </div>
</template>

<style scoped lang="scss">
    .chooser {
        max-height: 100%;
        color: #fff;
        padding: 10px 15px;
        overflow-y: scroll;
    }

    .link {
        display: block;
        padding: 0 5px;

        &--archived {
            opacity: 0.4;
        }

        &__name {
            color: #bbbbbb;
        }

        &__count {
            float: right;
        }

        &:hover, &--active {
            text-decoration: none;
            background: #5e5f57;

            .link__name {
                color: #bbbbbb !important;
            }

            .link__count {
                color: #93C54B !important;
            }
        }
    }
</style>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {ApiChannel} from '../types';

    @Component
    export default class ChannelChooser extends Vue {
        @Prop() public channels!: ApiChannel[];

        public filter = '';

        public get filteredChannels() {
            const filter = this.filter.trim();
            if (filter.length === 0) {
                return this.channels;
            }

            return this.channels.filter((channel) => {
                return channel.name.indexOf(filter) > -1;
            });
        }
    }
</script>
