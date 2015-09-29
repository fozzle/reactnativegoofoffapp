'use strict';

let React = require('react-native');
let {
  StyleSheet,
  Text,
  View,
  Component,
  Image
} = React;

let styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    flexDirection: 'column',
    justifyContent: 'space-around',
    shadowColor: 'black',
    shadowRadius: 2,
    shadowOpacity: 1,
    shadowOffset: {width: 0, height: 2}
  },
  profileImage: {
    flex: 80,
    backgroundColor: 'red',
    alignSelf: 'stretch'
  },
  usernameText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
    flex: 5
  },
  detailText: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
    flex: 5
  }
});

class MatchCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let profileImageSource = this.props.person.photo === "placeholder" ? require('image!placeholder') : {uri: this.props.person.photo};
    return (
      <View style={styles.container}>
        <Image style={styles.profileImage} resizeMode={Image.resizeMode.stretch} source={profileImageSource}></Image>
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
