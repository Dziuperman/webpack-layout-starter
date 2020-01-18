// SCSS
import '../assets/styles/index.scss';

// HTML
import '../example.html';

// CSS
// import '../assets/css/index.css

import Vue from 'vue';
import App from '../App.vue';
// Vue init
new Vue({
  el: '#app',
  render: h => h(App)
});