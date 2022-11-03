import inert from '@hapi/inert';
import vision from '@hapi/vision';

/**
 * Plugins
 *
 * Core plugins from Hapi
 *
 */

/**
 * @type{import('@hapi/hapi').ServerRegisterPluginObject[]}
 */
export default [
  {
    plugin: vision,
  },
  {
    plugin: inert,
  },
];
