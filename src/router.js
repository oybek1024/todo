import  VueRouter from 'vue-router'
import Dashboard from './components/Dashboard'
import Persons from './components/Persons'
import Tasks from './components/Tasks'

export default new VueRouter({
    routes:[
        {
            path: '/',
            component: Dashboard,
        },
        {
            path: '/persons',
            component: Persons,
        },
        {
            path: '/tasks',
            component: Tasks,
        }
        
    ],
    mode: 'history'
})