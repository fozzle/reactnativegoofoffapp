'use strict';
let React = require('react-native');
let Constants = require('../util/Constants');
let ToppingSelectView = require('./ToppingSelectView');
let ImagePicker = require('NativeModules').UIImagePickerManager;
let MultiSlider = require('react-native-multi-slider');
let Popover = require('react-native-popover');
let SelectableButton = require('../components/SelectableButton');
let {
  Component,
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  PickerIOS,
  TouchableHighlight,
  Modal
} = React;

let PickerIOSItem = PickerIOS.Item;
let GENDERS = {'M': 'Male', 'F': 'Female', 'O': 'Other'};
let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 40
  },
  row: {
    padding: 10,
    borderTopWidth: 1,
    borderColor: 'gray',
    flexDirection: 'row'
  },
  rowControlsContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
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
    flex: 1
  },
  metaTextContainer: {
    padding: 10,
    flexDirection: 'row'
  },
  genderPickerText: {
    padding: 5,
    fontSize: 20
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
        photo: 'placeholder',
        age: 24,
        gender: 'M'
      },
      lookingFor: {
        ages: [21, 28],
        genders: ['M', 'F', 'O']
      },
      genderPopoverVisible: false,
      agePopoverVisible: false,
      modalVisible: false
    }; // Fill in current settings from profile here
  }

  _pressImage() {
    // Allow to select a new image
    ImagePicker.showImagePicker({
      title: 'Select Profile Photo',
      cancelButtonTitle: 'Cancel',
      takePhotoButtonTitle: 'Take Photo',
      chooseFromLibraryButtonTitle: 'Choose from Library...',
      quality: 0.5,
      allowsEditing: false
    }, this._imageSelected.bind(this));
  }

  _imageSelected(responseType, response) {
    if (responseType !== 'cancel') {
      let source;
      if (responseType === 'data') {
        source = {uri: 'data:image/jpeg;base64,' + response, isStatic: true};
      } else if (responseType === 'uri') {
        source = {uri: response.replace('file://', ''), isStatic: true};
      }

      this.setState({profile: Object.assign({}, this.state.profile, {photo: source})});
    }
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

  _showGenderPopover() {
    this.refs.genderTouch.measure((ox, oy, width, height, px, py) => {
      this.setState({
        genderPopoverVisible: true,
        popoverRect: {x: px, y: py, width: width, height: height}
      });
    });
  }

  _closeGenderPopover() {
    this.setState({genderPopoverVisible: false});
  }

  _showAgePopover() {
    this.refs.ageTouch.measure((ox, oy, width, height, px, py) => {
      this.setState({
        agePopoverVisible: true,
        popoverRect: {x: px, y: py, width: width, height: height}
      });
    });
  }

  _closeAgePopover() {
    this.setState({agePopoverVisible: false});
  }

  _ageChange(age) {
    this.setState({profile: Object.assign({}, this.state.profile, {age: age})});
    this._closeAgePopover();
  }

  _ageRangeChange(range) {
    this.setState({lookingFor: Object.assign({}, this.state.lookingFor, {ages: range})});
  }

  _genderChange(gender) {
    this.setState({profile: Object.assign({}, this.state.profile, {gender: gender})});
    this._closeGenderPopover();
  }

  _genderSelectionChanged(value, selected) {
    var newSelection = this.state.lookingFor.genders;

    // If removing, remove
    if (!selected) {
      newSelection = newSelection.filter((arrVal) => arrVal != value);
    } else {
      newSelection = newSelection.concat(value);
    }

    this.setState({selectedToppings: newSelection});
  }

  render() {
    var agePickerItems = [];
    for (let i = 0; i < 100; i++) {
      agePickerItems.push(<PickerIOSItem key={i} value={i} label={i.toString()}/>);
    }
    let photoSource = this.state.profile.photo === 'placeholder' ? require('image!placeholder') : this.state.profile.photo;
    return (
      <View style={styles.container}>
        <Modal
          animated={true}
          transparent={false}
          visible={this.state.modalVisible}>
          <ToppingSelectView selectedToppings={['Ham']} toppingSelectionFinished={this._toppingsPreferencesChanged.bind(this)} isInModal={true} />
        </Modal>
        <View style={styles.profileContainer}>
            <TouchableHighlight onPress={() => this._pressImage()}>
              <Image style={styles.profileImage} source={photoSource}></Image>
            </TouchableHighlight>
            <View style={styles.metaTextContainer}>
              <Text style={styles.metaText}>
                {this.state.profile.username} -
              </Text>
              <TouchableHighlight ref='ageTouch' onPress={this._showAgePopover.bind(this)}>
                <Text style={styles.metaText}> {this.state.profile.age}</Text>
              </TouchableHighlight>
              <Text style={styles.metaText}> - </Text>
              <TouchableHighlight ref='genderTouch' onPress={this._showGenderPopover.bind(this)}>
                <Text style={styles.metaText}>{this.state.profile.gender}</Text>
              </TouchableHighlight>
            </View>
        </View>
        <View style={[styles.row, {flexDirection: 'column'}]}>
          <Text style={[styles.rowText, {fontWeight: 'bold'}]}>Looking for...</Text>
          <View style={styles.rowControlsContainer}>
            <Text style={styles.rowText}>Ages {this.state.lookingFor.ages[0]} - {this.state.lookingFor.ages[1]}</Text>
            <MultiSlider
              sliderLength={200}
              selectedStyle={{backgroundColor: 'orange'}}
              values={this.state.lookingFor.ages}
              onValuesChange={this._ageRangeChange.bind(this)}
              onValuesChangeFinish={this._ageRangeChange.bind(this)}
              min={18}
              max={99}
              step={1}/>
          </View>
          <View style={styles.rowControlsContainer}>
            {Object.keys(GENDERS).map((genderCode) => (
              <SelectableButton
                key={genderCode}
                innerText={GENDERS[genderCode]}
                isSelected={this.state.lookingFor.genders.indexOf(genderCode) !== -1}
                onSelectionChanged={this._genderSelectionChanged.bind(this)}
                />
            ))}
          </View>
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

        <Popover
          isVisible={this.state.genderPopoverVisible}
          fromRect={this.state.popoverRect}
          onClose={this._closeGenderPopover.bind(this)}>
            {Object.keys(GENDERS).map((genderCode) => (
              <Text style={styles.genderPickerText}
                key={genderCode}
                onPress={this._genderChange.bind(this, genderCode)}>
                {GENDERS[genderCode]}
              </Text>
            ))}
        </Popover>
        <Popover
          isVisible={this.state.agePopoverVisible}
          fromRect={this.state.popoverRect}>
              <PickerIOS
                selectedValue={this.state.profile.age}
                onValueChange={this._ageChange.bind(this)}
                style={{width: 200}}>
                {agePickerItems}
              </PickerIOS>
        </Popover>
      </View>
    );
  }
}

module.exports = SettingsView;
