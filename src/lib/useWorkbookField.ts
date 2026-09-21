"use client";

import { useEffect, useRef, useState } from "react";

const CACHE_PREFIX = "edithappp:workbook:";

async function saveRemote(key: string, data: unknown) {
  try {
    await fetch("/api/workbook", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ key, data }),
    });
  } catch {}
}

let workbookPromise: Promise<Record<string, unknown>> | null = null;
function loadWorkbook(): Promise<Record<string, unknown>> {
  if (!workbookPromise) {
    workbookPromise = fetch("/api/workbook")
      .then((r) => (r.ok ? r.json() : { workbook: {} }))
      .then((j) => (j.workbook ?? {}) as Record<string, unknown>)
      .catch(() => ({}));
  }
  return workbookPromise;
}

export function useWorkbookField<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [loaded, setLoaded] = useState(false);
  const skipSave = useRef(true);

  useEffect(() => {
    let cancelled = false;
    try {
      const cached = localStorage.getItem(CACHE_PREFIX + key);
      if (cached) setValue(JSON.parse(cached));
    } catch {}
    loadWorkbook().then((wb) => {
      if (cancelled) return;
      if (wb && Object.prototype.hasOwnProperty.call(wb, key)) {
        setValue(wb[key] as T);
      }
      setLoaded(true);
    });
    return () => {
      cancelled = true;
    };
  }, [key]);

  useEffect(() => {
    if (!loaded) return;
    if (skipSave.current) {
      skipSave.current = false;
      return;
    }
    try {
      localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(value));
    } catch {}
    const t = setTimeout(() => saveRemote(key, value), 600);
    return () => clearTimeout(t);
  }, [loaded, key, value]);

  return [value, setValue, loaded] as const;
}
