import * as React from 'react';
import { useTomo } from '../../src';

export default function ConfigActions() {
  const tomo = useTomo();

  return (
    <div>
      <div className={'module-title'}>Config</div>
      <div className={'config-row'}>
        <div className={`item-title`}>Secret:</div>
        <div>{tomo?.secret}</div>
      </div>
      <div className={'config-row'}>
        <div className={`item-title`}>Env:</div>
        <div>{tomo?.env}</div>
      </div>
      <div className={'config-row'}>
        <div className={`item-title`}>Endpoints:</div>
        <div className={'item-value'}>{JSON.stringify(tomo?.endpoints)}</div>
      </div>
      <div className={'module-title'}>UserInfo</div>
      <div className={'item-value'}>{JSON.stringify(tomo?.userInfo)}</div>
      <div className={'module-title'}>Telegram Data</div>
      <div className={'item-value'}>{JSON.stringify(tomo?.telegramData)}</div>
    </div>
  );
}
