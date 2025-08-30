// @ts-check
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import icon from 'astro-icon'

import sentry from '@sentry/astro'
import dotenv from 'dotenv'

import vue from '@astrojs/vue'

dotenv.config()

// https://astro.build/config
export default defineConfig({
  vite: {
    // Make environment variables available to client-side code
    define: {
      'import.meta.env.GITHUB_TOKEN': JSON.stringify(process.env.GITHUB_TOKEN),
    },
  },
  integrations: [
    starlight({
      title: 'Accessible Astro Documentation',
      logo: {
        light: './src/assets/logo-light.svg',
        dark: './src/assets/logo-dark.svg',
        replacesTitle: true,
      },
      social: [
        {
          href: 'https://x.com/incluud',
          icon: 'x.com',
          label: 'Twitter',
        },
        {
          href: 'https://bsky.app/profile/incluud.dev',
          icon: 'blueSky',
          label: 'BlueSky',
        },
        {
          href: 'https://github.com/incluud',
          icon: 'seti:github',
          label: 'GitHub',
        },
        {
          href: 'https://opencollective.com/incluud',
          icon: 'openCollective',
          label: 'Open Collective',
        },
      ],
      editLink: {
        baseUrl: 'https://github.com/incluud/astro-docs/edit/main/',
      },
      components: {
        Head: './src/components/Head.astro',
      },
      sidebar: [
        {
          label: 'Getting started',
          items: [
            {
              label: 'Introduction',
              link: '/getting-started/introduction',
            },
            {
              label: 'Why accessibility matters',
              link: '/getting-started/accessibility',
            },
            {
              label: 'Accessibility testing',
              link: '/getting-started/accessibility-testing',
              badge: {
                text: 'tip',
                variant: 'note',
              },
            },
            {
              label: 'Quick start guide',
              link: '/getting-started/quick-start',
            },
            {
              label: 'Installation options',
              link: '/getting-started/installation',
            },
          ],
        },
        {
          label: 'Themes',
          items: [
            {
              label: 'Accessible Astro Starter',
              link: '/themes/accessible-astro-starter',
            },
            {
              label: 'Accessible Astro Dashboard',
              link: '/themes/accessible-astro-dashboard',
            },
          ],
        },
        {
          label: 'Components',
          items: [
            {
              label: 'Overview',
              link: '/components/overview',
            },
            {
              label: 'Accordion',
              link: '/components/accordion',
            },
            {
              label: 'Avatar',
              link: '/components/avatar',
            },
            {
              label: 'Badge',
              link: '/components/badge',
            },
            {
              label: 'Breadcrumbs',
              link: '/components/breadcrumbs',
            },
            {
              label: 'Button',
              link: '/components/button',
              badge: {
                text: 'new',
                variant: 'success',
              },
            },
            {
              label: 'Card',
              link: '/components/card',
            },
            {
              label: 'DarkMode',
              link: '/components/dark-mode',
            },
            {
              label: 'Drawer',
              link: '/components/drawer',
              badge: {
                text: 'soon',
                variant: 'caution',
              },
            },
            {
              label: 'Forms',
              link: '/components/forms',
              badge: {
                text: 'next',
                variant: 'tip',
              },
            },
            {
              label: 'Heading',
              link: '/components/heading',
              badge: {
                text: 'new',
                variant: 'success',
              },
            },
            {
              label: 'Media',
              link: '/components/media',
            },
            {
              label: 'Modal',
              link: '/components/modal',
            },
            {
              label: 'Notification',
              link: '/components/notification',
            },
            {
              label: 'Pagination',
              link: '/components/pagination',
            },
            {
              label: 'SkipLink',
              link: '/components/skip-link',
            },
            {
              label: 'Tabs',
              link: '/components/tabs',
            },
            {
              label: 'Tooltip',
              link: '/components/tooltip',
              badge: {
                text: 'soon',
                variant: 'caution',
              },
            },
            {
              label: 'Video',
              link: '/components/video',
            },
          ],
        },
        {
          label: 'Contributing',
          items: [
            {
              label: 'How to contribute',
              link: '/contributing/how-to',
            },
            {
              label: 'Development setup',
              link: '/contributing/development',
            },
            {
              label: 'Code style guide',
              link: '/contributing/style-guide',
            },
            {
              label: 'Reporting issues',
              link: '/contributing/issues',
            },
            {
              label: '❤️ Supporting the project',
              link: '/contributing/support-us',
            },
          ],
        },
        {
          label: 'Resources',
          items: [
            {
              label: 'Site showcases',
              link: '/resources/showcases',
            },
          ],
        },
      ],
      customCss: ['./src/styles/custom.css'],
    }),
    icon(),
    sentry({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.SENTRY_ENVIRONMENT,
      sourceMapsUploadOptions: {
        project: process.env.SENTRY_PROJECT,
        authToken: process.env.SENTRY_AUTH_TOKEN,
      },
    }),
    vue(),
  ],
})
