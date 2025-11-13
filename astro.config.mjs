// @ts-check
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import icon from 'astro-icon'
import sentry from '@sentry/astro'
import dotenv from 'dotenv'
import vue from '@astrojs/vue'
import { existsSync, lstatSync } from 'fs'
import { resolve } from 'path'
import { watch } from 'fs'

dotenv.config()

// Check if we're using a symlinked/workspace setup
const componentsPath = resolve('./node_modules/accessible-astro-components')
const isLinked = existsSync(componentsPath) && lstatSync(componentsPath).isSymbolicLink()

// Base Vite config
const viteConfig = {
  // Make environment variables available to client-side code
  define: {
    'import.meta.env.GITHUB_TOKEN': JSON.stringify(process.env.GITHUB_TOKEN),
  },
}

// Add workspace-specific config only when using symlinks
if (isLinked) {
  console.log('Workspace detected - enabling auto-reload for locally linked components')

  const componentsRealPath = resolve('../accessible-astro-components')

  // Essential config for symlinked packages
  viteConfig.resolve.preserveSymlinks = true
  viteConfig.server = {
    fs: {
      allow: ['..', '../..'],
    },
  }
  viteConfig.optimizeDeps = {
    exclude: ['accessible-astro-components'],
  }

  // Custom watcher for linked components - triggers reload on changes
  viteConfig.plugins.push({
    name: 'reload-on-components-change',
    configureServer(server) {
      const componentsWatchPath = resolve(componentsRealPath, 'src/components')

      const watcher = watch(componentsWatchPath, { recursive: true }, (eventType, filename) => {
        if (filename?.endsWith('.astro')) {
          console.log('Component changed:', filename, ' - reloading...')

          // Invalidate all modules from the components package
          Array.from(server.moduleGraph.urlToModuleMap.keys()).forEach((url) => {
            if (url.includes('accessible-astro-components')) {
              const mod = server.moduleGraph.urlToModuleMap.get(url)
              if (mod) server.moduleGraph.invalidateModule(mod)
            }
          })

          // Trigger full page reload
          server.ws.send({ type: 'full-reload', path: '*' })
        }
      })

      server.httpServer?.on('close', () => watcher.close())
    },
  })
}

// https://astro.build/config
export default defineConfig({
  vite: viteConfig,
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
                text: 'next',
                variant: 'tip',
              },
            },
            {
              label: 'Forms',
              link: '/components/forms',
              badge: {
                text: 'beta',
                variant: 'danger',
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
              label: 'Link',
              link: '/components/link',
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
              badge: {
                text: 'updated',
                variant: 'note',
              },
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
                text: 'next',
                variant: 'tip',
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
