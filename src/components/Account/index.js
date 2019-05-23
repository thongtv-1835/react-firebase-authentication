import React from 'react';

import PasswordChangeForm from '../PasswordChange';
import { PasswordForgetForm } from '../PasswordForget';
import { AuthUserContext, withAuthorization } from '../Session';

const AccountPage = () => (
  <AuthUserContext.Consumer>
  {authUser => (
    <div>
      <h1>Account: {authUser.email}</h1>
      <h2>Change Password</h2>
      <PasswordChangeForm />
      <h2>Reset Password</h2>
      <PasswordForgetForm />
    </div>
  )}
    
  </AuthUserContext.Consumer>
)

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);
