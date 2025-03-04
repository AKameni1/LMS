'use client';

import { useEffect, useRef } from 'react';

export default function PreviewPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    const { NutrientViewer } = window;

    if (container && NutrientViewer) {
      NutrientViewer.load({
        container,
        // You can specify a file in public directory, for example /document.pdf
        document: 'https://www.nutrient.io/downloads/pspdfkit-web-demo.pdf',
        theme: NutrientViewer.Theme.DARK,
      });
    }

    return () => {
      NutrientViewer?.unload(container);
    };
  }, []);
  return <div ref={containerRef} className="h-dvh w-screen max-w-7xl" />;
}
