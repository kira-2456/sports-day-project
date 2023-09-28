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
  }, inputs); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, error: meta.error, loading: meta.loading };
};

export const useLazyFetch = ({ shouldFetch = true, fetchData, onSuccess, onFailure, onProgress }, inputs = []) => {
  const [data, setData] = useState(null);
  const [meta, setMeta] = useState({ loading: !!shouldFetch, error: null });

  const onProgressRef = useRef(onProgress);
  onProgressRef.current = onProgress;

  const onFailureRef = useRef(onFailure);
  onFailureRef.current = onFailure;

  const onSuccessRef = useRef(onSuccess);
  onSuccessRef.current = onSuccess;

  const fetch = useCallback(
    (...args) => {
      if (!shouldFetch) {
        return;
      }

      // when inputs change, useEffect will be executed again which needs the prev state re-setted
      setMeta({ loading: true, error: null });
      onProgressRef.current?.();

      fetchData(...args)
        .then(response => {
          setData(response);
          onSuccessRef?.current();
          setMeta({ loading: false, error: null });
        })
        .catch(fetchError => {
          onFailureRef?.current(fetchError);
          setMeta({ loading: false, error: fetchError });
        });
    },
    [fetchData, shouldFetch]
  );

  return { data, error: meta.error, loading: meta.loading, fetch };
};
