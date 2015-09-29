'use strict';

let React = require('react-native');
let {
  Text,
  Image,
  View,
  TouchableHighlight,
  StyleSheet,
  Component
} = React;

let styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15
  },
  profileImage: {
    margin: 5
  },
  metaText: {
    color: 'gray',
    fontSize: 14,
    margin: 5
  },
  usernameText: {
    flex: 3,
    fontSize: 24,
    backgroundColor: 'red'
  }
});

class ConversationRow extends Component {
  render() {
    let profileImageSource = this.props.person.photo === 'placeholder' ? require('image!placeholder') : {uri: this.props.person.photo};
    return (
      <TouchableHighlight>
        <View style={styles.container}>
          <Image style={styles.profileImage} source={profileImageSource}></Image>
          <Text style={styles.usernameText}>{this.props.person.username}</Text>
          <Text style={styles.metaText}>{this.props.person.gender} - {this.props.person.age} - {this.props.person.compat}%</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

ConversationRow.propTypes = {
  person: React.PropTypes.shape({
    photo: React.PropTypes.string.isRequired,
    username: React.PropTypes.string.isRequired,
    age: React.PropTypes.number.isRequired,
    gender: React.PropTypes.string.isRequired,
    compat: React.PropTypes.number.isRequired
  })
};

module.exports = ConversationRow;
