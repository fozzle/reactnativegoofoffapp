'use strict';

let React = require('react-native');
let ToppingSelector = require('../components/ToppingSelector');
let {
  AppRegistry,
  StyleSheet,
  ScrollView,
  NavigatorIOS,
  Text,
  View,
  Component
} = React;

let styles = StyleSheet.create({
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

class ToppingSelectView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showButton: false
    };
  }

  selectionChanged(selectedToppings) {
    this.setState({showButton: selectedToppings.length > 0});
  }

  nextPressed() {
    this.props.navigator.push({
      component: null,
      title: 'Farts express'
    });
  }

  render() {
    var nextTextComponent = this.state.showButton ? <Text onPress={() => this.nextPressed()}>Next</Text> : null;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          Describe your dream pizza...
        </Text>
        <ToppingSelector onSelectionChanged={this.selectionChanged.bind(this)}></ToppingSelector>
        <View style={styles.actionsContainer}>
          {nextTextComponent}
        </View>
      </View>
    );
  }
}

module.exports = ToppingSelectView;
