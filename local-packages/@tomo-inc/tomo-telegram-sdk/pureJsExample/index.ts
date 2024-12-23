console.log('pure!!');
import '../dist/styles.css';
import { initTomoModal, initTomoModalParams, CONNECT_MAP } from '../dist';

initTomoModal({
  onConnect: ({ type, provider }) => {
    console.log({ type, provider });
  },
  supportedProviders: ['EVM'],
  supportedConnects: [
    CONNECT_MAP.TOMO_MINI_APP,
    CONNECT_MAP.OKX_CONNECT,
    CONNECT_MAP.TON_CONNECT,
  ],
  manifestUrl: 'https://d8o5s6z018yzr.cloudfront.net/manifestUrl.json',
} as initTomoModalParams).then(rs => {
  console.log('window.openTomoConnectModal', window.openTomoConnectModal);
});
