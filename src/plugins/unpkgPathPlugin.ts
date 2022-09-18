import axios from 'axios';
import { PluginBuild, OnResolveArgs, OnLoadArgs } from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
  return {
    name: 'example',
    setup(build: PluginBuild) {
      // Redirect all paths starting with "images/" to "./public/images/"
      build.onResolve({ filter: /.*/ }, async (args: OnResolveArgs) => {
        console.log('resolve path ', args.path);

        if (args.path === 'index.ts') {
          return {
            path: 'index.ts',
            namespace: 'a',
          };
        }

        if (args.path.includes('./') || args.path.includes('../')) {
          return {
            path: new URL(args.path, `https://unpkg.com${args.resolveDir}/`)
              .href,
            namespace: 'a',
          };
        }

        return {
          path: `https://unpkg.com/${args.path}`,
          namespace: 'a',
        };
      });
      build.onLoad({ filter: /.*/ }, async (args: OnLoadArgs) => {
        console.log('load path ', args.path);

        if (args.path === 'index.ts') {
          return {
            loader: 'tsx',
            contents: `
                import React, { useState } from 'react';
                import axios from 'axios';

                typeof React
                typeof axios
                
              `,
          };
        }

        const { data, request } = await axios.get(args.path);
        return {
          loader: 'tsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        };
      });
    },
  };
};
