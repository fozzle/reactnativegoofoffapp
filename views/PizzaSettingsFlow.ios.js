'use strict';

let React = require('react-native');
let ToppingSelectView = require('./ToppingSelectView');
let ParseReact = require('parse-react');
let ParseComponent = ParseReact.Component(React);
let {
  NavigatorIOS,
  Component
} = React;

class PizzaSettingsFlow extends ParseComponent {

  observe(props, state) {

  }
  
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
