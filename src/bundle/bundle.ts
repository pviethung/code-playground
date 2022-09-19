import { resolvePathPlugin, loadPathPlugin } from 'bundle/plugins';
import esbuild, { BuildResult } from 'esbuild-wasm';

let esbuildInitialized = false;

const bundle = async (input: string) => {
  if (!esbuildInitialized) {
    await esbuild.initialize({
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.15.7/esbuild.wasm',
    });
    esbuildInitialized = true;
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

  if (bundledCode?.outputFiles?.[0].text)
    return bundledCode.outputFiles[0].text;
  return '';
};

export default bundle;
