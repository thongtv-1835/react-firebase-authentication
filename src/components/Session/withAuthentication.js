import React from 'react';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null,
      }
    }

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? this.setState({ authUser })
          : this.setState({ authUser: null })
      })
    }

    componentWillUnmount() {
      // TODO: research this. Book: p.57
      // Link: https://www.robinwieruch.de/react-warning-cant-call-setstate-on-an-unmounted-component/
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props}/>
        </AuthUserContext.Provider>
      );
    }
  }
  
  return withFirebase(WithAuthentication);
}

export default withAuthentication;