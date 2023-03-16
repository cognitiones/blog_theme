// override style
import './styles/index.scss'

import { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import BlogApp from './components/BlogApp.vue'
import { withConfigProvider } from './composables/config/blog'

export const BlogTheme: Theme = {
  ...DefaultTheme,
  Layout: withConfigProvider(BlogApp)
}

export * from './composables/config/index'

export default BlogTheme
