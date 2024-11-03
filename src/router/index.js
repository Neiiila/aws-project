import  { createRouter, createWebHistory } from 'vue-router'
import UserAuth from '../views/UserAuth.vue'
import UserDashboard from '../views/UserDashboard.vue'
import DashboardHome from '../components/Dashboard/DashboardHome.vue'
const routes = [
    {
        path: '/',
        redirect : '/auth/login'
    },
    {
        path: '/auth',
        component : UserAuth, 
        children: [
            { path: "login", component : () => import('../components/Auth/LoginAuth.vue')  } , // we can use a function to lazy load the component
            { path: "register", component : () => import('../components/Auth/RegisterAuth.vue') } , // anonymous function to get the component instead of a traditional import
        ]
    }, 
    {
        path: '/dashboard',
        component: UserDashboard,
        children: [
            { path: "", component: DashboardHome }
        ],
        //meta: { requiresAuth: true } // this is a meta field that we can use to check if the user is authenticated
    },
    //{ path: '/', redirect: '/auth/login' } // redirect to login page if the user is not authenticated   ( as default ) 
]

//create new router instance, this instance will manage routing 
const router = createRouter({
    history: createWebHistory(), // history mode
    routes
});

// NAvigation Guard to protect dashboard or routes  : 
// router.beforeEach((to, from, next) => {
//     const isAuthenticated = false; // check if the user is authenticated or not
//     if (to.matched.some(record => record.meta.requiresAuth)) {
//         if (!isAuthenticated) {
//             next('/auth/login');
//         }
//     }
//     next();
// });
export default router;