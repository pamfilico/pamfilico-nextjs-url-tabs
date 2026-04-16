"use client";

import React, { Suspense } from "react";
import { UrlStateTabs } from "@pamfilico/nextjs-url-tabs";

function HomeContent() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Basic Tabs</h1>
      <UrlStateTabs
        tabs={[
          { label: "Tab One", content: <div data-testid="content-0">Content for Tab One</div> },
          { label: "Tab Two", content: <div data-testid="content-1">Content for Tab Two</div> },
          { label: "Tab Three", content: <div data-testid="content-2">Content for Tab Three</div> },
        ]}
      />
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  );
}
