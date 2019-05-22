import React, { Component } from 'react';
import { withFirebase } from '../Firebase';

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
    }
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();
      /** 
       *  usersObject =
       *  {
       *    iY0qR4xAOgWsjHqMRdNeQ5PSjX53: {email: "test14@gmail.com", username: "test14"},
       *    rq6PBX5bXmMs6ifSejjCG9eynMk2: {email: "test13@gmail.com", username: "test13"},
       *  }
      */
      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }))
      /**
       *  usersList =
       *  [
       *    {email: "test14@gmail.com", username: "test14", uid: "iY0qR4xAOgWsjHqMRdNeQ5PSjX53"},
       *    {email: "test13@gmail.com", username: "test13", uid: "rq6PBX5bXmMs6ifSejjCG9eynMk2"}
       *  ]
       */
      this.setState({
        users: usersList,
        loading: false,
      })
    })
    console.log(this.props.firebase.users());
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;

    return (
      <div>
        <h1>AdminPage</h1>
        {loading && <div>Loading...</div>}
        <UserList users={users}/>
      </div>
    )
  }
}

const UserList = ({users}) => (
  <ul>
    {users.map(user => (
      <li key={user.uid}>
        <span>
          <strong>ID:</strong> {user.uid}
        </span>
        <span>
          <strong>E-Mail:</strong> {user.email}
        </span>
        <span>
          <strong>Username:</strong> {user.username}
        </span>
      </li>
    ))}
  </ul>
)

export default withFirebase(AdminPage);