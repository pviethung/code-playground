import { useEffect, useState } from 'react';
import esbuild, { BuildResult } from 'esbuild-wasm';
import { resolvePathPlugin } from './plugins/resolvePathPlugin';
import { loadPathPlugin } from './plugins/loadPathPlugin';

let esbuildInitialized = false;

function App() {
  const [code, setCode] = useState<string | undefined>('');
  const [input, setInput] = useState('');

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

  const runCodeHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!esbuildInitialized) return;

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
    setCode(bundledCode?.outputFiles?.[0].text);
    console.log(bundledCode?.outputFiles);
  };

  return (
    <>
      <form onSubmit={runCodeHandler}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
        <button>Run code</button>
        <pre>{code}</pre>
      </form>
      <iframe
        sandbox="allow-scripts"
        srcDoc={`<script>${code}</script>`}
        title="test"
      ></iframe>
    </>
  );
}

export default App;
