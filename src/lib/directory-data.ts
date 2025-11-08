"use client";

import { useCallback, useEffect, useState } from "react";

export type DirectoryType = "centers" | "doctors" | "labs";

export interface DirectoryItem {
  id: string;
  title: string;
  subtitle: string;
  description?: string;
  imageUrl: string;
  location: string;
  rating?: number;
  reviewCount?: number;
  tags: string[];
  services: string[];
  phone?: string;
  directionsUrl?: string;
  appointmentUrl?: string;
  additionalInfo?: string;
  createdAt: string;
}

const STORAGE_KEYS: Record<DirectoryType, string> = {
  centers: "jkhealth_directory_centers",
  doctors: "jkhealth_directory_doctors",
  labs: "jkhealth_directory_labs",
};

const EMPTY_LIST: DirectoryItem[] = [];

export function getDirectoryItems(type: DirectoryType): DirectoryItem[] {
  if (typeof window === "undefined") return EMPTY_LIST;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS[type]);
    if (!raw) return EMPTY_LIST;

    const parsed = JSON.parse(raw) as DirectoryItem[];
    if (!Array.isArray(parsed)) return EMPTY_LIST;

    return parsed
      .map((item) => ({
        ...item,
        tags: item.tags?.filter(Boolean) ?? [],
        services: item.services?.filter(Boolean) ?? [],
      }))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    console.error(`Failed to read ${type} directory data`, error);
    return EMPTY_LIST;
  }
}

export function setDirectoryItems(type: DirectoryType, items: DirectoryItem[]) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(STORAGE_KEYS[type], JSON.stringify(items));
  window.dispatchEvent(
    new CustomEvent("jkhealth:data-updated", {
      detail: { type },
    }),
  );
}

export function addDirectoryItem(type: DirectoryType, item: DirectoryItem) {
  const items = getDirectoryItems(type);
  setDirectoryItems(type, [item, ...items]);
}

export function removeDirectoryItem(type: DirectoryType, id: string) {
  const items = getDirectoryItems(type).filter((item) => item.id !== id);
  setDirectoryItems(type, items);
}

export function clearDirectory(type: DirectoryType) {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEYS[type]);
  window.dispatchEvent(
    new CustomEvent("jkhealth:data-updated", {
      detail: { type },
    }),
  );
}

export function stringToList(value: string): string[] {
  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export function createDirectoryItemId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `item-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

export function useDirectoryData(type: DirectoryType) {
  const [items, setItems] = useState<DirectoryItem[]>(EMPTY_LIST);

  const refresh = useCallback(() => {
    setItems(getDirectoryItems(type));
  }, [type]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    const listener = (event: Event) => {
      const customEvent = event as CustomEvent<{ type: DirectoryType }>;
      if (customEvent.detail?.type === type) {
        refresh();
      }
    };

    window.addEventListener("jkhealth:data-updated", listener);
    return () => window.removeEventListener("jkhealth:data-updated", listener);
  }, [type, refresh]);

  return { items, refresh };
}

declare global {
  interface WindowEventMap {
    "jkhealth:data-updated": CustomEvent<{ type: DirectoryType }>;
  }
}
