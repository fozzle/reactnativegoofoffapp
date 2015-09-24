'use strict';

let React = require('react-native');
let PizzaSettingsFlow = require('./views/PizzaSettingsFlow');
let MainTabView = require('./views/MainTabView');

let {
  AppRegistry,
} = React;

var PlentyOfSlices = React.createClass({
  render() {
    // Check if authenticated, if so, bring to main, else move to pizza flow
    let entryPoint = false ? <PizzaSettingsFlow /> : <MainTabView />;
    return entryPoint;
  }
});

AppRegistry.registerComponent('PlentyOfSlices', () => PlentyOfSlices);
