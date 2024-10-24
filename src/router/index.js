import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Device from '../views/Device.vue'
import Product from '../views/Product.vue'
import Login from '../views/Login.vue'
import { getAuth, onAuthStateChanged, setPersistence, browserSessionPersistence } from "firebase/auth";
import { useAuthStore } from "../stores/auth";
import { ref, get } from "firebase/database";
import { database } from '../api/index'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/devices',
      name: 'devices',
      component: Device,
      beforeEnter: guardAuth
    },
    {
      path: '/product',
      name: 'product',
      component: Product
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/device/:id',
      name: 'deviceid',
      component: () => import("../views/DeviceId.vue"),
      beforeEnter: guardAuth
    },
    {
      path: '/history',
      name: 'history',
      component: () => import("../views/History.vue"),
      beforeEnter: guardAuth
    },
    {
      path: '/editprofile',
      name: 'editprofile',
      component: () => import("../views/EditProfile.vue"),
      beforeEnter: guardAuth
    },
    {
      path: '/changepassword',
      name: 'changepassword',
      component: () => import("../views/ChangePassword.vue"),
      beforeEnter: guardAuth
    },
    {
      path: '/forgotpassword',
      name: 'forgotpassword',
      component: () => import("../views/ForgotPassword.vue"),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import("../views/Dashboard.vue"),
      beforeEnter: guardAuth
    },
  ]
})

async function guardAuth(to, from, next) {
  try {
    const auth = getAuth();
    const authStore = useAuthStore();

    if (localStorage.getItem('keeplogin') === 'true') {
      setPersistence(auth, browserSessionPersistence);
      const waitForAuthState = new Promise((resolve) => {
        onAuthStateChanged(auth, async (user) => {
          try {
            const url = ref(database, `users/${user?.uid}/username`);
            const snapshot = await get(url);
            authStore.auth = user;
            authStore.name = snapshot.val();
            resolve();
          } catch (error) {
            console.error('Error fetching user data:', error);
            resolve(); // Resolve the promise even if an error occurs
          }
        });
      });

      await waitForAuthState;
    }

    if (authStore.auth === null) {
      next({ name: 'login' });
    } else {
      next();
    }
  } catch (error) {
    console.error('Error in guardAuth:', error);
    next({ name: 'login' });
  }
}



export default router
