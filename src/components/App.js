import React from 'react';
import './App.css';
import { Grid } from 'semantic-ui-react';
import ColorPanel from './ColorPanel/ColorPanel';
import SidePanel from './SidePanel/SidePanel';
import Messages from './Messages/Messages';
import MetaPanel from './MetaPanel/MetaPanel';
import { connect } from 'react-redux';

// Semantic UI & wrap messages and metapanel in a grid column tags
const App = ({ currentUser, currentChannel }) => (
  <Grid columns='equal' className='app' style={{ background: '#eee' }} >
    <ColorPanel />
    <SidePanel 
      key={currentUser && currentUser.uid}
      currentUser={currentUser} />

  <Grid.Column style={{ marginLeft: 320 }}>
      <Messages 
      key={currentChannel && currentChannel.id}
        currentChannel={currentChannel}
        currentUser={currentUser}
      />
    </Grid.Column>

  <Grid.Column width={ 4 }>
      <MetaPanel />
    </Grid.Column>

   
  </Grid>

)
// From redux index.js reducer page to display userName in the side panel
const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel
});


export default connect(mapStateToProps)(App);
