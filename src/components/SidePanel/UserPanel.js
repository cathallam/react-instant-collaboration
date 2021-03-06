import React from 'react';
import { Grid, Header, Icon, Dropdown, Image } from 'semantic-ui-react';
import firebase from '../../firebase';
//import { connect } from 'react-redux';

// Create a class based stateful component
// Creates user information within a user panel component
//Creates username value within drop down menu

class UserPanel extends React.Component {
  state = {
    user: this.props.currentUser
  }

  dropdownOptions = () => [
    {
    key: 'user',
    text: <span>Signed in as <strong>{this.state.user.displayName}</strong></span>,
    disabled: true
    },
    {
      key: 'avatar',
      text: <span>Change Avatar</span>
    },
    {
      key: 'signout',
      text: <span onClick={this.handleSignout}>Signed Out</span>
    }
  ];

  handleSignout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log('signed out'));
  }

  render () {
    const{ user } = this.state;

    return (
      <Grid style={{ background: '#140010' }} >
        <Grid.Column>
          <Grid.Row style={{ padding: '1.2em', margin: 0 }}>
          {/* App Header */}
            <Header inverted floated ='left' as='h3'>
              <Icon name='gg circle' />
              <Header.Content>Vice App</Header.Content>
            </Header>
        </Grid.Row>
         {/* User Dropdown  and log out option */}
      <Header style={{ padding: '0.2em' }} as='h4' inverted>
          <Dropdown
              trigger=
              {<span>
                <Image src={user.photoURL} spaced='right' avatar />
                  {user.displayName}
              </span>}
              options={this.dropdownOptions()}
            />
         </Header>
      </Grid.Column>
      </Grid>
   )
}
}

// From redux index.js reducer page
/* const mapStateToProps = state => ({
  currentUser: state.user.currentUser
}); */

export default (UserPanel);
