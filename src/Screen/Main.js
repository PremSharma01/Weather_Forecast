import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Platform,
    PermissionsAndroid,
    ScrollView
} from "react-native";
import { inject, observer } from "mobx-react";
import {Loading} from "./Loading";
import Error from "./Error";
// import { mydata } from "../Fn/fn";
import Geolocation from '@react-native-community/geolocation';
@inject("store")
@observer
class Main extends Component {
    async  componentDidMount() {
     this.requestLocationPermission()
      }
      requestLocationPermission = async () => {
        if (Platform.OS === 'ios') {
          this.getOneTimeLocation();
        } else {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                title: 'Location Access Required',
                message: 'This App needs to Access your location',
              },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              //To Check, If Permission is granted
              this.getOneTimeLocation();
            } else {
                alert("Oops!! seems like you denie the permissions")
                
         this.props.store.error=true
         this.props.store.loading=false
            }
          } catch (err) {
            console.warn(err);
          }
        }
      }
  
    getOneTimeLocation = async() => {
        console.log('here');
      Geolocation.getCurrentPosition(
       async (position) => {
          const currentLongitude = 
            JSON.stringify(position.coords.longitude);
          const currentLatitude = 
            JSON.stringify(position.coords.latitude);
            console.log({currentLatitude,currentLongitude,position});
            await  this.props.store.fatch(currentLatitude,currentLongitude)
        },
        (error) => {
         this.props.store.error=true
         this.props.store.loading=false
            console.log(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 1000
        },
      );
    }
    reload=async()=>{
        console.log('here');
        this.requestLocationPermission()
    }
    render() {
      const  {response,error,loading}=this.props.store
      console.log( {response,error});
      if(loading){
          return <Loading/>
      }else if(error){
        return <Error reload={this.reload.bind(this)} />
      }else{
           return (
            <View style={styles.container}>
                <Text>Main</Text>
                <ScrollView>
                {response.map((item,index)=>{

                    return(
                        <>
<View style={{height:2,backgroundColor:"#fed444" ,width:"100%"}}/>

            <Text key={index}> dt:{ item.dt_txt}</Text >
            <Text>temp:{ item.main.temp}</Text>
            {item.weather.map((item,index)=>{
                return(
                    <>
            <Text>weather main:{ item.main}</Text>
            <Text>weather des:{ item.description}</Text>

</>
                )
            })}
            <Text>speed{ item.wind.speed}</Text>
            <Text> visibility{ item.visibility}</Text>
<View style={{height:2,backgroundColor:"#fed444",width:"100%"}}/>

</>
                    )
                })}
                </ScrollView>
               
            <Text>{response.length}</Text>
            </View>
        );
      }
       
    }
}
export default Main;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});