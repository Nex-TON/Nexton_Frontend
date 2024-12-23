import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import Demo from './Demo';
import V2 from './v2';
import SolDemo from './SolDemo';
import TonDemo from './tonDemo';
// import BtcDemo from './BTCDemo';
import ConnectTon from './ConnectTon';
import ConnectEvm from './ConnectEvm';
import SuiDemo from './SuiDemo';
import { CONNECT_MAP, TomoProvider } from '../dist';
import './index.css';
import '../dist/styles.css';
import eruda from 'eruda';
import { useThemeParams } from '@vkruglikov/react-telegram-web-app';
import { ClearLocalStorage } from './ClearLocalStorage';
import { useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from 'react-router-dom';
import { backButton, init } from '@telegram-apps/sdk-react';
try {
  init();
} catch (e) {
  console.error(e);
}

export const SupportedProvidersContext = React.createContext<{
  setProviderTypes: (...args: any[]) => any;
}>({
  setProviderTypes: () => {},
});

const pagesMap = [
  { name: 'evm', page: V2 },
  { name: 'ton', page: TonDemo },
  { name: 'sol', page: SolDemo },
  // { name: 'btc', page: BtcDemo },
  { name: 'sui', page: SuiDemo },
  { name: 'connect-ton-modal', page: ConnectTon },
  { name: 'connect-evm-modal', page: ConnectEvm },
];

const BASE_URL_DEV = {
  bridge: 'https://bridge-dev.anyconn.org/v1/sub',
  connect: 'https://tg-dev.tomo.inc/bot-server/sdk/signature',
  connect_direct_link: 'https://t.me/AlvinsDemoBot/TOMOSDK',
  metaData: {
    name: 'Tomo Test DApp',
    icon: 'https://d18zhf0uo21qy3.cloudfront.net/assets/login-tomo-logo.png',
  },
};

function MainDemo() {
  const [route, switchRoute] = React.useState('');
  const chainItem = pagesMap.find(v => v.name === route);
  const Comp = chainItem?.page;
  React.useEffect(() => {
    const route = location.search;
    switchRoute(route.slice(1) || 'evm');
  }, []);

  const navigate = useNavigate();


  React.useEffect(() => {
    if (backButton.isSupported()) {
      backButton.mount()
      backButton.show();
      if (backButton.isMounted()) {
        const backClick = () => {
          navigate(-1)
        }
        backButton.onClick(backClick)
        return () => {
          backButton.offClick(backClick)
        }
      }
    }
  }, [])
  

  return (
    <div>
      <span>Select a demo: </span>
      <select
        style={{ width: '100px', height: '30px' }}
        value={route}
        onChange={e => {
          // switchChain(e.target.value);
          location.href = `/?${e.target.value}`;
        }}
      >
        {pagesMap.map(item => (
          <option key={item.name} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
      {Comp ? <Comp /> : <>none</>}
    </div>
  );
}
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainDemo />,
  },
  {
    path: '/test',
    element: <div>Hello world!</div>,
  },
]);

const App = () => {
  const [supportedProviders, setSupportedProviders] = useState([]);
  const [ColorScheme] = useThemeParams();

  React.useEffect(() => {
    eruda.init();
  }, []);

  // React.useEffect(() => {
  //   const data = JSON.stringify({
  //     eventType: 'web_app_setup_back_button',
  //     eventData: {
  //       is_visible: true,
  //     },
  //   });

  //   window.parent?.postMessage(data, '*');
  // })

  return (
    <SupportedProvidersContext.Provider
      value={{ setProviderTypes: setSupportedProviders }}
    >
        <ClearLocalStorage />
        <RouterProvider router={router} />
    </SupportedProvidersContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
