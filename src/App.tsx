import { useEffect, useRef, useState } from 'react';
import esbuild, { BuildResult } from 'esbuild-wasm';
import { resolvePathPlugin } from './plugins/resolvePathPlugin';
import { loadPathPlugin } from './plugins/loadPathPlugin';

let esbuildInitialized = false;
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
          document.querySelector('#root').innerHTML = '<div style="color: red;">' + e.message + '</div>'
        });
      </script>
    </body>
  </html>  

`;

function App() {
  const [input, setInput] = useState('');
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    console.count('[effect run]');
    const startEsBuild = async () => {
      await esbuild.initialize({
        wasmURL: 'https://unpkg.com/esbuild-wasm@0.15.7/esbuild.wasm',
      });
    };
    esbuildInitialized = true;
    startEsBuild();
  }, []);

  useEffect(() => {
    const bundle = async () => {
      if (!esbuildInitialized) return;

      if (iframeRef.current?.srcdoc) {
        iframeRef.current.srcdoc = iframeHtml;
      }

      const bundledCode: BuildResult = await esbuild.build({
        bundle: true,
        write: false,
        entryPoints: ['index.ts'],
        outfile: 'test2.html',
        plugins: [resolvePathPlugin(), loadPathPlugin(input)],
        define: {
          'process.env.NODE_ENV': '"production"',
          global: 'window',
        },
      });

      // console.log(transformedCode);
      iframeRef.current?.contentWindow?.postMessage(
        bundledCode?.outputFiles?.[0].text,
        '*'
      );
    };
    const timeOutID = setTimeout(bundle, 2000);

    return () => {
      console.log('unmouting');
      clearTimeout(timeOutID);
    };
  }, [input]);

  // const runCodeHandler = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (!esbuildInitialized) return;

  //   if (iframeRef.current?.srcdoc) {
  //     iframeRef.current.srcdoc = iframeHtml;
  //   }

  //   const bundledCode: BuildResult = await esbuild.build({
  //     bundle: true,
  //     write: false,
  //     entryPoints: ['index.ts'],
  //     outfile: 'test2.html',
  //     plugins: [resolvePathPlugin(), loadPathPlugin(input)],
  //     define: {
  //       'process.env.NODE_ENV': '"production"',
  //       global: 'window',
  //     },
  //   });

  //   // console.log(transformedCode);
  //   iframeRef.current?.contentWindow?.postMessage(
  //     bundledCode?.outputFiles?.[0].text,
  //     '*'
  //   );
  // };

  return (
    <>
      <form>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
      </form>
      <iframe
        ref={iframeRef}
        sandbox="allow-scripts"
        srcDoc={iframeHtml}
        title="code-playground"
      ></iframe>
    </>
  );
}

export default App;
