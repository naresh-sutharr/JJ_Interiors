import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

/**
 * A hook that syncs a single Firestore document containing an entire collection (or object)
 * as a drop-in replacement for localStorage state.
 * @param key The document ID in the "store" collection.
 * @param initialData The default data if the document doesn't exist.
 */
export function useFirestoreSync<T>(key: string, initialData: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(initialData);

  // Subscribe to real-time updates
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'store', key), (docSnap) => {
      if (docSnap.exists()) {
        setState(docSnap.data().data);
      } else {
        // If it doesn't exist, seed it with the initialData
        // Only seed if we are on the client (prevents SSR issues if any)
        setDoc(doc(db, 'store', key), { data: initialData }).catch(console.error);
      }
    }, (error) => {
      console.error(`Firestore sync error for ${key}:`, error);
    });

    return () => unsub();
  }, [key]);

  // Provide a setter that updates Firestore (which will then update local state via onSnapshot)
  const setSyncedState = (value: React.SetStateAction<T>) => {
    setState((prev) => {
      const next = typeof value === 'function' ? (value as Function)(prev) : value;
      setDoc(doc(db, 'store', key), { data: next }).catch(console.error);
      return next;
    });
  };

  return [state, setSyncedState];
}
