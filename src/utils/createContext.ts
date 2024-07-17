import { createContext as createReactContext, useContext as useReactContext } from 'react';

class ContextError extends Error {
  constructor(contextName: string, consumerName: string) {
    super(`You must use ${consumerName} within ${contextName}.`);
  }
}

export function createContext<T>(contextName: string) {
  const context = createReactContext<T | null>(null);
  const useContext = (consumerName: string) => {
    const value = useReactContext(context);
    if (value === null) {
      throw new ContextError(contextName, consumerName);
    }
    return value;
  };

  return [context.Provider, useContext] as const;
}
