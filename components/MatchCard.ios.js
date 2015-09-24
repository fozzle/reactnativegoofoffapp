'use strict';

let React = require('react-native');
let {
  StyleSheet,
  Text,
  View,
  Component
} = React;

let styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  usernameText: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  detailText: {
    fontSize: 14,
    color: 'gray'
  }
});

class MatchCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.usernameText}>{this.props.person.username}</Text>
        <Text style={styles.detailText}>{this.props.person.age} - {this.props.person.gender} - {this.props.person.compat}% Pizza Rating</Text>
      </View>
    );
  }
}

MatchCard.propTypes = {
  person: React.PropTypes.shape({
    photo: React.PropTypes.string.isRequired,
    username: React.PropTypes.string.isRequired,
    age: React.PropTypes.number.isRequired,
    gender: React.PropTypes.string.isRequired,
    compat: React.PropTypes.number.isRequired
  })
};

module.exports = MatchCard;
