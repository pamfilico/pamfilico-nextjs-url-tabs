# @pamfilico/nextjs-url-tabs

MUI Tabs component for Next.js that syncs active tab state with URL query parameters.

## Install

```bash
npm install git+https://github.com/pamfilico/pamfilico-nextjs-url-tabs.git
```

## Usage

```tsx
"use client";

import { UrlStateTabs } from "@pamfilico/nextjs-url-tabs";

export default function SettingsPage() {
  return (
    <UrlStateTabs
      tabs={[
        { label: "General", content: <div>General settings</div> },
        { label: "Billing", content: <div>Billing settings</div> },
        { label: "API Keys", content: <div>API key management</div> },
      ]}
    />
  );
}
```

Navigating to `/settings?currentTab=1` will open the "Billing" tab.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tabs` | `TabConfig[]` | required | Array of tab configurations |
| `defaultTab` | `number` | `0` | Default active tab index |
| `queryParamName` | `string` | `"currentTab"` | URL query parameter name |
| `tabsProps` | `Partial<TabsProps>` | — | Props forwarded to MUI `Tabs` |
| `containerProps` | `BoxProps` | — | Props forwarded to container `Box` |
| `onTabChange` | `(newTab: number) => void` | — | Callback when tab changes |
| `children` | `(activeTab: number) => ReactNode` | — | Render function receiving active tab index |

### TabConfig

```ts
interface TabConfig {
  label: string | React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}
```

## Peer Dependencies

- `react >= 19`
- `next >= 14`
- `@mui/material >= 5`
- `@emotion/react >= 11`
- `@emotion/styled >= 11`

## Testing

```bash
./run-tests.sh
```

Runs a dockerized Next.js test app with Playwright e2e tests.
