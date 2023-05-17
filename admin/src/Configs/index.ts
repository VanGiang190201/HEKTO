import Customer from '../Pages/Customer';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import RequestBooking from '../Pages/RequestBooking';
import Worker from '../Pages/Worker';
import Portfolios from '../Pages/Portfolios';
import Category from '../Pages/Category';
import Product from '../Pages/Product';
import Slider from '../Pages/Slider';
import Ads from '../Pages/Advertisement';
import Feature from '../Pages/Feature';
import Order from '../Pages/Order';
import ImageProduct from '../Pages/ImageProduct';
import Meeting from '../Pages/Metting';
import Notification from '../Pages/Notification';
import Video from '../Pages/Video';
import Blog from '../Pages/Blog';

export const config = {
    routes: {
        home: '/',
        login: '/login',
        detail: '/detail/:id',
        workers: '/worker',
        booking: '/booking',
        requestBooking: '/request-booking',
        customers: '/customer',
        notFound: '/*',
        portfolios : '/portfolios',
        category : '/category',
        product : '/product',
        order : '/order',
        slider : '/slider',
        advertisement : '/advertisement',
        features : '/feature',
        imageProduct : '/image',
        meeting : '/meeting',
        notification : '/notification',
        video : '/video',
        blog : '/blog',
    },
};

export const routeDefinedAdmin = [
    {
        path: config.routes.home,
        component: Home,
    },
    {
        path: config.routes.workers,
        component: Worker,
    },
    {
        path: config.routes.portfolios,
        component: Portfolios,
    },
    {
        path: config.routes.requestBooking,
        component: RequestBooking,
    },
    {
        path: config.routes.product,
        component: Product,
    },
    {
        path: config.routes.category,
        component: Category,
    },
    {
        path: config.routes.customers,
        component: Customer,
    },
    {
        path: config.routes.notFound,
        component: Home,
    },
    {
        path: config.routes.slider,
        component: Slider,
    },
    {
        path: config.routes.advertisement,
        component: Ads,
    },
    {
        path: config.routes.features,
        component: Feature,
    }
    ,
    {
        path: config.routes.order,
        component: Order,
    },
    {
        path: config.routes.imageProduct,
        component: ImageProduct,
    },
    {
        path: config.routes.meeting,
        component: Meeting,
    },
    {
        path: config.routes.notification,
        component: Notification,
    },
    {
        path: config.routes.video,
        component: Video,
    },
    {
        path: config.routes.blog,
        component: Blog,
    }
];

export const routeDefinedStaff = [
    {
        path: config.routes.home,
        component: Home,
    },
    {
        path: config.routes.portfolios,
        component: Portfolios,
    },
    {
        path: config.routes.requestBooking,
        component: RequestBooking,
    },
    {
        path: config.routes.product,
        component: Product,
    },
    {
        path: config.routes.category,
        component: Category,
    },
    {
        path: config.routes.customers,
        component: Customer,
    },
    {
        path: config.routes.notFound,
        component: Home,
    },
    {
        path: config.routes.slider,
        component: Slider,
    },
    {
        path: config.routes.advertisement,
        component: Ads,
    },
    {
        path: config.routes.features,
        component: Feature,
    }
    ,
    {
        path: config.routes.order,
        component: Order,
    },
    {
        path: config.routes.imageProduct,
        component: ImageProduct,
    },
    {
        path: config.routes.meeting,
        component: Meeting,
    }
    ,
    {
        path: config.routes.notification,
        component: Notification,
    },
    {
        path: config.routes.video,
        component: Video,
    }
    ,
    {
        path: config.routes.blog,
        component: Blog,
    }
];

export const routeBlock = [
    {
        path: config.routes.login,
        component: Login,
    },
];
