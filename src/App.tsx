import { useEffect, useState } from 'react';
import esbuild, { BuildResult } from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkgPathPlugin';

let esbuildInitialized = false;

function App() {
  const [code, setCode] = useState<string | undefined>('');
  const [input, setInput] = useState('');

  useEffect(() => {
    console.count('[effect run]');
    const startEsBuild = async () => {
      await esbuild.initialize({
        wasmURL: './esbuild.wasm',
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
      plugins: [unpkgPathPlugin()],
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
    <form onSubmit={runCodeHandler}>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <button>Run code</button>
      <pre>{code}</pre>
    </form>
  );
}

export default App;
