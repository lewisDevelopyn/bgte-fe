module.exports.routes = [
    {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ './views/Home.vue')
    },
    {
        path: '/events',
        name: 'events',
        component: () => import(/* webpackChunkName: "about" */ './views/Events.vue')
    },
    {
        path: '/event/:id',
        name: 'event',
        component: () => import(/* webpackChunkName: "about" */ './views/Event.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "contact" */ './views/Login.vue')
    },
    {
        path: '/upload',
        name: 'upload',
        component: () => import(/* webpackChunkName: "contact" */ './views/Upload.vue'),
        beforeEnter: (to, from, next) => {
            let user = localStorage.getItem('user');
            let access_token = localStorage.getItem('accessToken')
            if(user && access_token && store.state.logged_in) {
                next();
            }
            else next('/login');
        }
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