<template>
    <span>
        <router-link :to="'/members/'+user.name">{{ user.name }}</router-link>
    </span>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component({
        props: {
            id: String,
        },
    })
    export default class Username extends Vue {
        public get user() {
            return this.$store.state.users[this.$props.id];
        }
    }
</script>
