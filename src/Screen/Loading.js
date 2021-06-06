import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import LottieView from 'lottie-react-native';
export const Loading = () => (
     <LottieView
            autoPlay
            loop
            source={require('../assets/226-splashy-loader.json')}
        />
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});