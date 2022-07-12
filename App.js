import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import ApplicationRoot from './src/application-root';
import store from './src/redux/store/store';

class App extends Component {
  render() {
    return (
        <NavigationContainer>
            <Provider store={store}>
                <ApplicationRoot />
            </Provider>
        </NavigationContainer>
    );
  }
}

export default App;