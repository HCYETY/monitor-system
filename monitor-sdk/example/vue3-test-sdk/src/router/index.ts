import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue';
import Home from '../views/Home.vue';
import Test from '../views/Test.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/test',
            name: 'Test',
            component: Test
        },
        {
            path: '/home',
            name: 'Home',
            component: Home
        },
    ]
})

export default router
