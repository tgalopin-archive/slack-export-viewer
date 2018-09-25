<template>
    <span class="parsed-content" v-html="parsedContent"></span>
</template>

<style class="scss">
    pre {
        max-width: 700px;
        overflow: auto;
        margin: 0;
        padding: 7px 10px 3px 10px;
        border: 1px solid #e5e5e5;
        background: #fff;
    }
</style>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component({
        props: {
            content: String,
        },
    })
    export default class ParsedContent extends Vue {
        public get parsedContent() {
            let content = this.$props.content;

            content = content.replace(new RegExp('```[\\s]*([\\s\\S]+)[\\s]*```', 'mg'), '<pre>$1</pre>');
            content = content.replace(new RegExp('`[\\s]*([\\s\\S]+)[\\s]*`', 'mg'), '<code>$1</code>');
            content = content.replace('\n', '<br />');
            
            content = content.replace(
                /<?(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])>?/gim,
                '<a href="$1" target="_blank">$1</a>'
            );

            return content;
        }
    }
</script>
