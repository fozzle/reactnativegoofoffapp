'use strict';

let React = require('react-native');
let SelectableButton = require('./SelectableButton');
let {
  StyleSheet,
  ScrollView,
  Component
} = React;

let styles = {
  toppingsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
};

class ToppingSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      selectedToppings: []
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

    this.setState({selectedToppings: newSelection});
    if (this.props.onSelectionChanged) this.props.onSelectionChanged(newSelection);
  }

  render() {
    let toppings = this.state.toppings.map((topping, i) => {
        return (<SelectableButton
          key={i}
          innerText={topping}
          onSelectionChanged={() => this._onSelectionChanged()} />);
    });
    return (
        <ScrollView contentContainerStyle={styles.toppingsContainer}>
          {toppings}
        </ScrollView>
    );
  }
}

module.exports = ToppingSelector;
