import {
  DashboardContainer,
  AuthContainer,
} from '../containers';

const app = [
  {
    path: '/login', name: 'Auth', component: AuthContainer,
  },
  {
    path: '/', name: 'Home', component: DashboardContainer,
  },
];

export default app;
