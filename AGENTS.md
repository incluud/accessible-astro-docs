# Accessible Astro Docs

Official documentation website for the Accessible Astro Projects, built with Astro Starlight.

## Project Overview

- **Type**: Documentation site
- **Framework**: Astro with Starlight theme
- **Homepage**: https://accessible-astro.incluud.dev
- **Repository**: https://github.com/incluud/accessible-astro-docs

Check `package.json` for current version and all dependencies.

### Key Dependencies

- `astro` - Framework (Astro 5.x+)
- `@astrojs/starlight` - Documentation framework
- `accessible-astro-components` - For live component examples
- `@astrojs/vue` - Vue integration for interactive examples
- `@astrojs/tailwind` - Tailwind CSS support
- `astro-icon` - Icon system (using Ion and MDI icon sets)
- `@sentry/astro` - Error tracking and monitoring
- `dotenv` - Environment variable management

## Project Purpose

This is the **comprehensive documentation hub** for the Accessible Astro ecosystem:

- **Audience**: Developers using Accessible Astro projects
- **Scope**: Documents all three main projects:
  - Accessible Astro Components (component library)
  - Accessible Astro Starter (starter theme)
  - Accessible Astro Dashboard (dashboard theme)
- **Content**: Getting started guides, component API docs, contributing guidelines, accessibility testing

## Dev Environment Setup

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Environment variables**:
   Create a `.env` file in the root:

   ```bash
   GITHUB_TOKEN=your_github_token_here
   SENTRY_DSN=your_sentry_dsn
   SENTRY_ENVIRONMENT=development
   SENTRY_PROJECT=your_project
   SENTRY_AUTH_TOKEN=your_auth_token
   ```

3. **Start dev server**:

   ```bash
   npm run dev
   # or
   npm start
   ```

   Server starts at `http://localhost:4321`

4. **Build production site**:

   ```bash
   npm run build
   ```

   Output: `./dist/`

5. **Preview production build**:
   ```bash
   npm run preview
   ```

### Workspace Development (Symlinked Components)

This project can work with locally linked `accessible-astro-components`:

- The `astro.config.mjs` automatically detects symlinked packages
- When symlinks are detected, it enables auto-reload on component changes

**To link local components**:

```bash
cd ../accessible-astro-components
npm link
cd ../accessible-astro-docs
npm link accessible-astro-components
```

## Documentation Structure

```
src/
├── content/
│   └── docs/                    # All documentation content (MDX)
│       ├── index.mdx            # Homepage
│       ├── getting-started/     # Onboarding guides
│       │   ├── introduction.mdx
│       │   ├── accessibility.mdx
│       │   ├── accessibility-testing.mdx
│       │   ├── quick-start.mdx
│       │   └── installation.mdx
│       ├── themes/              # Theme documentation
│       │   ├── accessible-astro-starter.mdx
│       │   └── accessible-astro-dashboard.mdx
│       ├── components/          # Component API docs (one per component)
│       │   ├── overview.mdx
│       │   ├── [component-name].mdx
│       │   └── ... (check sidebar config for full list)
│       ├── contributing/        # Contribution guides
│       │   ├── how-to.mdx
│       │   ├── development.mdx
│       │   ├── style-guide.mdx
│       │   ├── issues.mdx
│       │   └── support-us.mdx
│       └── resources/           # Additional resources
│           └── showcases.mdx
├── components/                  # Custom components for docs
│   └── ... (Vue and Astro components for interactive examples)
├── assets/                      # Static assets
│   ├── logo-dark.svg
│   ├── logo-light.svg
│   ├── incluud.svg
│   └── scripts/
│       └── pixel-canvas.js      # For interactive demos
├── styles/
│   └── custom.css               # Custom styles extending Starlight
├── utils/
│   └── github.ts                # GitHub API utilities (contributors, etc.)
└── content.config.ts            # Content collections config

public/
├── favicon.svg
├── *-profile.png                # Team member profiles
├── social-preview-image.png
└── _redirects                   # Netlify redirects
```

The complete documentation structure is defined in the sidebar configuration within `astro.config.mjs`.

## Code Style Guidelines

### MDX Content

- Use Starlight's built-in components when possible
- Follow consistent heading hierarchy (start with h2)
- Include code examples for every component
- Add "Try it yourself" interactive examples where applicable
- Use badges for component status (`new`, `beta`, `updated`, `next`)

### Formatting

- **Prettier** configured with `prettier-plugin-astro`
- Run format manually: `npx prettier --write .`

### Component Examples

- Import actual components from `accessible-astro-components`
- Provide both live examples and code snippets
- Show common use cases and variations
- Highlight accessibility features

## Starlight Configuration

The docs are built with Starlight, configured in `astro.config.mjs`:

### Key Configuration

- **Title**: "Accessible Astro Documentation"
- **Logo**: Light/dark variants (`src/assets/logo-*.svg`)
- **Social Links**: Bluesky, GitHub, Open Collective
- **Edit Link**: Points to GitHub repo for easy contributions
- **Custom CSS**: `src/styles/custom.css`
- **Custom Head**: `src/components/Head.astro` for meta tags

### Sidebar Structure

The sidebar is configured in `astro.config.mjs`. Check there for the current, complete structure. Major sections include:

