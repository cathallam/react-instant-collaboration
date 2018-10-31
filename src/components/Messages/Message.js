import React from 'react';
import moment from 'moment';
import { Comment } from 'semantic-ui-react';

// Message and user props to determine whether ID of user authenticated that's currently authenticated is the same ID of the user that created the message and give the message a special class
const isOwnMessage = (message, user) => {
  return message.user.id === user.uid ? 'message__self' : '';
};

const timeFromNow = timestamp => moment(timestamp).fromNow();

const Message = ({ message, user }) => (
  <Comment>
    <Comment.Avatar src={message.user.avatar} />
    <Comment.Content className={isOwnMessage(message, user)}>
      <Comment.Author as='a'>{message.user.name}</Comment.Author>
      <Comment.Metadata>{timeFromNow(message.timestamp)}</Comment.Metadata>
      <Comment.Text>{message.content}</Comment.Text>
    </Comment.Content>
  </Comment>
);

export default Message;
