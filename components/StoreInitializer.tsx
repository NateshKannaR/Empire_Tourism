'use client';

import { useEffect } from 'react';
import { store } from '@/lib/store';

export default function StoreInitializer() {
  useEffect(() => {
    store.initialize();
  }, []);

  return null;
}
