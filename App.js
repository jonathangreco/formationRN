/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Provider} from "react-redux";
import createStore from "./src/store/index";
import AppNavigation from "./src/navigation/AppNavigation";

const store = createStore();
export default class App extends Component {
  render() {
    return (
      <Provider store={store.store}>
        <AppNavigation/>
      </Provider>
    );
  }
}
