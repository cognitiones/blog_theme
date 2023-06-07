/*
 * @Author: chenzeqi chenzeqi@jiayuan.com
 * @Date: 2023-05-15 10:00:56
 * @LastEditors: chenzeqi chenzeqi@jiayuan.com
 * @LastEditTime: 2023-06-07 18:46:26
 * @FilePath: \blog_theme\packages\blog\docs\.vitepress\sidebar.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default function sidebar() {
    return {
        '/great_book/': great_book(),
        // '/sum_up/': sum_up(),
        // '/others/': others(),
        '/func': func(),
    }
}

//好书推荐
function great_book() {
    return [
        {
            // text: '好书推荐',
            items: [
                { text: '掘金小册', link: '/great_book/jueJin' },
                { text: '实体书', link: '/great_book/book' }
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

function func() {
    return [
        {
            text: "函数式编程",
            items: [
                { text: '01 命令式与声明式', link: '/func/01' },
                { text: '02 DRY 原则', link: '/func/02' },
                { text: '03 链式调用', link: '/func/03' },
                { text: '04 compose/pipe', link: '/func/04' },
                { text: '05 curry', link: '/func/05' },
                { text: '06 Identity/Maybe Functor', link: '/func/06' },
                { text: '07 Monad', link: '/func/07' },
                { text: '08 Semigroup', link: '/func/08' },
                { text: '09 推导 foldMap() 函数', link: '/func/09' },
                { text: '10 实战', link: '/func/10' },
            ]
        }
    ]
}