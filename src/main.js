import {createApp} from 'vue';
import App from './App.vue';

import './assets/shortcut-icons/shortcut-icons.css';
import './style.css';

// Import Framework7
import Framework7 from 'framework7/lite-bundle';
import Framework7Vue from 'framework7-vue/bundle';
import 'framework7/css/bundle';
import 'framework7-icons';

Framework7.use(Framework7Vue);

createApp(App).mount('#app');
