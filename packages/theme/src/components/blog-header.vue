<script setup>
import { computed, ref } from 'vue'
import { useData } from 'vitepress'
import { useBlogConfig } from '../composables/config/blog.ts'

const { site, frontmatter } = useData()
const { home } = useBlogConfig()

const name = computed(
    () => (frontmatter.value.blog?.name ?? site.value.title) || home?.name || ''
)
</script>

<template>
    <div>
        <h1 class="name">{{ name }}</h1>
    </div>
</template>

<style lang="scss" scoped>
.name {
    background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    text-align: center;
    padding: 60px 0;

    font-size: 60px;
    line-height: 1.25;
    font-weight: 900;
    letter-spacing: -1.5px;
    max-width: 960px;
}
</style>
