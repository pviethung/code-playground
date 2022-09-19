import { useEffect, useRef } from 'react';

interface PreviewProps {
  bundledCode: string;
}

const iframeHtml = `
  <html>
    <head></head>
    <body>
      <div id="root" style="font-size: 80px;"></div>
      <script>
        window.addEventListener('message', (e) => {
          const script = document.createElement('script');
          document.head.appendChild(script);
          script.innerHTML = e.data;
        }, false);
        window.addEventListener('error', (e) => {
          debugger;
          document.querySelector('#root').innerHTML = '<div style="color: red;">' + e.message + '</div>'
        });
      </script>
    </body>
  </html>  

`;

const Preview: React.FC<PreviewProps> = ({ bundledCode }) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  useEffect(() => {
    if (iframeRef.current?.srcdoc) iframeRef.current.srcdoc = iframeHtml;
    setTimeout(() => {
      iframeRef.current?.contentWindow?.postMessage(bundledCode, '*');
    }, 50);
    return () => {};
  }, [bundledCode]);

  return (
    <iframe
      ref={iframeRef}
      sandbox="allow-scripts"
      srcDoc={iframeHtml}
      title="code-playground"
    ></iframe>
  );
};
export default Preview;
