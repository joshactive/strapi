# Strapi CMS Agent Instructions

## Modern Web Guidance

For browser-facing changes to custom Strapi admin screens and plugins, find
the relevant guide by searching for the interaction or platform behaviour. Use
the
[guide catalogue](https://developer.chrome.com/docs/modern-web-guidance/guides) or the CLI's
[`search` and `retrieve` commands](https://developer.chrome.com/docs/modern-web-guidance/get-started#explore_before_installation).

- Prefer semantic HTML and native CSS or browser APIs when they meet the
  interaction and accessibility requirements. Check [Baseline](https://web.dev/baseline)
  and the project's supported browsers before adopting a feature.
- Use progressive enhancement when support is incomplete. Keep core content
  and actions usable, use feature detection where needed, and test the native
  and fallback paths in the relevant browsers. Check keyboard and focus
  behaviour for interactive controls.
- Use [`legacy-scan`](https://developer.chrome.com/docs/modern-web-guidance/modernization-workflow)
  for requested modernisation work. Verify findings in context and preserve
  deliberate compatibility fallbacks.
