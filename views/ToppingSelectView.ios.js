'use strict';

let React = require('react-native');
let SelectableButton = require('../components/SelectableButton');
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
    paddingTop: 40,
    paddingBottom: 20
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  actionsContainer: {
    backgroundColor: 'red'
  },
  toppingsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center'
  }
});

class ToppingSelectView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showButton: false,
      toppings: ['Pepperoni',
        'Mushroom',
        'Spinach',
        'Pineapple',
        'Ham',
        'Sausage',
        'Olives',
        'Artichoke',
        'Anchovie',
        'Chicken'
      ],
      selectedToppings: this.props.toppings
    };
  }

  _onSelectionChanged(value, selected) {
    var newSelection = this.state.selectedToppings;

    // If removing, remove
    if (!selected) {
      newSelection = newSelection.filter((arrVal) => {
        return (arrVal != value);
      });
    } else {
      newSelection = newSelection.concat(value);
    }

    this.setState({selectedToppings: newSelection, showButton: newSelection.length > 0});
  }

  nextPressed() {
    this.props.navigator.push({
      component: null,
      title: 'Farts express'
    });
  }

  render() {
    let toppings = this.state.toppings.map((topping, i) => {
        return (<SelectableButton
          key={i}
          innerText={topping}
          onSelectionChanged={this._onSelectionChanged.bind(this)} />);
    });

    var finishedTextComponent;

    if (this.state.showButton) {
      if (this.props.isInModal) {
        finishedTextComponent = <Text onPress={this.props.toppingSelectionFinished}>Done</Text>;
      } else {
        finishedTextComponent = <Text onPress={() => this.nextPressed()}>Next</Text>;
      }
    }
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          Describe your dream pizza...
        </Text>
        <ScrollView contentContainerStyle={styles.toppingsContainer}>
          {toppings}
        </ScrollView>
        <View style={styles.actionsContainer}>
          {finishedTextComponent}
        </View>
      </View>
    );
  }
}
ToppingSelectView.propTypes = {
  isInModal: React.PropTypes.bool,
  toppingSelectionFinished: React.PropTypes.func,
  toppings: React.PropTypes.array
};
ToppingSelectView.defaultProps = {
  isInModal: false,
  toppings: []
};

module.exports = ToppingSelectView;
