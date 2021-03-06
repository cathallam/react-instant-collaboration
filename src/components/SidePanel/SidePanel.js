import React from 'react';
import { Menu } from 'semantic-ui-react';
import UserPanel from './UserPanel';
import Channels from './Channels';


// Stateful Component & Semantic UI
class SidePanel extends React.Component {
  render () {
    const{ currentUser } = this.props;
    return (
      <Menu
        size='large'
        inverted
        fixed='left'
        vertical
        style={{ background: '#000', fontSize: '1.2rem' }} 
        >

         {/* Pass currentUser prop the username and avatar from userPanel and Channels  */}
        <UserPanel currentUser={currentUser} />
        <Channels currentUser={currentUser} />
      </Menu>
    )
  }
}

export default SidePanel;