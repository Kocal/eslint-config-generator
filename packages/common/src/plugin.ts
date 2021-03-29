import { ESLintConfig } from './config';
import { Options } from './options';

export type PluginCallback = ({ config, options }: { config: ESLintConfig; options: Options }) => ESLintConfig;

export function createPlugin(callback: PluginCallback): PluginCallback {
  return ({ config, options }) => {
    return callback({ config, options });
  };
}
