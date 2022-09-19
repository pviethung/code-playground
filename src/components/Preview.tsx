import { useEffect, useRef } from 'react';
import './Preview.css';

interface PreviewProps {
  bundledCode: string;
  bundledError: string;
}

const iframeHtml = `
  <html>
    <head></head>
    <body>
      <div id="root"></div>
      <script>
        window.addEventListener('message', (e) => {
          const script = document.createElement('script');
          document.head.appendChild(script);
          script.innerHTML = e.data;
        }, false);
        window.addEventListener('error', (e) => {
          document.querySelector('#root').innerHTML = '<h3 style="color: red;">' + e.message + '</h3>'
        });
      </script>
    </body>
  </html>  

`;

const Preview: React.FC<PreviewProps> = ({ bundledCode, bundledError }) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  useEffect(() => {
    if (iframeRef.current?.srcdoc) iframeRef.current.srcdoc = iframeHtml;
    setTimeout(() => {
      iframeRef.current?.contentWindow?.postMessage(bundledCode, '*');
    }, 50);
    return () => {};
  }, [bundledCode]);

  if (bundledError) {
    console.error(bundledError);
  }

  return (
    <>
      {bundledError && <h3 className="error-msg">{bundledError}</h3>}
      <iframe
        ref={iframeRef}
        sandbox="allow-scripts"
        srcDoc={iframeHtml}
        title="code-playground"
      ></iframe>
    </>
  );
};
export default Preview;
