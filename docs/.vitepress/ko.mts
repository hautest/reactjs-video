import { defineConfig } from 'vitepress';

export const ko = defineConfig({
  lang: 'ko',
  description: 'React를 위한 헤드리스 비디오 컴포넌트',
  themeConfig: {
    nav: [
      {
        text: '홈',
        link: '/ko',
      },
      {
        text: '가이드',
        link: '/ko/intro',
      },
      {
        text: '레퍼런스',
        link: '/ko/reference',
      },
    ],
    sidebar: [
      {
        text: '가이드',
        items: [
          {
            text: '소개',
            link: '/ko/intro',
          },
          {
            text: '시작하기',
            link: '/ko/getting-started',
          },
          {
            text: '예제',
            link: '/ko/examples',
          },
        ],
      },
    ],
  },
});
