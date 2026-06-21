'use client';

import { createContext, useCallback, useContext, useRef, useState } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const timer = useRef(null);

  const flash = useCallback((msg) => {
    setToast(msg);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 2200);
  }, []);

  return (
    <ToastContext.Provider value={{ flash }}>
      {children}
      {toast && (
        <div
          className="fixed bottom-7 left-1/2 z-[200] -translate-x-1/2 animate-fadeUp rounded-full bg-[#16382E] px-5 py-3 text-sm font-semibold text-white shadow-float"
          role="status"
        >
          {toast}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  return ctx || { flash: () => {} };
}
