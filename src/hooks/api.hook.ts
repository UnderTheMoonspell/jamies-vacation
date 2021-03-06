import { useState } from "react";
import { useEffectSkipFirstRun } from "./use-effect-skip-first.hook";

export type APIHook = {
  result: any;
  isLoading: boolean;
  setUrl: (url: string, method: string) => {};
  error: string;
};

const initialOptions = {
  isLoading: false,
  result: [],
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
        const { locations } = await (APIInstance as any)[apiOptions.method](apiOptions.url);
        updateState({ result: locations, isLoading: false });
      } catch (ex) {
        updateState({ error: ex });
      }
    }
    apiOptions.url && executeApiCall()

  }, [apiOptions.url, apiOptions.method]);

  return {
    isLoading: apiOptions.isLoading,
    result: apiOptions.result,
    setUrl,
  } as APIHook;
};
