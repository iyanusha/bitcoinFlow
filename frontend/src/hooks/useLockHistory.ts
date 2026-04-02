import { useState, useCallback } from 'react';
import type { LockAction } from '../types/lock';

const STORAGE_KEY = 'vault_lock_history';

function loadFromStorage(): LockAction[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveToStorage(actions: LockAction[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(actions));
  } catch {
    // localStorage unavailable
  }
}

export interface UseLockHistoryReturn {
  history: LockAction[];
  addEntry: (action: LockAction) => void;
  clearHistory: () => void;
}

export function useLockHistory(): UseLockHistoryReturn {
  const [history, setHistory] = useState<LockAction[]>(() => loadFromStorage());

  const addEntry = useCallback((action: LockAction) => {
    setHistory(prev => {
      const next = [action, ...prev];
      saveToStorage(next);
      return next;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    saveToStorage([]);
  }, []);

  return { history, addEntry, clearHistory };
}
