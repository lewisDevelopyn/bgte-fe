module.exports.routes = [
    {
        path: '/',
        redirect: '/events',
    },
    {
        path: '/events',
        name: 'events',
        component: () => import(/* webpackChunkName: "not-found" */ './views/Events.vue')
    },
    {
        path: '/events/:id',
        name: 'event',
        component: () => import(/* webpackChunkName: "not-found" */ './views/EventFull.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "not-found" */ './views/EventFull.vue')
    },
    {
        path: '/404',
        name: '404',
        component: () => import(/* webpackChunkName: "not-found" */ './views/404.vue')
    },
    {
        path: '*',
        redirect: '/404'
    }, 
  ]