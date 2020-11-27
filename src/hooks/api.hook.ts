import { useState } from "react";
import { useEffectSkipFirstRun } from "./use-effect-skip-first.hook";

export type APIHook = {
  result: any;
  isLoading: boolean;
  setUrl: (url: string, method: string, headers?: any) => {};
  error: string;
};

const initialOptions = {
  isLoading: false,
  result: null,
  url: '',
  method: '',
  error: '',
  headers: {}
};

export const useAPI = (APIInstance: any) => {
  const [apiOptions, setApiOptions] = useState(initialOptions);

  const updateState = (updatedProps: any) =>
    setApiOptions({ ...initialOptions, ...updatedProps });

  const setUrl = (url: string, method: string, headers: any) => {
    updateState({ url, method, headers });
  }

  useEffectSkipFirstRun(() => {
    const executeApiCall = async () => {
      try {
        updateState({ isLoading: true });
        const result = await (APIInstance as any)[apiOptions.method](apiOptions.url, { headers: apiOptions.headers });
        updateState({ result: result, isLoading: false });
      } catch (ex) {
        updateState({ error: ex });
      }
    }
    apiOptions.url && executeApiCall()

  }, [apiOptions.url, apiOptions.method, apiOptions.headers]);

  return {
    isLoading: apiOptions.isLoading,
    result: apiOptions.result,
    setUrl,
  } as APIHook;
};
