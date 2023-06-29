import { useContext } from 'react';
import { LiveDemoContext } from './LiveDemoContext';

/**
 * Consumes the LiveDemoContext.
 *
 * @returns the value of the LiveDemoContext
 */
export function useLiveDemoContext() {
  return useContext(LiveDemoContext);
}
