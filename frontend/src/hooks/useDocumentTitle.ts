import { useEffect, useRef } from 'react';

export function useDocumentTitle(title: string, restoreOnUnmount = true) {
  const previousTitleRef = useRef(document.title);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    const savedTitle = previousTitleRef.current;
    return () => {
      if (restoreOnUnmount) {
        document.title = savedTitle;
      }
    };
  }, [restoreOnUnmount]);
}
