<script setup>
import { useData } from 'vitepress'
import { computed } from 'vue';
import { useArticles, useActiveTag } from '../composables/config/blog.ts'
import Item from './item.vue';

const { theme, frontmatter } = useData()
const docs = useArticles()
const activeTag = useActiveTag()

const wikiList = computed(() => {
    return docs.value.filter(v => !v.meta.hidden)
})

const filterData = computed(() => {
    if (!activeTag.value) return wikiList.value
    return wikiList.value.filter((v) =>
        v.meta?.tag?.includes(activeTag.value)
    )
})

</script>

<template>
    <div class="list" v-for="(item, index) in filterData" :key="item.route">
        <Item :route="item.route" :title="item.meta.title.toString()" :cover="item.meta.cover" />
    </div>
</template>

<style lang="scss"></style>