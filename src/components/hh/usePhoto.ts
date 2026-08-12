import { useCallback, useEffect, useRef, useState } from "react";
import { normalizePhoto } from "@/lib/hh/normalize";
import { DEFAULT_FOCUS, detectFocus, type Focus } from "@/lib/hh/face";
import { upload } from '@vercel/blob/client';

export type FlowState = "initial" | "uploading" | "photo-selected" | "generating" | "generated";

export function usePhoto() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [focus, setFocus] = useState<Focus>(DEFAULT_FOCUS);
  const [state, setState] = useState<FlowState>("initial");
  const [error, setError] = useState<string | null>(null);
  const objectUrls = useRef<string[]>([]);

const select = useCallback(async (file: File) => {
  setError(null);
  setState("uploading");

  try {
    console.log("Selected file:", file.name, file.type, file.size);

    // First create a direct browser preview.
    const previewUrl = URL.createObjectURL(file);
    setPhoto(previewUrl);

    // Then normalize it for the rest of your application.
    const normalized = await normalizePhoto(file);

    console.log("Normalized:", normalized.width, normalized.height);

    const blob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/upload', // You will need a standard Vercel route here to verify tokens
      });
      
      console.log("Uploaded to cloud! URL:", blob.url);

    // Use normalized image after successful processing.
setPhoto(blob.url); 
      setFocus(DEFAULT_FOCUS);
      setState("photo-selected");

      const next = await detectFocus(normalized.canvas);
      setFocus(next);

      setState("generated");
    } catch (err) {
      console.error("PHOTO ERROR:", err);
      setError(
        err instanceof Error
          ? `${err.name}: ${err.message}`
          : "Could not read that image."
      );
      setState("initial");
    }
  }, []);

  useEffect(() => {
    return () => {
      objectUrls.current.forEach((u) => URL.revokeObjectURL(u));
      objectUrls.current = [];
    };
  }, []);

  return { photo, focus, state, setState, select, error };
}

const TITLES = [
  "SHIPWRECK ARCHITECT",
  "MONSOON DEBUGGER",
  "SUNSET REFACTORER",
  "COCONUT COMPILER",
  "TIDE PUSHER",
  "BEACHSIDE SYSADMIN",
];

export function randomTitle(current?: string) {
  const pool = TITLES.filter((t) => t !== current);
  return pool[Math.floor(Math.random() * pool.length)]!;
}

export function serialFor(name: string) {
  const seed = [...(name || "hhgoa")].reduce((a, c) => a + c.charCodeAt(0), 0);
  return `HHG26-${(seed % 9) + 1}K${(seed % 7) + 1}-${String(691 + (seed % 300)).padStart(5, "0")}`;
}
