import * as React from 'react';
import { useTomo } from '../../src';

export default function UserInfoActions() {
  const { onLogin, onLogout, onUpdateUserInfo } = useTomo();
  const [link, setLink] = React.useState('');

  const onReset = () => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.location.href = window.location.origin;
  };

  return (
    <div>
      <div className={'module-title'}>UserInfo Actions</div>
      <div
        style={{
          display: 'flex',
          gap: '10px',
        }}
      >
        <button
          onClick={async () => {
            setLink(await onLogin('tomo'));
          }}
        >
          Login By Tomo
        </button>
        <button
          onClick={async () => {
            await onLogin('telegram');
          }}
        >
          Login By Telegram
        </button>
        <button onClick={onLogout}>Logout</button>
        <button onClick={onReset}>Reset env</button>

        <button
          onClick={async () => {
            setLink(await onLogin('tomo', false));
          }}
        >
          Show Tomo Link
        </button>
        {link && (
          <button
            onClick={() => {
              window.open(link);
            }}
          >
            Open Telegram
          </button>
        )}
      </div>
      <button onClick={onUpdateUserInfo}>Update UserInfo</button>

      {link && <div>{link}</div>}
    </div>
  );
}
