import * as React from 'react';
import { useState } from 'react';
import { useTomo } from '../../src';
export default function TradePassword() {
  const { onSendEmailCode, onVerifyEmailCode } = useTomo();
  const [email, setEmail] = useState('');
  const sendBindEmailCode = async () => {
    if (!email) return alert('Please input email');
    const res = await onSendEmailCode({ email });
    alert(JSON.stringify(res));
  };
  const verifyBindEmailCode = async () => {
    if (!email) return alert('Please input email');
    const code = prompt('Please input code');
    if (!code) return alert('Please input code');
    const password = prompt('Please input password');
    if (!password) return alert('Please input password');
    const res = await onVerifyEmailCode({
      email,
      code,
      tradePassword: password,
    });
    alert(JSON.stringify(res));
  };

  return (
    <div>
      <div className={'module-title'}>TradePassword & EmailApi</div>
      <div
        style={{
          display: 'flex',
          gap: '10px',
        }}
      >
        <input onChange={e => setEmail(e.target.value)} value={email} />
        <button onClick={sendBindEmailCode}>1.Send code</button>
        <button onClick={verifyBindEmailCode}>2.Verify code</button>
      </div>
    </div>
  );
}
