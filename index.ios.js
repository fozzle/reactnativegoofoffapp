'use strict';

var React = require('react-native');
var ToppingSwitch = require('./ToppingSwitch');
var {
  AppRegistry,
  StyleSheet,
  SwitchIOS,
  ScrollView,
  Text,
  View,
} = React;

var PlentyOfSlices = React.createClass({
  getInitialState() {
    return {
      switchState: false,
      toppings: ["Pepperoni",
        "Mushroom",
        "Spinach",
        "Pineapple",
        "Ham",
        "Sausage",
        "Olives",
        "Artichoke",
        "Anchovie",
        "Chicken"
        ]


    }
  },
  render: function() {
    var toppings = this.state.toppings.map(topping => <ToppingSwitch toppingName={topping} />);
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          Describe your dream pizza...
        </Text>
        <ScrollView contentContainerStyle={styles.toppingsContainer}>
          {toppings}
        </ScrollView>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    marginTop: 40,
  },
  toppingsScroller: {

  },
  toppingsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

AppRegistry.registerComponent('PlentyOfSlices', () => PlentyOfSlices);
