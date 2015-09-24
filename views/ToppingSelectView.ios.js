var React = require('react-native');
var ToppingSelector = require('../components/ToppingSelector');
var {
  AppRegistry,
  StyleSheet,
  ScrollView,
  NavigatorIOS,
  Text,
  View,
} = React;

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

var ToppingSelectView = React.createClass({
  getInitialState() {
    return {
      showButton: false
    }
  },
  selectionChanged(selectedToppings) {
    this.setState({showButton: selectedToppings.length > 0});
  },
  nextPressed() {
    this.props.navigator.push({
      component: View2,
      title: 'Farts express'
    });
  },
  render() {
    var nextTextComponent = this.state.showButton ? <Text onPress={this.nextPressed}>Next</Text> : null;
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

module.exports = ToppingSelectView
