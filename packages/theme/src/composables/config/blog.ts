import { useData, useRoute } from 'vitepress'
import {
    Component,
    computed,
    defineComponent,
    h,
    inject,
    InjectionKey,
    provide,
    ref
} from 'vue'
import type { Theme } from './index'

const configSymbol = 'theme-config'
const activeTagSymbol = 'active-tag'

export function withConfigProvider(App: Component) {
    return defineComponent({
        name: 'ConfigProvider',
        setup(props, { slots }) {
            const { theme } = useData()
            const config = computed(() => resolveConfig(theme.value))
            provide(configSymbol, config)
            
            const activeTag = ref("")
            provide(activeTagSymbol, activeTag)
            return () => h(App, null, slots)
        }
    })
}

export function useConfig() {
    return {
        config: inject(configSymbol)!.value
    }
}

export function useBlogConfig() {
    return inject(configSymbol)!.value.blog
}

export function useActiveTag() {
    return inject(activeTagSymbol)!
}

export function useArticles() {
    const blogConfig = useConfig()
    const articles = computed(() => blogConfig.config?.blog?.pagesData || [])

    return articles
}

function resolveConfig(config: Theme.Config): Theme.Config {
    return {
        ...config,
        blog: {
            ...config?.blog,
            pagesData: config?.blog?.pagesData || []
        }
    }
}
