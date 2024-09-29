import { defineConfig } from 'vitepress';
import { en } from './en.mts';
import { ko } from './ko.mts';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Reactjs Video',
  description: 'Headless video library for React.',
  locales: {
    root: {
      label: 'English',
      ...en,
    },
    ko: {
      label: '한국어',
      ...ko,
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
  },
});
