// Learn more: https://docs.expo.dev/guides/monorepos/
const { getDefaultConfig } = require('expo/metro-config');
const path = require('node:path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// Watch all files within the monorepo so edits in @sab/* packages hot-reload.
config.watchFolders = [workspaceRoot];

// Let Metro resolve packages from the workspace root as well as the app root.
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// Use hoisted versions of react / react-native first.
config.resolver.disableHierarchicalLookup = true;

// pnpm stores packages under node_modules/.pnpm and symlinks the resolved
// tree into each package's own node_modules. Metro needs to follow those
// symlinks to discover transitive deps (without this, @expo/metro-runtime
// can't locate whatwg-fetch even though it is installed).
config.resolver.unstable_enableSymlinks = true;
config.resolver.unstable_enablePackageExports = true;

module.exports = config;
