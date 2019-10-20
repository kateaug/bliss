import Main from './components/Main.vue';

const routes = [
  { 
    path: '/', 
    component: Main
  },
  { 
    path: '/questions',
    component: Main,
    props: true
  }
];

export default routes;


 