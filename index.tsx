
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Safely patch WebGL getShaderPrecisionFormat to prevent null.precision errors in Three.js
if (typeof window !== 'undefined') {
  const patchPrecision = (proto: any) => {
    if (proto && typeof proto.getShaderPrecisionFormat === 'function') {
      const orig = proto.getShaderPrecisionFormat;
      proto.getShaderPrecisionFormat = function (...args: any[]) {
        try {
          const res = orig.apply(this, args);
          if (res) return res;
        } catch (_) {}
        return { precision: 23, rangeMin: 127, rangeMax: 127 };
      };
    }
  };
  if (typeof WebGLRenderingContext !== 'undefined') {
    patchPrecision(WebGLRenderingContext.prototype);
  }
  if (typeof WebGL2RenderingContext !== 'undefined') {
    patchPrecision(WebGL2RenderingContext.prototype);
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

