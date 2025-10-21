// =============================
// File: src/components/toast/ToastContext.jsx
// Lightweight, dependency-free toast system (Tailwind + React)
// =============================
import React, { createContext, useCallback, useContext, useMemo, useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, AlertTriangle, Info } from "lucide-react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback((toast) => {
    const id = ++idRef.current;
    const { title, description, variant = "success", duration = 3000 } = toast || {};
    const t = { id, title, description, variant, duration };
    setToasts((prev) => [...prev, t]);
    return id;
  }, []);

  const api = useMemo(() => ({ push, remove: removeToast }), [push, removeToast]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <ToastViewport toasts={toasts} onClose={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}

function ToastViewport({ toasts, onClose }) {
  const container = useRef(null);
  if (!container.current && typeof document !== "undefined") {
    const el = document.createElement("div");
    el.setAttribute("id", "toast-portal");
    document.body.appendChild(el);
    container.current = el;
  }
  if (!container.current) return null;

  return createPortal(
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[1000] w-full max-w-md px-4 sm:px-0">
      <div className="flex flex-col gap-2">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onClose={onClose} />
        ))}
      </div>
    </div>,
    container.current
  );
}

function ToastItem({ toast, onClose }) {
  const { id, title, description, variant, duration } = toast;
  const [closing, setClosing] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const tickDelay = 40; // ~25fps
    const steps = Math.ceil(duration / tickDelay);
    let current = 0;
    const iv = setInterval(() => {
      current += 1;
      const pct = Math.max(0, 100 - (current / steps) * 100);
      setProgress(pct);
      if (current >= steps) {
        clearInterval(iv);
        handleClose();
      }
    }, tickDelay);
    return () => clearInterval(iv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, duration]);

  function handleClose() {
    setClosing(true);
    setTimeout(() => onClose(id), 180);
  }

  const styles = variantStyles[variant] || variantStyles.info;
  const Icon = styles.icon;

  return (
    <div
      className={`${styles.base} ${closing ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'} transition-all duration-200 shadow-lg rounded-xl border flex gap-3 p-3 bg-white/95 backdrop-blur`}
      role="status"
      aria-live="polite"
    >
      <div className={`${styles.iconWrap}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        {title ? <p className="font-medium text-gray-900 truncate">{title}</p> : null}
        {description ? <p className="text-sm text-gray-600 break-words">{description}</p> : null}
        <div className="mt-2 h-1.5 w-full rounded-full bg-gray-200 overflow-hidden">
          <div
            className={`${styles.progress}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <button
        onClick={handleClose}
        className="shrink-0 px-2 py-1 text-sm text-gray-500 hover:text-gray-700"
        aria-label="Kapat"
      >
        ×
      </button>
    </div>
  );
}

const variantStyles = {
  success: {
    base: "border-green-200",
    iconWrap: "text-green-600",
    progress: "h-1.5 bg-green-500 transition-[width] duration-75",
    icon: CheckCircle2,
  },
  error: {
    base: "border-red-200",
    iconWrap: "text-red-600",
    progress: "h-1.5 bg-red-500 transition-[width] duration-75",
    icon: AlertTriangle,
  },
  info: {
    base: "border-blue-200",
    iconWrap: "text-blue-600",
    progress: "h-1.5 bg-blue-500 transition-[width] duration-75",
    icon: Info,
  },
  warning: {
    base: "border-amber-200",
    iconWrap: "text-amber-600",
    progress: "h-1.5 bg-amber-500 transition-[width] duration-75",
    icon: AlertTriangle,
  },
};


/// =============================
// File: src/pages/ToastDemo.jsx
