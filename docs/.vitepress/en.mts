import { defineConfig } from 'vitepress';

export const en = defineConfig({
  lang: 'en',
  description: 'Headless video library for React.',
  themeConfig: {
    nav: [
      {
        text: 'Home',
        link: '/en',
      },
    ],
  },
});
