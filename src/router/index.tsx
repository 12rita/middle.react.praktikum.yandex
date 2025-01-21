import {RouteObject} from 'react-router-dom'
import {
    Constructor,
    Orders, Profile,
} from '../pages'
import {Layout} from "../components";


export enum PathsRoutes {
    CONSTRUCTOR = '/',
    PROFILE = '/profile',
    ORDERS = '/orders',
}

export const routes: RouteObject[] = [
    {
        path: PathsRoutes.CONSTRUCTOR,
        element: <Layout> <Constructor/></Layout>
    },
    {
        path: PathsRoutes.ORDERS,
        element: <Layout> <Orders/></Layout>
    },
    {
        path: PathsRoutes.PROFILE,
        element: <Layout> <Profile/></Layout>
    }
    // {
    //   path: '*',
    //   element: (
    //     <Error title="404" descr="Не туда попали" text="Давайте вернемся назад" />
    //   ),
    //   fetchData: initErrorPage,
    // },
]


