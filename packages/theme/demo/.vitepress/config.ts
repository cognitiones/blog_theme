import path from 'path'
import { getThemeConfig, defineConfig } from '../../src/node'
import packageJSON from '../../package.json'

const blogTheme = getThemeConfig({
    friend: [
        {
            nickname: '99℃白开水',
            des: '个人博客',
            avatar:
                'http://cdn.chen-zeqi.cn/logo.jpg',
            url: 'https://sugarat.top'
        },
        {
            nickname: '@99_water/module',
            des: 'a vue module',
            avatar:
                'http://cdn.chen-zeqi.cn/logo.jpg',
            url: 'https://vitepress.vuejs.org/'
        }
    ],
    // 文章默认作者
    author: '粥里有勺糖',
    // 评论
    comment: {
        repo: 'ATQQ/sugar-blog',
        repoId: 'MDEwOlJlcG9zaXRvcnkyNDEyNDUyOTk',
        category: 'Announcements',
        categoryId: 'DIC_kwDODmEcc84COVc6',
        inputPosition: 'top'
    },
    popover: {
        title: '公告',
        body: [
            { type: 'text', content: '👇公众号👇---👇 微信 👇' },
            {
                type: 'image',
                src: 'https://img.cdn.sugarat.top/mdImg/MTYxNTAxODc2NTIxMA==615018765210'
            },
            {
                type: 'text',
                content: '欢迎大家私信交流'
            },
            {
                type: 'button',
                content: '博客',
                link: 'https://sugarat.top'
            }
        ],
        duration: 0
    }
})
const extraHead: any =
    process.env.NODE_ENV === 'production'
        ? [
            [
                'script',
                {
                    charset: 'UTF-8',
                    id: 'LA_COLLECT',
                    src: '//sdk.51.la/js-sdk-pro.min.js'
                }
            ],
            [
                'script',
                {},
                'LA.init({id:"Jyzk2AcXA3JsYbrG",ck:"Jyzk2AcXA3JsYbrG",hashMode:true})'
            ]
        ]
        : []

export default defineConfig({
    lang: 'zh-cmn-Hans',
    title: '@99_water/theme',
    head: [...extraHead],
    vite: {
        server: {
            host: '0.0.0.0'
        }
    },
    themeConfig: {
        ...blogTheme,
        nav: [],
        socialLinks: [
            {
                icon: 'github',
                link: 'https://github.com/ATQQ/sugar-blog/tree/master/packages/theme'
            }
        ],
        lastUpdatedText: '上次更新于'
    }
})
