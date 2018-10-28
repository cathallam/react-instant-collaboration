import React from 'react';
import { Segment, Button, Input } from 'semantic-ui-react';
import firebase from '../../firebase';

class MessageForm extends React.Component {
  state = {
    message: '',
    user:this.props.currentUser,
    channel: this.props.currentChannel,
    loading: false,
    errors: []
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  createMessage = () => {
    const message = {
      timestamp: firebase.database.ServerValue.timestamp,
      user: {
        id: this.state.user.uid,
        name:this.state.user.displayName,
        avatar: this.state.user.photoURL

      },
      content: this.state.message
    };
    return message;
  }

  sendMessage = () => {
    const { messagesRef } = this.props;
    const { message, channel } = this.state;
    if (message) {
      this.setState({ loading: true });
      // send message
      messagesRef
      .child(channel.id)
      .push()
      .set(this.createMessage())
      .then(() => {
        this.setState({ loading: false, message:'', errors: []})
      })
      .catch(err => {
        console.error(err);
        this.setState({
          loading: false,
          errors: this.state.errors.concat(err)
        })
      })
    } else { this.setState({
      errors:this.state.errors.concat({ messages: 'Add a message'})
    })
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <Segment className='message__form'>
        <Input
          fluid
          name='message'
          onChange={this.handleChange}
          style={{ marginBottom: '0.7em' }}
          label={<Button icon={'add'} />}
          labelPosition='left'
          className= {
            errors.some(error => error.message.includes('message')) ? 'error'  : ''}
          placeholder='Write your message'
        />
        <Button.Group icon widths='2'>
          <Button
          onClick={this.sendMessage}
            color='pink'
            content='Add Reply'
            labelPosition='left'
            icon='edit'
          />
          <Button
            color='teal'
            content='Upload Media'
            labelPosition='right'
            icon='cloud upload'
          />
        </Button.Group>
      </Segment>
    );
  }
}

export default MessageForm;
