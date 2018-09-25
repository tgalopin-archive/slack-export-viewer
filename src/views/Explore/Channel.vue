<template>
    <div class="channel">
        <div class="header">
            <h2 class="header__title">
                #{{ channel.name }}
            </h2>

            <span class="header__members">
                {{ channel.members_count }} members
            </span>

            <span class="header__creator">
                Creator: <Username :id="channel.creator" />
            </span>

            <div class="header__purpose" v-if="channel.purpose">
                <ParsedContent :content="channel.purpose" />
            </div>
        </div>

        <div class="messages" v-if="!messages">
            Loading...
        </div>

        <div class="messages" v-if="messages">
            <Message v-for="message in pageMessages"
                     v-bind:message="message"
                     :key="message.ts + '-' + message.user + '-' + Math.random()" />
        </div>
    </div>
</template>

<style scoped lang="scss">
    .channel {
        background: #eee;
        max-height: 100%;
        overflow-y: scroll;
    }

    .header {
        padding: 15px 20px;
        background: #fff;

        &__title {
            display: inline;
            font-size: 18px;
            font-weight: bold;
            margin-right: 30px;
        }

        &__members, &__creator, &__purpose {
            color: #888;
            font-size: 12px;
            margin-right: 20px;
        }

        &__purpose {
            margin-top: 10px;
        }
    }

    .messages {
        padding: 15px 20px;
    }
</style>

<script lang="ts">
    import {Component, Watch, Vue} from 'vue-property-decorator';
    import {api} from '@/services';
    import {ApiMessage} from '../../types';
    import Username from '@/components/Username.vue';
    import Message from '@/components/Message.vue';
    import ParsedContent from '@/components/ParsedContent.vue';

    @Component({
        components: {ParsedContent, Message, Username},
    })
    export default class Channel extends Vue {
        public page = 1;
        public messages: ApiMessage[] | null = null;

        public mounted() {
            this.fetchMessages();
        }

        @Watch('$route')
        public onRouteChanged(route: string, oldroute: string) {
            this.fetchMessages();
        }

        private fetchMessages() {
            this.messages = null;
            api.fetchChannel(this.$route.params.name).then((messages) => this.messages = messages);
        }

        public get channel() {
            for (const i in this.$store.state.channels) {
                if (this.$store.state.channels[i].name === this.$route.params.name) {
                    return this.$store.state.channels[i];
                }
            }

            this.$router.push('/explore');
        }

        public get pageMessages() {
            if (!this.messages) {
                return [];
            }

            return this.messages.reverse().slice(0, 100).reverse();
        }
    }
</script>
