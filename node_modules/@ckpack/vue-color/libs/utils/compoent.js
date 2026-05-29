import { prefix } from '../defaultConfig.js';

const install = function (app, options) {
  const { componentPrefix = prefix } = options || {};
  app.component(`${componentPrefix}${this.name}`, this);
};

export { install };
