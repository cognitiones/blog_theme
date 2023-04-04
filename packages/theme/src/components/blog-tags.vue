<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vitepress'
import { useActiveTag, useArticles } from '../composables/config/blog';

const docs = useArticles();
const activeTag = useActiveTag()
const router = useRouter()
const tags = computed(() => {
    return [...new Set(docs.value.map((v) => v.meta.tags || []).flat(3))]
})

const handleClick = (item: string) => {    
    if (item === activeTag.value) {
        handleCloseTag()
        return
    }
    activeTag.value = item
    router.go(
        `${window.location.origin}${router.route.path}?tag=${item}`
    )
}

const handleCloseTag = () => {
    activeTag.value = ''
    router.go(`${window.location.origin}${router.route.path}`)
}

onMounted(() => {
  const url = new URL(window.location.href)
  activeTag.value = url.searchParams.get('tag') || ''
})

</script>

<template>
    <div class="tags-wrapper">
        <div class="title">
            <span>标签</span>
            <div class="tags-list clear" v-if="activeTag">
                <span class="tags flex clear" @click="handleCloseTag()">
                    {{ activeTag }}
                    <img src="http://cdn.chen-zeqi.cn/x%20(2).svg" alt="">
                </span>
            </div>    
        </div>
        <div class="tags-list">
            <span @click="handleClick(item)" class="tags" v-for="item in tags" :key="item">
                {{ item }}
            </span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.flex{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.tags:hover {
  transform: translateY(-2px);
  box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.2);
}

.tags-wrapper {
    padding: 10px 10px 3px 10px;
    background-color: rgba(var(--bg-gradient));
    border-radius: 0.25rem;
    box-shadow: var(--box-shadow);

    &:hover {
        box-shadow: var(--box-shadow-hover);
    }
}

.clear{
    margin: 0 !important;
}

.title {
    width: 100%;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.tags-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
}

.tags {
    min-width: 40px;
    text-align: center;
    color: #fff;
    background-color: #79bbff;
    border-radius: 0.25rem;
    margin: 0 10px 10px 0;
    padding: 2px 8px;
    font-size: 14px;
}
</style>