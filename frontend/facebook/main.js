import Vue from 'vue'
import App from './App.vue'

let vueApp = new Vue({
    el: '#facebook-app',
    components: {
        App
    }
});

window.vueApp = vueApp