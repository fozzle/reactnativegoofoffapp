'use strict';

var React = require('react-native');
var PizzaSettingsFlow = require('./views/PizzaSettingsFlow');
var MainTabView = require('./views/MainTabView');

var {
  AppRegistry,
} = React;

var PlentyOfSlices = React.createClass({
  render() {
    // Check if authenticated, if so, bring to main, else move to pizza flow
    var entryPoint = false ? <PizzaSettingsFlow /> : <MainTabView />
    return entryPoint;
  }
});

AppRegistry.registerComponent('PlentyOfSlices', () => PlentyOfSlices);
