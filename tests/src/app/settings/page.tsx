"use client";

import React, { useState } from "react";
import { UrlStateTabs } from "@pamfilico/nextjs-url-tabs";

export default function SettingsPage() {
  const [lastChanged, setLastChanged] = useState<number | null>(null);

  return (
    <div style={{ padding: 24 }}>
      <h1>Settings Tabs</h1>
      <div data-testid="last-changed">{lastChanged !== null ? `changed:${lastChanged}` : "none"}</div>
      <UrlStateTabs
        queryParamName="tab"
        onTabChange={(n) => setLastChanged(n)}
        tabs={[
          { label: "General", content: <div data-testid="settings-0">General Settings</div> },
          { label: "Disabled", content: <div data-testid="settings-1">Disabled Content</div>, disabled: true },
          { label: "Advanced", content: <div data-testid="settings-2">Advanced Settings</div> },
        ]}
      />
    </div>
  );
}
