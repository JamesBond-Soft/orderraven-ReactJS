export default {
  apiUrl: 'http://yoursite.com/api/'
};
const siteConfig = {
  siteName: 'ORDER RAVEN',
  siteIcon: 'ion-flash',
  defaultAvatar: '/images/default-avatar.jpg',
  footerText: 'Order Raven ©2017'
};

const themeConfig = {
  topbar: 'themedefault',
  sidebar: 'themedefault',
  layout: 'themedefault'
};
const language = 'english';
const AlgoliaSearchConfig = {
  appId: '',
  apiKey: ''
};
const Auth0Config = {
  domain: '',
  clientID: '', //
  options: {
    auth: {
      autoParseHash: true,
      redirect: false
    },
    languageDictionary: {
      title: 'Jason',
      emailInputPlaceholder: 'demo@gmail.com',
      passwordInputPlaceholder: 'demodemo'
    },
    icon: '',
    theme: {
      labeledSubmitButton: true,
      logo: 'https://s3.amazonaws.com/redqteam.com/logo/isomorphic.png',
      primaryColor: '#E14615',
      authButtons: {
        connectionName: {
          displayName: 'Log In',
          primaryColor: '#b7b7b7',
          foregroundColor: '#000000',
          icon: undefined
        }
      }
    }
  }
};

const firebaseConfig = {
  apiKey: "AIzaSyCaDC6rx7dyDM_GqCnXF_KyoeUuczPM2C4",
  authDomain: "jason-order.firebaseapp.com",
  databaseURL: "https://jason-order.firebaseio.com",
  projectId: "jason-order",
  storageBucket: "jason-order.appspot.com",
  messagingSenderId: "261925052233"
};

//// jason's account
// const firebaseConfig = {
//   apiKey: "AIzaSyBwQB1sI1GKBDYqscGq115FXRoX2ape5z8",
//   authDomain: "order-raven.firebaseapp.com",
//   databaseURL: "https://order-raven.firebaseio.com",
//   projectId: "order-raven",
//   storageBucket: "order-raven.appspot.com",
//   messagingSenderId: "669644920423"
// };

const pagingConfig = {
  "pageSize": 10000000000,
  "finite": true,
  "retainLastPage": false
}

const googleConfig = {
  apiKey: '' //
};
const mapboxConfig = {
  tileLayer: '',
  accessToken: '',
  id: '',
  maxZoom: '',
  defaultZoom: '',
  center: []
};
const youtubeSearchApi = '';

const DAYformat = 'ddd MMM D';
const DATEformat = 'MM/DD/YYYY';
const TIMEformat = 'hh:mm A';
const DATETIMEformat = DATEformat+" "+TIMEformat;
const SHOW_SENT_DELAY_HOURS = 3;



export {
  siteConfig,
  themeConfig,
  language,
  AlgoliaSearchConfig,
  Auth0Config,
  firebaseConfig,
  pagingConfig,
  googleConfig,
  mapboxConfig,
  youtubeSearchApi,
  DAYformat,
  DATEformat,
  TIMEformat,
  DATETIMEformat,
  SHOW_SENT_DELAY_HOURS,
};
