import Alpine from 'alpinejs';
import persist from '@alpinejs/persist';
import collapse from '@alpinejs//collapse';
import mask from '@alpinejs/mask';

import './assets/css/tailwind.css';

// @ts-ignore
window.Alpine = Alpine;
Alpine.plugin(persist);
Alpine.plugin(collapse);
Alpine.plugin(mask);