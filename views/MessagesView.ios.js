'use strict';

let React = require('react-native');
let ConversationView = require('./ConversationView');
let NavigationBar = require('react-native-navbar');
let {
  Navigator,
  ListView,
  Text,
  Component,
  TouchableHighlight,
  View,
  Image,
  StyleSheet,
  TouchableOpacity
} = React;

let styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'gray'
  },
  profileImage: {
    margin: 5,
    marginRight: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    resizeMode: 'contain'
  },
  metaText: {
    color: 'gray',
    fontSize: 14,
    margin: 5
  },
  usernameText: {
    flex: 3,
    fontSize: 24,
  },
  navigator: {
    flex: 1
  }
});

class MessagesView extends Component {
  render() {
    return (
      <Navigator
        configureScene={() => {
          return Navigator.SceneConfigs.HorizontalSwipeJump;
        }}
        renderScene={(route, navigator) => {
          var navBar = route.navigationBar;
          var component = route.component;

          if (component) {
            component = React.createElement(component, Object.assign({}, {navigator: navigator}, route.passProps));
          }

          if (navBar) {
            navBar = React.addons.cloneWithProps(navBar, {
              navigator: navigator,
              route: route
            });
          }

          return (
            <View style={styles.navigator}>
              {navBar}
              {component}
            </View>
          );
        }}
        initialRoute={{
          component: ConversationListView,
          title: 'Conversations'
        }}
      />
    );
  }
}

class ConversationListView extends Component {
  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let data = [{photo: 'placeholder', username: 'convo1', gender: 'M', age: 30, compat: 60, lastMessage: 'hi there sexy'},
    {photo: 'placeholder', username: 'convo2man', gender: 'F', age: 25, compat: 76, lastMessage: 'i pick my nose'},
    {photo: 'placeholder', username: 'convo3girl', gender: 'M', age: 21, compat: 10, lastMessage: 'your dreamboat has arrived'}];
    this.state = {
      dataSource: ds.cloneWithRows(data),
      people: data
    };
  }

  _onPressRow(rowID) {
    console.log('row touched ' + rowID);
    this.props.navigator.push({
      title: 'Neato',
      component: ConversationView,
      navigationBar: <NavigationBar title={this.state.people[rowID].username} />,
      passProps: {
        person: this.state.people[rowID]
      }
    });
  }

  _renderRow(rowData, sectionID, rowID) {
    let person = this.state.people[rowID];
    let profileImageSource = person.photo === 'placeholder' ? require('image!placeholder') : {uri: person.photo};
    return (
      <TouchableHighlight onPress={() => this._onPressRow(rowID)}>
        <View style={styles.container}>
          <Image style={styles.profileImage} source={profileImageSource}></Image>
          <Text style={styles.usernameText}>{person.username}</Text>
          <Text style={styles.metaText}>{person.gender} - {person.age} - {person.compat}%</Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <ListView
      dataSource={this.state.dataSource}
      renderRow={this._renderRow.bind(this)}
      />
    );
  }
}

module.exports = MessagesView;
