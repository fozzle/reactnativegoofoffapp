'use strict';

let React = require('react-native');
let {
  AppRegistry,
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableHighlight,
  Animated,
  Component
} = React;

let WHITE = 0,
  ORANGE = 1;

let AnimatedTouchableHighlight = Animated.createAnimatedComponent(TouchableHighlight);

let styles = StyleSheet.create({
  toppingText: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'orange',
    padding: 10,
    margin: 5,
  },
  selectedText: {
    fontWeight: 'bold',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'orange',
    padding: 10,
    margin: 5,
  }
});

class SelectableButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgColor: new Animated.Value(WHITE),
      textColor: new Animated.Value(ORANGE),
      selected: false
    };
  }

  render() {
    let bgColor = this.state.bgColor.interpolate({
      inputRange: [WHITE, ORANGE],
      outputRange: [
        'rgb(255,255,255)', // WHITE
        'rgb(255,202,74)' // ORANGE
      ]
    });

    let textColor = this.state.textColor.interpolate({
      inputRange: [WHITE, ORANGE],
      outputRange: [
        'rgb(255,255,255)', // WHITE
        'rgb(255,202,74)' // ORANGE
      ]
    });

    return (
      <AnimatedTouchableHighlight
        onPress={() => this._onPressButton()}
        activeOpacity={0.7}
        underlayColor='rgb(255,202,74)'
        style={[styles.toppingText, {backgroundColor: bgColor}]}>
        <Animated.Text style={{color: textColor, fontWeight: 'bold'}}>{this.props.innerText}</Animated.Text>
      </AnimatedTouchableHighlight>
    );
  }

  _onPressButton() {
    let isSelected = !this.state.selected;
    let bgTarget = isSelected ? ORANGE : WHITE;
    let textTarget = isSelected ? WHITE : ORANGE;

    this.setState({
      selected: isSelected
    });
    if (this.props.onSelectionChanged) this.props.onSelectionChanged(this.props.innerText, isSelected);

    // animate shift
    Animated.timing(this.state.bgColor, {
      toValue: bgTarget,
      duration: 200
    }).start();
    Animated.timing(this.state.textColor, {
      toValue: textTarget,
      duration: 200
    }).start();
  }

}

module.exports = SelectableButton;
