import * as React from 'react';
import { useMFAVerify } from '../../src';

export default function Mfa() {
  const { getMFAParams } = useMFAVerify();
  const onBiometric = async () => {
    try {
      const res = await getMFAParams({
        data: '0x',
        chainid: 1,
      });
      console.log('res', res);
      alert('Data generated:' + JSON.stringify(res));
    } catch (err) {
      console.error(err);
      alert('Error:' + err.message);
    }
  };
  const onPassword = () => {
    const passwd = prompt('Please enter your password');
    if (!passwd) {
      return;
    }
    getMFAParams(
      {
        data: passwd,
        chainid: 1,
      },
      'password',
      passwd
    )
      .then(res => {
        console.log('res', res);
        alert('Data generated:' + JSON.stringify(res));
      })
      .catch(err => {
        console.error(err);
        alert('Error:' + err.message);
      });
  };
  return (
    <div>
      <div className={'module-title'}>MFA</div>
      <div
        style={{
          display: 'flex',
          gap: '10px',
        }}
      >
        <button onClick={onBiometric}>Biometric</button>
        <button onClick={onPassword}>Password</button>
      </div>
    </div>
  );
}
