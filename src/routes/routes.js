// routes.js

import Home from '../components/Home.vue';
import About from '../components/About.vue';
import Register from '../components/Register/Register.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/register', component: Register }
];

export default routes;