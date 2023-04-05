export default function sidebar() {
    return {
        '/great_book/': great_book(),
        // '/sum_up/': sum_up(),
        '/others/': others(),
    }
}

//好书推荐
function great_book() {
    return [
        {
            // text: '好书推荐',
            items: [
                { text: '掘金小册', link: '/great_book/jueJin' },
                // { text: '实体书', link: '/great_book/book' }
            ]
        }
    ]
}

//好书总结
function sum_up() {
    return [
        {
            // text: '总结',
            items: [
                { text: 'JavaScript高级程序设计(第4版)', link: '/sum_up/js' },
                { text: '前端调试通关秘籍', link: '/sum_up/debug/01' },
                // { text: '实体书', link: '/sum_up/css' }
            ]
        }
    ]
}

//好文总结
function others() {
    return [
        {
            // text: '总结',
            items: [
                { text: '工具分享', link: '/others/tool' },
                { text: '前端组件', link: '/others/module' },
                // { text: 'Promise', link: '/others/promise' }
            ]
        }
    ]
}