import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import { Provider } from "mobx-react";
import Main from "./src/Screen/Main";
import Data from "./src/Fn/fn";

const store=window.store=new Data

class App extends Component {
 
    render() {
        return (
            <Provider store={store}>
            <Main/>
            </Provider>
        );
    }
}
export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});