import * as React from 'react';
import { useState } from 'react';
export default function TelegramActions() {
  const [testTgData, setTestTgData] = useState('');
  const useTelegramTestData = () => {
    window.location.href = window.location.origin + '/' + testTgData;

    setTimeout(() => {
      window.location.reload();
    }, 500);
  };
  const clearTelegramData = () => {
    window.location.href = window.location.origin;
    window.sessionStorage.removeItem('__telegram__themeParams');
    window.sessionStorage.removeItem('__telegram__initParams');
  };
  return (
    <div>
      <div className={'module-title'}>Telegram Actions</div>
      <div
        style={{
          display: 'flex',
          gap: '10px',
        }}
      >
        <input
          value={testTgData}
          onChange={e => setTestTgData(e.target.value)}
        />
        <button onClick={useTelegramTestData}>use test data</button>
        <button onClick={clearTelegramData}>clear telegram data</button>
      </div>
    </div>
  );
}
