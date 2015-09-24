var React = require('react-native');
var ConversationRow = require('../components/ConversationRow');
var {
  NavigatorIOS,
  ListView,
  Text
} = React;

var ConversationsView = React.createClass({
  render() {
    return (
      <NavigatorIOS
      style={{
        flex: 1
      }}
      navigationBarHidden={true}
      initialRoute={{
        component: ConversationListView,
        title: "Conversations",
        passProps: {
          navigationBarHidden: this.props.navigationBarHidden
        }
      }}
      />
    );
  }
});

var ConversationListView = React.createClass({
  getInitialState() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows([
        {photo: "placeholder", username: "convo1", gender: "M", age: 30, compat: 60, lastMessage: "hi there sexy"},
        {photo: "placeholder", username: "convo2man", gender: "F", age: 25, compat: 76, lastMessage: "i pick my nose"},
        {photo: "placeholder", username: "convo3girl", gender: "M", age: 21, compat: 10, lastMessage: "your dreamboat has arrived"}
      ])
    };
  },
  renderRow(rowData) {
    return (
      <ConversationRow data={rowData}></ConversationRow>
    )
  },
  render() {
    return (
      <ListView dataSource={this.state.dataSource}
      renderRow={this.renderRow}
      />
    )
  }
});

module.exports = ConversationsView;
