import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Provider } from "react-redux";
import IndexFile from "./src/components";
import Home from "./src/components/home";
import PhoneAuth from "./src/components/phoneAuth";
import GroupDashboard from "./src/components/groups/groupDashboard";
import MembersList from "./src/components/groups/membersList";
import AdminsList from "./src/components/groups/adminsList";

import store from "./src/store";

export default class App extends Component {
  render() {
    return (

      <Provider store={store}>
        <RootNavigator />
      </Provider>
    )
  }
}
const RootNavigator = createStackNavigator({
  IndexFile: IndexFile,
  Home: Home,
  PhoneAuth: PhoneAuth,
  GroupDashboard:GroupDashboard,
  MembersList:MembersList,
  AdminsList:AdminsList
}, {
    initialRouteName: "IndexFile", headerMode: "none"
  })
  console.disableYellowBox = true;
