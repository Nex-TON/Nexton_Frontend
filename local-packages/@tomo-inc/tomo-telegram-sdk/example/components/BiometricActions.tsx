import * as React from 'react';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { useBiometricManager } from '../../src';

export default function BiomerticActions() {
  const webApp = useWebApp();
  const {
    bioInited,
    bioAvailable,
    bioAccessGranted,
    requestAccess,
    authenticate,
  } = useBiometricManager();
  return (
    <div>
      <div className={'module-title'}>Biometric Actions</div>
      <div>
        <div>
          isBiometricAvailable:
          {webApp?.biometryManager?.isBiometricAvailable ? 'true' : 'false'}
        </div>
        <div>
          isInited:{webApp?.biometryManager?.isInited ? 'true' : 'false'}
        </div>
        <div>
          isAccessRequested:
          {webApp?.biometryManager?.isAccessRequested ? 'true' : 'false'}
        </div>
        <div>
          isAccessGranted:
          {webApp?.biometryManager?.isAccessGranted ? 'true' : 'false'}
        </div>
      </div>
      <div>
        <div>bioAvailable:{bioAvailable ? 'true' : 'false'}</div>

        <div>
          bioInited:
          {bioInited ? 'true' : 'false'}
        </div>
        <div>bioAccessGranted:{bioAccessGranted ? 'true' : 'false'}</div>
      </div>
      <div
        style={{
          display: 'flex',
          gap: '10px',
        }}
      >
        <button
          onClick={() => {
            requestAccess({
              callback: success => {
                alert('requestAccess:' + (success ? 'true' : 'false'));
              },
            });
          }}
          disabled={!bioAvailable || !bioInited}
        >
          1.requestAccess
        </button>
        <button
          onClick={() => {
            authenticate({
              reason: 'We need to authenticate you to continue[0]',
              failCallback: error => {
                alert('authenticate fail:' + error.message);
              },
              callback: success => {
                alert('authenticate:' + (success ? 'true' : 'false'));
              },
            });
          }}
          disabled={!bioAvailable || !bioInited || !bioAccessGranted}
        >
          2.authenticate
        </button>
      </div>
    </div>
  );
}
