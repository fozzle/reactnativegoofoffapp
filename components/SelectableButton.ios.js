var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableHighlight,
  Animated
} = React;

var WHITE = 0,
  ORANGE = 1;

var AnimatedTouchableHighlight = Animated.createAnimatedComponent(TouchableHighlight);

var SelectableButton = React.createClass({
  getInitialState() {
    return {
      bgColor: new Animated.Value(WHITE),
      textColor: new Animated.Value(ORANGE),
      selected: false
    };
  },
  render() {
    var bgColor = this.state.bgColor.interpolate({
      inputRange: [WHITE, ORANGE],
      outputRange: [
        'rgb(255,255,255)', // WHITE
        'rgb(255,202,74)' // ORANGE
      ]
    });

    var textColor = this.state.textColor.interpolate({
      inputRange: [WHITE, ORANGE],
      outputRange: [
        'rgb(255,255,255)', // WHITE
        'rgb(255,202,74)' // ORANGE
      ]
    });

    return (
      <AnimatedTouchableHighlight
        onPress={this._onPressButton}
        activeOpacity={0.7}
        underlayColor='rgb(255,202,74)'
        style={[styles.toppingText, {backgroundColor: bgColor}]}>
        <Animated.Text style={{color: textColor, fontWeight: 'bold'}}>{this.props.innerText}</Animated.Text>
      </AnimatedTouchableHighlight>
    )
  },
  _onPressButton() {
    var isSelected = !this.state.selected;
    var bgTarget = isSelected ? ORANGE : WHITE;
    var textTarget = isSelected ? WHITE : ORANGE;

    this.setState({
      selected: isSelected
    });
    if (this.props.onSelectionChanged) this.props.onSelectionChanged(this.props.innerText, isSelected)

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
});

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

module.exports = SelectableButton
