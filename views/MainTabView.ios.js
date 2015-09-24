'use strict';

let React = require('react-native');
let MatchesView = require('./MatchesView');
let ConversationsView = require('./ConversationsView');
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
      selectedTab: "matches"
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
        tintColor="orange"
        barTintColor="darkslateblue">
        <TabBarIOS.Item
          title="Matches"
          selected={this.state.selectedTab === "matches"}
          onPress={this.tabPress.bind(this, "matches")}>
          <MatchesView />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Messages"
          icon={require('image!messageIcon')}
          selected={this.state.selectedTab === "messages"}
          onPress={this.tabPress.bind(this, "messages")}>
          <ConversationsView />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Settings"
          selected={this.state.selectedTab === "settings"}
          onPress={this.tabPress.bind(this, "settings")}>
          <Text>Settings</Text>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

module.exports = MainTabView;
