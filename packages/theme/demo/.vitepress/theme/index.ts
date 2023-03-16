import BlogTheme from '../../../src/index'
import { h } from 'vue'


export default {
  ...BlogTheme,
  Layout: h(BlogTheme.Layout)
}
