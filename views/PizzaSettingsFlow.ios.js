'use strict';

var React = require('react-native');
var ToppingSelectView = require('./ToppingSelectView');
var {
  NavigatorIOS,
} = React;

var PizzaSettingsFlow = React.createClass({
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
    )
  }
});

module.exports = PizzaSettingsFlow;
