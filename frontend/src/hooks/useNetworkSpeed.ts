import { useState, useEffect } from 'react';

type EffectiveType = 'slow-2g' | '2g' | '3g' | '4g' | 'unknown';

interface NetworkInfo {
  effectiveType: EffectiveType;
  downlink: number;
  rtt: number;
  saveData: boolean;
}

/**
 * Detect network speed to adapt loading strategies.
 * Uses the Network Information API when available.
 */
export function useNetworkSpeed(): NetworkInfo {
  const [info, setInfo] = useState<NetworkInfo>({
    effectiveType: 'unknown',
    downlink: 10,
    rtt: 0,
    saveData: false,
  });

  useEffect(() => {
    const nav = navigator as Navigator & {
      connection?: {
        effectiveType: EffectiveType;
        downlink: number;
        rtt: number;
        saveData: boolean;
        addEventListener: (type: string, fn: () => void) => void;
        removeEventListener: (type: string, fn: () => void) => void;
      };
    };

    const conn = nav.connection;
    if (!conn) return;

    const update = () => {
      setInfo({
        effectiveType: conn.effectiveType,
        downlink: conn.downlink,
        rtt: conn.rtt,
        saveData: conn.saveData,
      });
    };

    update();
    conn.addEventListener('change', update);
    return () => conn.removeEventListener('change', update);
  }, []);

  return info;
}
