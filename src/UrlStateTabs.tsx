"use client";

import React, { useState, useEffect } from "react";
import { Box, Tabs, Tab, BoxProps, TabsProps } from "@mui/material";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export interface TabConfig {
  label: string | React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface UrlStateTabsProps {
  tabs: TabConfig[];
  defaultTab?: number;
  queryParamName?: string;
  tabsProps?: Partial<TabsProps>;
  containerProps?: BoxProps;
  onTabChange?: (newTab: number) => void;
  children?: (activeTab: number) => React.ReactNode;
}

const UrlStateTabs: React.FC<UrlStateTabsProps> = ({
  tabs,
  defaultTab = 0,
  queryParamName = "currentTab",
  tabsProps,
  containerProps,
  onTabChange,
  children,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    const tabParam = searchParams.get(queryParamName);
    if (tabParam) {
      const tabNumber = parseInt(tabParam, 10);
      if (tabNumber >= 0 && tabNumber < tabs.length) {
        setActiveTab(tabNumber);
      }
    }
  }, [searchParams, queryParamName, tabs.length]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    router.push(`${pathname}?${queryParamName}=${newValue}`);
    if (onTabChange) {
      onTabChange(newValue);
    }
  };

  return (
    <>
      {children && children(activeTab)}
      <Box {...containerProps}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="url state tabs"
            {...tabsProps}
          >
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                label={tab.label}
                disabled={tab.disabled}
              />
            ))}
          </Tabs>
        </Box>

        <Box component="main">
          {tabs[activeTab]?.content}
        </Box>
      </Box>
    </>
  );
};

export default UrlStateTabs;
