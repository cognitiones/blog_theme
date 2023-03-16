import { useData, useRoute } from 'vitepress'
import {
    Component,
    computed,
    defineComponent,
    h,
    inject,
    InjectionKey,
    provide,
    ref,
    Ref
} from 'vue'
import type { Theme } from './index'

const configSymbol: InjectionKey<Ref<Theme.Config>> = Symbol('theme-config')

export function withConfigProvider(App: Component) {
    return defineComponent({
        name: 'ConfigProvider',
        setup(props, { slots }) {

            const { theme } = useData()
            const config = computed(() => resolveConfig(theme.value))
            provide(configSymbol, config)

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
