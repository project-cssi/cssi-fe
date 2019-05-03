import {
  ApplicationsView,
  NewSessionView,
  QuestionnaireView,
  EmotionsView,
  EvaluationView,
  SessionsView
} from '../views';
import testIcon from '../assets/img/icons/questionnaire.svg';
import hmdIcon from '../assets/img/icons/hmd.svg';
import sessionsIcon from '../assets/img/icons/session-history.svg';

const dashboard = [
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
    path: '/new-session/evaluation', hide: true, name: 'Evaluation', icon: testIcon, component: EvaluationView, restrictionLevel: 0,
  },
  {
    path: '/sessions', name: 'Sessions', icon: sessionsIcon, component: SessionsView, restrictionLevel: 0,
  },
  {
    path: '/applications', name: 'Applications', icon: hmdIcon, component: ApplicationsView, restrictionLevel: 0,
  },
  {
    redirect: true, path: '/', pathTo: '/new-session', name: 'New Session', restrictionLevel: 0,
  },
];

export default dashboard;
