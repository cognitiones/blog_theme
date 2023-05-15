---
title: "掘金小册"
hidden: true
---

<script setup>
    const list = [
        {
            label: '前端调试通关秘籍',
            url: 'http://cdn.chen-zeqi.cn/f0c57dc904ee4ad9bd903efbfb23ce0d_tplv-k3u1fbpfcp-no-mark_420_420_300_420.webp',
            sumUrl: '../sum_up/debug/debug_01',
            shareUrl: 'https://s.juejin.cn/ds/BK5m8hE/'
        }
    ]

    const handleClick = (item) => {
        if(!item.shareUrl) return
        window.open(item.shareUrl)
    }
</script>

<div v-for="item in list" class="jueJin" @click="handleClick(item)">
    <img :src="item.url" class="jueJin__img">
    <div class="jueJin__text">
        {{item.label}}
    </div>
</div>

<style>
    .jueJin{
        display: flex;
        align-items: flex-start;
    }

    .jueJin__img{
        width: 103px; 
        height: 147px;
        border-radius: 4px;
    }
    
    .jueJin__text{
        font-size: 20px;
        line-height: 28px;
        margin-left: 16px;
    }
</style>