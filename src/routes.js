import withSuspense from "./HOCs/withSuspence";
import { lazy } from "react";
import { Navigate } from "react-router-dom";
const Login = lazy(() => import("./components/Login"));
const Feed = lazy(() => import("./components/feed/Feed"));
const Error = lazy(() => import("./components/Error"));
const Register = lazy(() => import("./components/Register"));
const Settings = lazy(() => import("./components/settings/Settings"));
const NewPost = lazy(() => import("./components/newPost/NewPost"))
const User = lazy(() => import("./components/user/User"))

const routes = [
    {
        path: '/',
        Component: () => <Navigate to='/feed' />,
        exact: true,
        name: 'Home',
        needAuth: false,
    },
    {
        path: '/login',
        Component: withSuspense(Login),
        exact: true,
        name: 'Login',
        needAuth: false,
    },
    {
        path: '/register',
        Component: withSuspense(Register),
        exact: true,
        name: 'Register',
        needAuth: false,
    },
    {
        path: '/feed',
        Component: withSuspense(Feed),
        exact: true,
        name: 'Feed',
        needAuth: true,
    },
    {
        path: '/settings',
        Component: withSuspense(Settings),
        exact: true,
        name: 'Settings',
        needAuth: true,
    },
    {
        path: '/add',
        Component: withSuspense(NewPost),
        exact: true,
        name: 'Add',
        needAuth: true,
    },
    {
        path: '/user',
        Component: withSuspense(User),
        exact: true,
        name: 'Add',
        needAuth: true,
    },
    {
        path: '*',
        exact: false,
        needAuth: true,
        Component: withSuspense(Error),
    }

]

export default routes;