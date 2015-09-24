'use strict';

var React = require('react-native');
var ToppingSelector = require('./ToppingSelector');
var {
  AppRegistry,
  StyleSheet,
  ScrollView,
  NavigatorIOS,
  Text,
  View,
} = React;

var PlentyOfSlices = React.createClass({
  render() {
    return (
      <NavigatorIOS
        style={{
          flex: 1
        }}
        navigationBarHidden={true}
        initialRoute={{
          component: ToppingSelectView,
          title: 'Pizzzzza'
        }} />
    )
  }
});

var ToppingSelectView = React.createClass({
  getInitialState() {
    return {
      showButton: false
    }
  },
  selectionChanged(selectedToppings) {
    this.setState({showButton: selectedToppings.length > 0});
  },
  render() {
    var nextTextComponent = this.state.showButton ? <Text>Next</Text> : null;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          Describe your dream pizza...
        </Text>
        <ToppingSelector onSelectionChanged={this.selectionChanged}></ToppingSelector>
        <View style={styles.actionsContainer}>
          {nextTextComponent}
        </View>
      </View>
    )
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    marginTop: 40,
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  actionsContainer: {
    backgroundColor: 'red'
  }
});

AppRegistry.registerComponent('PlentyOfSlices', () => PlentyOfSlices);
