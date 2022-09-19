import { resolvePathPlugin, loadPathPlugin } from 'bundle/plugins';
import esbuild from 'esbuild-wasm';

let esbuildInitialized = false;

const bundle = async (input: string) => {
  if (!esbuildInitialized) {
    await esbuild.initialize({
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.15.7/esbuild.wasm',
    });
    esbuildInitialized = true;
  }

  try {
    const bundledCode = await esbuild.build({
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
    return {
      error: '',
      code: bundledCode.outputFiles[0].text,
    };
  } catch (error: any) {
    return {
      code: '',
      error: error.message as string,
    };
  }
};

export default bundle;
