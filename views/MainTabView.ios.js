'use strict';

let React = require('react-native');
let MatchesView = require('./MatchesView');
let MessagesView = require('./MessagesView');
let {
  StyleSheet,
  TabBarIOS,
  Text,
  View,
  Component
} = React;

class MainTabView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'matches'
    };
  }

  tabPress(tab) {
    this.setState({
      selectedTab: tab
    });
  }

  render() {
    return (
      <TabBarIOS
        tintColor='orange'
        barTintColor='#fffbdd'>
        <TabBarIOS.Item
          title='Swipe'
          selected={this.state.selectedTab === 'swipe'}
          onPress={this.tabPress.bind(this, 'swipe')}>
          <MatchesView />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title='Matches'
          icon={require('image!messageIcon')}
          selected={this.state.selectedTab === 'matches'}
          onPress={this.tabPress.bind(this, 'matches')}>
          <MessagesView />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title='Settings'
          selected={this.state.selectedTab === 'settings'}
          onPress={this.tabPress.bind(this, 'settings')}>
          <Text>Settings</Text>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

module.exports = MainTabView;
