import axios from 'axios';
import { PluginBuild, OnLoadArgs, OnLoadResult } from 'esbuild-wasm';
import localforage from 'localforage';

const fileCache = localforage.createInstance({
  name: 'app-cache',
});

export const loadPathPlugin = (input: string) => {
  return {
    name: 'example',
    setup(build: PluginBuild) {
      build.onLoad({ filter: /index.ts/ }, (args: OnLoadArgs) => {
        return {
          loader: 'tsx',
          contents: input,
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: OnLoadArgs) => {
        const cachedResult = await fileCache.getItem<OnLoadResult>(args.path);
        if (cachedResult) {
          return cachedResult;
        }
      });

      build.onLoad({ filter: /.css$/ }, async (args: OnLoadArgs) => {
        const { data, request } = await axios.get(args.path);
        const escapedContent = data
          .replace(/\n/g, '')
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");
        const result: OnLoadResult = {
          loader: 'tsx',
          contents: `
            const style = document.createElement('style');
            style.innerHTML = '${escapedContent}';
            document.head.appendChild(style);
            `,
          resolveDir: new URL('./', request.responseURL).pathname,
        };

        fileCache.setItem(args.path, result);
        return result;
      });
      build.onLoad({ filter: /.*/ }, async (args: OnLoadArgs) => {
        const { data, request } = await axios.get(args.path);
        const result: OnLoadResult = {
          loader: 'tsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        };

        fileCache.setItem(args.path, result);
        return result;
      });
    },
  };
};
