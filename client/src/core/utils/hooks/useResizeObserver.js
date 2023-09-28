import { useCallback, useEffect, useState } from 'react';

const useResizeObserver = props => {
  const { uniqueId } = props ?? {};
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const onLayout = useCallback(
    entries => {
      const divEntry = entries?.[0];
      const { contentRect } = divEntry;

      if (contentRect) {
        const { width, height } = contentRect;
        setDimension({ width, height });
      }
    },
    [setDimension]
  );

  useEffect(() => {
    const resizeObserver = new window.ResizeObserver(onLayout);
    const domElement = uniqueId ? document.getElementById(uniqueId) : document.body;
    resizeObserver?.observe(domElement);

    return () => resizeObserver.disconnect();
  }, []);

  return dimension;
};

export default useResizeObserver;
