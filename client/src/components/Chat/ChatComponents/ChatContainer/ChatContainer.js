import React from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../../selectors';
import Chat from '../Chat/Chat';

const ChatContainer = () => {
  const user = useSelector(userSelector);
  if (user) {
    return <Chat />;
  }
  return null;
};

export default ChatContainer;
