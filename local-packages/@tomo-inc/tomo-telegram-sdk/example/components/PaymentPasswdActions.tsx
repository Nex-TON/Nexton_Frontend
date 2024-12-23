import * as React from 'react';
import { usePaymentPasswd } from '../../src';

export default function PaymentPasswdActions() {
  const paymentPasswd = usePaymentPasswd();
  const setPasswd = async () => {
    const passwd = prompt('Please enter your password');
    if (!passwd) {
      return;
    }
    const res = await paymentPasswd.setPasswd(passwd);
    if (res) {
      alert('Password set successfully');
      await paymentPasswd.checkPasswd();
    } else {
      alert('Password set failed');
    }
  };
  const changePasswd = async () => {
    const old_passwd = prompt('Please enter your old password');
    if (!old_passwd) {
      return;
    }
    const new_passwd = prompt('Please enter your new password');
    if (!new_passwd) {
      return;
    }
    const res = await paymentPasswd.changePasswd(old_passwd, new_passwd);
    if (res) {
      alert('Password changed successfully');
    } else {
      alert('Password change failed');
    }
  };
  const validatePasswd = async () => {
    const passwd = prompt('Please enter your password');
    if (!passwd) {
      return;
    }
    const res = await paymentPasswd.validatePasswd(passwd);
    if (res) {
      alert('Password validated successfully');
    } else {
      alert('Password validate failed');
    }
  };
  const { paymentPwdExists } = usePaymentPasswd();
  return (
    <div>
      <div className={'module-title'}>PaymentPasswd Actions</div>

      <div>paymentPwdExists:{paymentPwdExists}</div>
      <div
        style={{
          display: 'flex',
          gap: '10px',
        }}
      >
        <button onClick={setPasswd} disabled={paymentPwdExists != 0}>
          Set Password
        </button>
        <button onClick={changePasswd} disabled={paymentPwdExists != 1}>
          Change Password
        </button>
        <button onClick={validatePasswd} disabled={paymentPwdExists != 1}>
          Validate Password
        </button>
      </div>
    </div>
  );
}
