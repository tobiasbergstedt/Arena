import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import svgr from '@svgr/rollup';

const appPath = path.join(__dirname, '/src');

// https://vitejs.dev/config/
export default defineConfig(() => ({
  root: appPath,
  publicDir: path.join(appPath, '/static'),
  envDir: path.join(__dirname, '/'),
  server: {
    open: true,
  },
  build: {
    emptyOutDir: true,
    outDir: path.join(__dirname, '/build'),
  },
  resolve: {
    alias: [
      { find: 'components', replacement: path.join(appPath, '/components') },
      { find: 'api', replacement: path.join(appPath, '/api') },
      { find: 'assets', replacement: path.join(appPath, '/assets') },
      { find: 'stores', replacement: path.join(appPath, '/stores') },
      { find: 'context', replacement: path.join(appPath, '/context') },
      { find: 'styles', replacement: path.join(appPath, '/styles') },
      { find: 'utils', replacement: path.join(appPath, '/utils') },
      { find: 'config', replacement: path.join(appPath, '/config') },
      { find: 'hooks', replacement: path.join(appPath, '/hooks') },
      { find: 'modals', replacement: path.join(appPath, '/modals') },
      { find: 'pages', replacement: path.join(appPath, '/pages') },
    ],
  },
  plugins: [react(), svgr()],
}));
