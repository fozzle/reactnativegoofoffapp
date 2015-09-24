var React = require('react-native');
var {
  Text,
  Image,
  View,
  TouchableHighlight,
  StyleSheet
} = React;

var styles = StyleSheet.create({
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
var ConversationRow = React.createClass({
  propTypes: {
    data: React.PropTypes.shape({
      photo: React.PropTypes.string.isRequired,
      username: React.PropTypes.string.isRequired,
      age: React.PropTypes.number.isRequired,
      gender: React.PropTypes.string.isRequired,
      compat: React.PropTypes.number.isRequired
    }),
  },
  render() {
    var profileImageSource = this.props.data.photo === "placeholder" ? require('image!placeholder') : {uri: this.props.data.photo};
    return (
      <TouchableHighlight>
        <View style={styles.container}>
          <Image style={styles.profileImage} source={profileImageSource}></Image>
          <Text style={styles.usernameText}>{this.props.data.username}</Text>
          <Text style={styles.metaText}>{this.props.data.gender} - {this.props.data.age} - {this.props.data.compat}%</Text>
        </View>
      </TouchableHighlight>
    )
  }
});

module.exports = ConversationRow;
