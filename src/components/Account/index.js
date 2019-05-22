import React from 'react';

import PasswordChangeForm from '../PasswordChange';
import { PasswordForgetForm } from '../PasswordForget';

const AccountPage = () => (
  <div>
    <h1>Account Page</h1>
    <h2>Change Password</h2>
    <PasswordChangeForm/>
    <h2>Reset Password</h2>
    <PasswordForgetForm/>
  </div>
)

export default AccountPage;