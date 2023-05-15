<script setup>
const props = defineProps({
    route: String,
    title: String,
    cover: String,
    description: String,
    top: Number
})
</script>

<template>
    <a class="blogItem" :href="route">
        <div v-if="top" class="blogItem__top" />
        
        <div class="blogItem__title">{{ title }}</div>
        <img v-if="cover" class="blogItem__img" :src="cover" alt="">
    </a>
</template>

<style lang="scss">
.blogItem {
    position: relative;

    display: flex;
    justify-content: space-between;
    width: 100%;
    background-color: rgba(var(--bg-gradient));
    border-radius: 0.25rem;
    box-shadow: var(--box-shadow);

    padding: 15px;
    margin: 0 0 20px 0;

    &:hover {
        box-shadow: var(--box-shadow-hover);
    }

    &__title {
        font-size: 20px;
        font-weight: 600;
    }

    &__img {
        width: 120px;
        height: 80px;
    }

    &__top {
        position: absolute;
        top: -2px;
        left: -8px;

        width: 0;
        height: 0;
        border-top: 12px solid skyblue;
        border-right: 12px solid transparent;
        border-left: 12px solid transparent;

        transform: rotate(135deg);
    }
}
</style>