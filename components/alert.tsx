'use client';

import { useEffect, useState } from 'react';

type AlertType = 'error' | 'success' | 'warning' | 'info';

interface AlertState {
  type: AlertType;
  message: string;
}

let showAlertExternal: (type: AlertType, message: string) => void = () => {};

export function useGlobalAlert() {
  return showAlertExternal;
}

export default function GlobalAlert() {
  const [alert, setAlert] = useState<AlertState | null>(null);

  useEffect(() => {
    showAlertExternal = (type: AlertType, message: string) => {
      setAlert((prev) => {
        if (prev?.message === message && prev?.type === type) return prev;
        return { type, message };
      });

      setTimeout(() => setAlert(null), 2000);
    };
  }, []);

  if (!alert) return null;

  const { type, message } = alert;

  const iconPath = {
    error: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
    success: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
    warning: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    ),
    info: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path>
    ),
  };

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-auto max-w-sm">
      <div role="alert" className={`alert alert-${type}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          {iconPath[type]}
        </svg>
        <span>{message}</span>
      </div>
    </div>
  );
}
