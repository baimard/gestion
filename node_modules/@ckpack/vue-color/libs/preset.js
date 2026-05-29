import create from './create.js';
import { components } from './components.js';
import './defaultConfig.js';
import './components/alpha/index.js';
import './components/checkboard/index.js';
import 'vue';
import './style-inject.es-746bb8ed.js';
import './utils/compoent.js';
import './components/chrome/index.js';
import './mixin/color.js';
import '@ctrl/tinycolor';
import './components/editable-input/index.js';
import './components/saturation/index.js';
import './utils/utils.js';
import './components/hue/index.js';
import './components/compact/index.js';
import './components/grayscale/index.js';
import './components/material/index.js';
import './components/photoshop/index.js';
import './components/sketch/index.js';
import './components/slider/index.js';
import './components/swatches/index.js';
import 'material-colors';
import './components/twitter/index.js';

const preset = create({
  components,
});

export { preset as default };
