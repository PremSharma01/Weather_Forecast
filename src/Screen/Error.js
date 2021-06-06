import { inject } from "mobx-react";
import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
@inject("store")
class Error extends Component {
    reload=async()=>{
      this.props.store.error=false;
      this.props.store.loading=true
        this.props.reload()

    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Error</Text>
                <TouchableOpacity style={{backgroundColor:"blue"}} onPress={()=>this.reload()}>
                    <Text style={{padding:10}}>Try again</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
export default Error;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});