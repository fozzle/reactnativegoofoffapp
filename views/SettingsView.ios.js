'use strict';
let React = require('react-native');
let Constants = require('../util/Constants');
let ToppingSelectView = require('./ToppingSelectView');
let {
  Component,
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableHighlight,
  Modal
} = React;

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    paddingTop: 40
  },
  row: {
    flex: 1,
    padding: 10,
    borderTopWidth: 1,
    backgroundColor: 'lightgray',
    borderColor: 'gray',
    flexDirection: 'row'
  },
  profileContainer: {
    alignItems: 'center',
    margin: 10
  },
  profileImage: {
    width: 150,
    height: 150,
    backgroundColor: 'lightgray',
    borderRadius: 75
  },
  metaText: {
    color: 'gray',
    padding: 10
  },
  rowText: {
    flex: 2
  },
  deletionText: {
    color: 'red',
    fontWeight: 'bold'
  }

});

class SettingsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {
        username: 'TestUsername',
        age: 24,
        gender: 'M'
      },
      modalVisible: false
    }; // Fill in current settings from profile here
  }

  _pressImage() {
    // Allow to select a new image
  }

  _pressPizzaPreferences() {
    // go to topping select within modal
    this.setState({modalVisible: true});
  }

  _toppingsPreferencesChanged() {
    this.setState({modalVisible: false});
    // Save toppings
  }

  _pressDeleteAccount() {
    // destroy session and return to home
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animated={true}
          transparent={false}
          visible={this.state.modalVisible}>
          <ToppingSelectView toppingSelectionFinished={this._toppingsPreferencesChanged.bind(this)} isInModal={true} />
        </Modal>
        <View style={styles.profileContainer}>
            <TouchableHighlight onPress={() => this._pressImage()}>
              <Image style={styles.profileImage} source={require('image!placeholder')}></Image>
            </TouchableHighlight>
            <Text style={styles.metaText}>{this.state.profile.username} - {this.state.profile.age} - {this.state.profile.gender}</Text>
        </View>
        <TouchableHighlight onPress={() => this._pressPizzaPreferences()}>
          <View style={styles.row}>
            <Text style={styles.rowText}>Edit pizza preferences</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this._pressDeleteAccount()}>
          <View style={styles.row}>
            <Text style={[styles.rowText, styles.deletionText]}>Delete account</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

module.exports = SettingsView;
