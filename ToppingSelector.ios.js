var React = require('react-native');
var SelectableButton = require('./SelectableButton');
var {
  StyleSheet,
  ScrollView,
} = React;

var ToppingSelector = React.createClass({
  getInitialState() {
    return {
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
      ],
      selectedToppings: []
    }
  },
  onSelectionChanged(value, selected) {
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
    console.log("Selected toppings " + newSelection);
    if (this.props.onSelectionChanged) this.props.onSelectionChanged(newSelection)
  },
  render() {
    var toppings = this.state.toppings.map((topping, i) => {
        return (<SelectableButton
          key={i}
          innerText={topping}
          onSelectionChanged={this.onSelectionChanged} />)
    });
    return (
        <ScrollView contentContainerStyle={styles.toppingsContainer}>
          {toppings}
        </ScrollView>
    )
  }
});

var styles = {
  toppingsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
}

module.exports = ToppingSelector
