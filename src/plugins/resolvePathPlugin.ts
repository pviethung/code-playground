import { PluginBuild, OnResolveArgs } from 'esbuild-wasm';

export const resolvePathPlugin = () => {
  return {
    name: 'example',
    setup(build: PluginBuild) {
      // Redirect all paths starting with "images/" to "./public/images/"
      build.onResolve({ filter: /index.ts/ }, (args: OnResolveArgs) => {
        return {
          path: 'index.ts',
          namespace: 'a',
        };
      });
      build.onResolve({ filter: /.+\// }, (args: OnResolveArgs) => {
        return {
          path: new URL(args.path, `https://unpkg.com${args.resolveDir}/`).href,
          namespace: 'a',
        };
      });
      build.onResolve({ filter: /.*/ }, async (args: OnResolveArgs) => {
        return {
          path: `https://unpkg.com/${args.path}`,
          namespace: 'a',
        };
      });
    },
  };
};
