import inert from '@hapi/inert';
import vision from '@hapi/vision';

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
