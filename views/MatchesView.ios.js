'use strict';

let React = require('react-native');
let MatchCard = require('../components/MatchCard');
let People = [
  {photo: 'placeholder', username: 'slicemeister', gender: 'M', age: 30, compat: 60},
  {photo: 'placeholder', username: 'cheesehead', gender: 'F', age: 25, compat: 76},
  {photo: 'placeholder', username: 'simpleman', gender: 'M', age: 21, compat: 10}
];
let SWIPE_THRESHOLD = 120;
let clamp = require('clamp');

let {
  NavigatorIOS,
  View,
  Text,
  Animated,
  Component,
  PanResponder,
  StyleSheet
} = React;

let styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 49,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  card: {
    flex: 1,
    margin: 40,
    marginBottom: 80,
  },
  yup: {
    borderColor: 'green',
    borderWidth: 2,
    position: 'absolute',
    padding: 20,
    bottom: 20,
    borderRadius: 5,
    right: 20,
  },
  yupText: {
    fontSize: 16,
    color: 'green',
  },
  nope: {
    borderColor: 'red',
    borderWidth: 2,
    position: 'absolute',
    bottom: 20,
    padding: 20,
    borderRadius: 5,
    left: 20,
  },
  nopeText: {
    fontSize: 16,
    color: 'red',
  }
});

class MatchesView extends Component {
  render() {
    return (
      <NavigatorIOS
      style={{
        flex: 1
      }}
      navigationBarHidden={true}
      initialRoute={{
        component: MatchesSwiper,
        title: 'Matches',
        passProps: {
          navigationBarHidden: this.props.navigationBarHidden
        }
      }}
      />
    );
  }
}

class MatchesSwiper extends Component {
    constructor(props) {
      super(props);
      this.state = {
        pan: new Animated.ValueXY(),
        enter: new Animated.Value(0.5),
        personIndex: 0
      };
    }

    _didSwipe() {
      // DO SHIT
      this.setState({
        personIndex: this.state.personIndex + 1
      });
    }

    componentDidMount() {
      this._animateEntrance();
    }

    _animateEntrance() {
      Animated.spring(
        this.state.enter,
        { toValue: 1, friction: 8 }
      ).start();
    }

    componentWillMount() {
      this._panResponder = PanResponder.create({
        onMoveShouldSetResponderCapture: () => true,
        onMoveShouldSetPanResponderCapture: () => true,

        onPanResponderGrant: (e, gestureState) => {
          this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
          this.state.pan.setValue({x: 0, y: 0});
        },

        onPanResponderMove: Animated.event([
          null, {dx: this.state.pan.x, dy: this.state.pan.y},
        ]),

        onPanResponderRelease: (e, {vx, vy}) => {
          this.state.pan.flattenOffset();
          var velocity;

          if (vx >= 0) {
            velocity = clamp(vx, 3, 5);
          } else if (vx < 0) {
            velocity = clamp(vx * -1, 3, 5) * -1;
          }

          if (Math.abs(this.state.pan.x._value) > SWIPE_THRESHOLD) {
            Animated.decay(this.state.pan, {
              velocity: {x: velocity, y: vy},
              deceleration: 0.98
            }).start(this._resetState.bind(this));
          } else {
            Animated.spring(this.state.pan, {
              toValue: {x: 0, y: 0},
              friction: 4
            }).start();
          }
        }
      });
    }

    _resetState() {
      this.state.pan.setValue({x: 0, y: 0});
      this.state.enter.setValue(0);
      this._didSwipe();
      this._animateEntrance();
    }

    render() {
      var person = People[this.state.personIndex];
      let { pan, enter, } = this.state;

      let [translateX, translateY] = [pan.x, pan.y];

      let rotate = pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: ['-30deg', '0deg', '30deg']});
      let opacity = pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: [0.5, 1, 0.5]});
      let scale = enter;

      let animatedCardStyles = {transform: [{translateX}, {translateY}, {rotate}, {scale}], opacity};

      let yupOpacity = pan.x.interpolate({inputRange: [0, 150], outputRange: [0, 1]});
      let yupScale = pan.x.interpolate({inputRange: [0, 150], outputRange: [0.5, 1], extrapolate: 'clamp'});
      let animatedYupStyles = {transform: [{scale: yupScale}], opacity: yupOpacity};

      let nopeOpacity = pan.x.interpolate({inputRange: [-150, 0], outputRange: [1, 0]});
      let nopeScale = pan.x.interpolate({inputRange: [-150, 0], outputRange: [1, 0.5], extrapolate: 'clamp'});
      let animatedNopeStyles = {transform: [{scale: nopeScale}], opacity: nopeOpacity};

      return (
        <View style={styles.container}>
          <Animated.View style={[styles.card, animatedCardStyles]} {...this._panResponder.panHandlers}>
            <MatchCard person={person}></MatchCard>
          </Animated.View>

          <Animated.View style={[styles.nope, animatedNopeStyles]}>
            <Text style={styles.nopeText}>Nope!</Text>
          </Animated.View>

          <Animated.View style={[styles.yup, animatedYupStyles]}>
            <Text style={styles.yupText}>Yup!</Text>
          </Animated.View>
        </View>
      );
    }
}

module.exports = MatchesView;
