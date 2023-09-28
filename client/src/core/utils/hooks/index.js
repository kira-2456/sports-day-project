import { useState, useEffect, useCallback, useRef } from 'react';

export const useFetcher = ({ shouldFetch = true, fetchData }, inputs = []) => {
  const [data, setData] = useState(null);
  const [meta, setMeta] = useState({ loading: !!shouldFetch, error: null });

  useEffect(() => {
    if (!shouldFetch) {
      return;
    }

    // when inputs change, useEffect will be executed again which needs the prev state re-setted
    setMeta({ loading: true, error: null });

    fetchData()
      .then(response => {
        setData(response);
        setMeta({ loading: false, error: null });
      })
      .catch(fetchError => {
        setMeta({ loading: false, error: fetchError });
      });
  }, inputs);

  return { data, error: meta.error, loading: meta.loading };
};

export const useLazyFetch = ({ fetchData, onSuccess, onFailure, onProgress }, inputs = []) => {
  const [data, setData] = useState(null);
  const [meta, setMeta] = useState({ loading: false, error: null });

  const onProgressRef = useRef(onProgress);
  onProgressRef.current = onProgress;

  const onFailureRef = useRef(onFailure);
  onFailureRef.current = onFailure;

  const onSuccessRef = useRef(onSuccess);
  onSuccessRef.current = onSuccess;

  const fetch = useCallback(
    (...args) => {
      // when inputs change, useEffect will be executed again which needs the prev state re-setted
      setMeta({ loading: true, error: null });
      onProgressRef.current?.();

      fetchData(...args)
        .then(response => {
          setData(response);
          onSuccessRef?.current(response?.data);
          setMeta({ loading: false, error: null });
        })
        .catch(error => {
          onFailureRef?.current?.(error?.response?.data);
          setMeta({ loading: false, error: error?.response?.data });
        });
    },
    [fetchData]
  );

  return { data, error: meta.error, loading: meta.loading, fetch };
};

export const useSetState = initialState => {
  const [state, set] = useState(initialState);
  const setState = useCallback(patch => {
    set(prevState => ({ ...prevState, ...(patch instanceof Function ? patch(prevState) : patch) }));
  }, []);

  return [state, setState];
};
