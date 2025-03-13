import express from 'express';
import authRoute from './AuthRoute';
import polizaRoute from './PolizaRoute';
import aseguradoraRoute from './AseguradoraRoute';

const router = express.Router();

const allRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/polizas',
    route: polizaRoute,
  },
  {
    path: '/aseguradoras',
    route: aseguradoraRoute,
  },
];

allRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
