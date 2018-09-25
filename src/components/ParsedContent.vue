<template>
    <span class="parsed-content" v-html="parsedContent"></span>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component({
        props: {
            content: String,
        },
    })
    export default class ParsedContent extends Vue {
        public get parsedContent() {
            return this.$props.content;
        }
    }
</script>
