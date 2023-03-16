import { DefaultTheme } from 'vitepress'

export namespace BlogPopover {
    export interface Title {
        type: 'title'
        content: string
        style?: string
    }

    export interface Text {
        type: 'text'
        content: string
        style?: string
    }

    export interface Image {
        type: 'image'
        src: string
        style?: string
    }

    export type Value = Title | Text | Image
}

export namespace Theme {
    export interface PageMeta {
        title: string
        date: string
        tag?: string[]
        description?: string
        cover?: string
        sticky?: number
        author?: string
        hidden?: boolean
        layout?: string
        // old
        categories: string[]
        tags: string[]
        /**
         * 文章首页置顶
         */
        top?: number
        /**
         * 手动控制相关文章列表的顺序
         */
        recommend?: number | false
        // TODO: 待开发
        /**
         * 时间线
         */
        timeline: string
        /**
         * 专栏&合集
         */
        album: string
    }
    export interface PageData {
        route: string
        meta: PageMeta
    }
    export interface activeTag {
        label: string
        type: string
    }

    export interface GiscusConfig {
        repo: string
        repoId: string
        category: string
        categoryId: string
        mapping?: string
        inputPosition?: 'top' | 'bottom'
        lang?: string
        loading?: 'lazy' | 'auto' | 'eager'
    }

    export interface HotArticle {
        title?: string
        pageSize?: number
        nextText?: string
        empty?: string | boolean
    }
    export interface RecommendArticle {
        title?: string
        pageSize?: number
        nextText?: string
        empty?: string | boolean
    }

    export interface HomeBlog {
        name?: string
        motto?: string
        inspiring?: string
        pageSize?: number
    }

    export interface ArticleConfig {
        readingTime?: boolean
    }
    export interface Alert {
        type: 'success' | 'warning' | 'info' | 'error'
        /**
         * 细粒度的时间控制
         * 默认展示时间，-1 只展示1次，其它数字为每次都展示，一定时间后自动消失，0为不自动消失
         * 配置改变时，会重新触发展示
         */
        duration: number
        title?: string
        description?: string
        closable?: boolean
        center?: boolean
        closeText?: string
        showIcon?: boolean
        html?: string
    }

    export interface Popover {
        title: string
        /**
         * 细粒度的时间控制
         * 默认展示时间，-1 只展示1次，其它数字为每次都展示，一定时间后自动消失，0为不自动消失
         * 配置改变时，会重新触发展示
         */
        duration: number
        body?: BlogPopover.Value[]
        footer?: BlogPopover.Value[]
        /**
         * 手动重新打开
         */
        reopen?: boolean
    }
    export interface FriendLink {
        nickname: string
        des: string
        url: string
        avatar: string
    }
    export interface BlogConfig {
        blog?: false
        pagesData: PageData[]
        srcDir?: string
        author?: string
        hotArticle?: HotArticle
        home?: HomeBlog
        // TODO: 本地全文搜索定制 pagefind || minisearch
        search?: boolean
        /**
         * 配置评论
         * power by https://giscus.app/zh-CN
         */
        comment?: GiscusConfig | false
        recommend?: RecommendArticle
        article?: ArticleConfig
        /**
         * el-alert
         */
        alert?: Alert
        popover?: Popover
        friend?: FriendLink[]
    }

    export interface Config extends DefaultTheme.Config {
        blog: BlogConfig
    }
    export interface HomeConfig {
        handleChangeSlogan?: (oldSlogan: string) => string | Promise<string>
    }
}