1. **Getting Started**: Onboarding guides and accessibility info
2. **Themes**: Starter and Dashboard documentation
3. **Components**: All components with status badges
4. **Contributing**: How to contribute, development setup, style guide
5. **Resources**: Site showcases and community projects

### Component Status Badges

Starlight badges indicate component status in the sidebar:

- **new** (success variant): Recently added components
- **beta** (danger variant): Still in active development
- **updated** (note variant): Recently updated with new features
- **next** (tip variant): Planned for future release

Check `astro.config.mjs` sidebar config to see which components have which badges.

## Working with Documentation

### Adding New Component Documentation

1. Create `[component-name].mdx` in `src/content/docs/components/`
2. Add to sidebar in `astro.config.mjs`
3. Include:
   - Overview and use cases
   - Installation (already included via package)
   - Props/API documentation
   - Code examples (both source and live)
   - Accessibility features
   - Best practices
4. Add badge if appropriate (`new`, `beta`, `updated`)

### Updating Existing Documentation

1. Edit the relevant `.mdx` file in `src/content/docs/`
2. Update examples if component API changed
3. Add migration notes if breaking changes
4. Update "last updated" badge if significant changes

### Adding Interactive Examples

1. Create Vue or Astro component in `src/components/`
2. Import in MDX file
3. Wrap in proper container for styling
4. Ensure example is accessible and demonstrates key features

## Environment Variables

Required environment variables (in `.env`):

- `GITHUB_TOKEN`: For GitHub API access (contributor data, etc.)
- `SENTRY_DSN`: For error tracking
- `SENTRY_ENVIRONMENT`: `development` or `production`
- `SENTRY_PROJECT`: Sentry project name
- `SENTRY_AUTH_TOKEN`: For uploading source maps

## Deployment

This site is deployed to **Netlify**:

- Build command: `npm run build`
- Publish directory: `dist`
- Redirects configured in `public/_redirects`
- Environment variables set in Netlify dashboard
- Auto-deploys on push to main branch

### Sentry Integration

- Error tracking enabled via `@sentry/astro`
- Source maps uploaded automatically in production
- Configure environment in `.env`

## Testing Documentation

### Content Review

- Check all links work (internal and external)
- Verify code examples are correct and runnable
- Test interactive examples in browser
- Ensure consistent formatting and style
- Check for typos and grammar

### Accessibility

- Test with keyboard navigation
- Verify heading hierarchy is correct
- Check color contrast in custom components
- Test with screen reader (VoiceOver, NVDA)
- Verify skip links work
- Check mobile responsiveness

### Build Testing

1. Run `npm run build` - should complete without errors
2. Run `npm run preview` - check all pages load
3. Test search functionality
4. Verify all images load
5. Check console for errors

## Commit Guidelines

Follow conventional commits format:

```
type(scope): subject

[optional body]
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Scopes**: Use section or component name (e.g., `accordion`, `getting-started`, `contributing`)

**Examples**:

- `docs(button): add new variant examples`
- `feat(examples): add interactive badge demo`
- `fix(sidebar): correct component ordering`
- `docs(accessibility): update testing guidelines`
- `style(homepage): improve hero section`

## PR Instructions

- **Title format**: `[docs] Brief description`
- **Check before submitting**:
  - Run `npm run build` - no errors
  - Preview changes locally with `npm run preview`
  - Check all code examples are correct
  - Verify links work
  - Test interactive examples
  - Check mobile responsiveness
  - Verify no broken images
  - Run `npx prettier --write .` for formatting
- **Include in PR description**:
  - What documentation changed
  - Why the change was needed
  - Which pages are affected
  - Screenshots for visual changes
  - Related component or theme (if applicable)

## Troubleshooting

### Symlinked Components Not Updating

1. Check if symlink is detected: Look for "Workspace detected" message on dev server start
2. Verify symlink: `ls -la node_modules/accessible-astro-components`
3. Restart dev server
4. Clear cache: `rm -rf node_modules/.astro node_modules/.vite`

### Build Failures

1. Check all MDX files have valid frontmatter
2. Verify all imports in MDX files are correct
3. Clear cache: `rm -rf node_modules/.astro node_modules/.vite`
4. Reinstall: `rm -rf node_modules && npm install`
5. Check Node version compatibility (Node 18+)

### Search Not Working

1. Search is built-in to Starlight
2. Verify no JavaScript errors in console
3. Check search index is generated during build
4. Clear browser cache

### Sentry Errors

1. Verify environment variables are set correctly
2. Check Sentry DSN is valid
3. Confirm auth token has correct permissions
4. Check Sentry project exists

## Related Projects

This documentation site covers:

- **[Accessible Astro Components](https://github.com/incluud/accessible-astro-components)**: Component library
- **[Accessible Astro Starter](https://github.com/incluud/accessible-astro-starter)**: Starter theme
- **[Accessible Astro Dashboard](https://github.com/incluud/accessible-astro-dashboard)**: Dashboard theme

## Resources

- [Starlight Documentation](https://starlight.astro.build/)
- [Astro Documentation](https://docs.astro.build/)
- [MDX Documentation](https://mdxjs.com/)
- [WCAG 2.2 Guidelines](https://www.w3.org/TR/WCAG22/)
- [Project Roadmap](https://github.com/orgs/incluud/projects/4/views/1)
