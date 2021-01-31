import Es6Promise from 'es6-promise'
Es6Promise.polyfill()
import "babel-polyfill"

import Vue from 'vue'
import App from './App.vue'

let vueApp = new Vue({
    el: '#dashboard-app',
    components: {
        App
    }
});

window.vueApp = vueApp