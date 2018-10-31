import React from 'react';
import firebase from '../../firebase';
import { connect } from 'react-redux';
import { setCurrentChannel } from '../../actions';
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';

// User obtained from SidePanel.js
class Channels extends React.Component {
  state = {
    activeChannel: '',
    user: this.props.currentUser,
    channels: [],
    channelName: '',
    channelDetails: '',
    channelsRef: firebase.database().ref('channels'),
    modal: false,
    firstLoad: true
  };
// Retrieve all the channel data that users have added
componentDidMount() {
  this.addListeners();
}

// Used for example to go to a different route in the app
componentWillUnmount()
 {
  this.removeListeners();

}
// Add channel listener & Load a default channel
addListeners = () => {
  let loadedChannels = [];
  this.state.channelsRef.on('child_added', snap => {
    loadedChannels.push(snap.val());
    this.setState({ channels: loadedChannels }, () => this.setFirstChannel());
  });
};

// To remove the listeners for events that will not take place
removeListeners = () => {
  this.state.channelsRef.off();
}

// Setting which channel we are on using this.setActiveChannel
setFirstChannel = () => {
  const firstChannel = this.state.channels[0];
  if(this.state.firstLoad && this.state.channels.length > 0) {
    this.props.setCurrentChannel(firstChannel);
    this.setActiveChannel(firstChannel);
}
this.setState({ firstLoad: false });
}

// Creates a Firebase channel ref in destructured state object and create unique key for each new channel. 
// Const newChannel creates a destructured name passed from SidePanel.js */}

  addChannel = () => {
    const { channelsRef, channelName, channelDetails, user } = this.state;

    const key = channelsRef.push().key;

    const newChannel = {
      id: key,
      name: channelName,
      details: channelDetails,
      createdBy: {
        name: user.displayName,
        avatar: user.photoURL
      }
    };

/* Add a child with key variable, use update function to pass new channel onto the key
include a then, set the state to clear channel name and channel detail from state, console channel added*/

    channelsRef
      .child(key)
      .update(newChannel)
      .then(() => {
        this.setState({ channelName: '', channelDetails: '' });
        this.closeModal();
        console.log('channel added');
      })
      .catch(err => {
        console.error(err);
      });
  };
// Submit function taking an event to add new channel
  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.addChannel();
    }
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  // Channel data from reducers will exist on this channel property on global state
  // Set first channel on page load, show active channel
  changeChannel = channel => {
    this.setActiveChannel(channel)
    this.props.setCurrentChannel(channel);
  };
// Set first channel on page load, show active channel
  setActiveChannel = channel => {
    this.setState({ activeChannel: channel.id})
  }

// Channels created - puts channel information on global state
// Setting active channel based on ID
  displayChannels = channels =>
  channels.length > 0 &&
  channels.map(channel => (
    <Menu.Item
      key={channel.id}
      onClick={() => this.changeChannel(channel)}
      name={channel.name}
      style={{ opacity: 0.7 }}
      active={channel.id === this.state.activeChannel}>
      # {channel.name}
    </Menu.Item>
  ));

// Create validation function and destructure
  isFormValid = ({ channelName, channelDetails }) =>
    channelName && channelDetails;

// Open and close using the add and cancel button
  openModal = () => this.setState({ modal: true });

  closeModal = () => this.setState({ modal: false });

// React Fragment used for grouping multiple components - Menu component and Modal components to return one component within a file
  render() {
    const { channels, modal } = this.state;

    return (
      <React.Fragment>
        <Menu.Menu style={{ paddingBottom: '2em' }}>
          <Menu.Item>
            <span>
              <Icon name='comment outline' /> Vice List
            </span>{''}
            ({channels.length}) <Icon name='pencil alternate' onClick={this.openModal} />
          </Menu.Item>
          {/* Channels - Iterating over Channels Created */}
          {this.displayChannels(channels)}
        </Menu.Menu>

        {/* Add Channel Modal */}
        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Sharing is caring</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <Input
                  fluid
                  label='Confess your vice'
                  name='channelName'
                  onChange={this.handleChange}
                />
              </Form.Field>

              <Form.Field>
                <Input
                  fluid
                  label='Add details!'
                  name='channelDetails'
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>

          <Modal.Actions>
            <Button color='pink' inverted onClick={this.handleSubmit}>
              <Icon name='checkmark' /> Add
            </Button>
            <Button color='red' inverted onClick={this.closeModal}>
              <Icon name='remove' /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    );
  }
}

export default connect(null, { setCurrentChannel })(Channels);



