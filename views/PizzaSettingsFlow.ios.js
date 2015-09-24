'use strict';

let React = require('react-native');
let ToppingSelectView = require('./ToppingSelectView');
let {
  NavigatorIOS,
  Component
} = React;

class PizzaSettingsFlow extends Component {
  render() {
    return (
      <NavigatorIOS
        style={{
          flex: 1
        }}
        navigationBarHidden={true}
        initialRoute={{
          component: ToppingSelectView,
          title: 'Pizzzzza',
          passProps: {
            navigationBarHidden: this.props.navigationBarHidden
          }
        }}
        />
    );
  }
}

module.exports = PizzaSettingsFlow;
