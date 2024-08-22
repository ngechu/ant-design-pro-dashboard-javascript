export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/home',
    name: 'Home',
    component: './Home',
  },
  {
    path: '/pos-licence',
    name: 'Tracom POS Permission Generator ',
    component: './pos-regex',
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    component: './404',
  },
];
