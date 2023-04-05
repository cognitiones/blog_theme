import BlogTheme from '@99_water/theme';
// import water from '@99_water/module';
import './index.scss';

export default {
  ...BlogTheme,
  enhanceApp: async ({ app }) => {
    // app is the Vue 3 app instance from `createApp()`. router is VitePress'
    // custom router. `siteData`` is a `ref`` of current site-level metadata.
    // app.use(water)
  },
};