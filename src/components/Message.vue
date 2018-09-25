<template>
    <div class="message">
        <div class="message__picture">
            <img :src="author.picture" />
        </div>
        <div class="message__content">
            <div class="message__details">
                <Username :id="this.$props.message.user" />
                {{ date }}
            </div>

            <div class="message__text">
                <ParsedContent :content="text" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .message {
        display: flex;
        padding: 5px;

        &__picture {
            margin-right: 5px;

            img {
                border-radius: 5px;
                height: 36px;
                width: 36px;
            }
        }

        &__content {
            line-height: 18px;
        }

        &__details {
            font-size: 12px;
            color: #aeaeae;
        }
    }
</style>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import ParsedContent from '@/components/ParsedContent.vue';
    import Username from '@/components/Username.vue';

    @Component({
        props: {
            message: Object,
        },
        components: {
            Username,
            ParsedContent,
        },
    })
    export default class Message extends Vue {
        public get text() {
            return this.$props.message.text;
        }

        public get date() {
            return (new Date(this.$props.message.ts * 1000)).toLocaleString('en-US');
        }

        public get author() {
            return this.$store.state.users[this.$props.message.user];
        }
    }
</script>
