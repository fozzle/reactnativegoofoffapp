'use strict';
let React = require('react-native');
let {
  Component,
  ListView,
  View,
  Text
} = React;

class ConversationView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Text>{this.props.person.username}</Text>
    );
  }
}

module.exports = ConversationView;
