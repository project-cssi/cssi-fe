import {
  DashboardView,
  ApplicationsView,
  NewSessionView,
  QuestionnaireView,
  EmotionsView,
  EvaluationView
} from '../views';
import testIcon from '../assets/img/icons/test.svg';
import dashboardIcon from '../assets/img/icons/dashboard.svg';
import hmdIcon from '../assets/img/icons/hmd.svg';

const dashboard = [
  {
    path: '/dashboard', name: 'Dashboard', icon: dashboardIcon, component: DashboardView, restrictionLevel: 0,
  },
  {
    path: '/applications', name: 'Applications', icon: hmdIcon, component: ApplicationsView, restrictionLevel: 0,
  },
  {
    path: '/new-session', exact: true, name: 'New Session', icon: testIcon, component: NewSessionView, restrictionLevel: 0,
  },
  {
    path: '/new-session/questionnaire', hide: true, name: 'Questionnaire', icon: testIcon, component: QuestionnaireView, restrictionLevel: 0,
  },
  {
    path: '/new-session/emotions', hide: true, name: 'Expected Emotions', icon: testIcon, component: EmotionsView, restrictionLevel: 0,
  },
  {
    path: '/evaluation', hide: true, name: 'Evaluation', icon: testIcon, component: EvaluationView, restrictionLevel: 0,
  },
  {
    redirect: true, path: '/', pathTo: '/dashboard', name: 'Dashboard', restrictionLevel: 0,
  },
];

export default dashboard;
