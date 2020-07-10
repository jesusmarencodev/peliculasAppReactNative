import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../utils/screens/Home';
import Movie from '../utils/screens/Movie';
import News from '../utils/screens/News';
import Popular from '../utils/screens/Search';
import Search from '../utils/screens/Search';

const Stack = createStackNavigator();

export default function StackNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="home" component={Home} options={{title : 'The MovieApp'}} />
            <Stack.Screen name="movie" component={Movie}  options={{title : ''}} />
            <Stack.Screen name="news" component={News} options={{title : 'News movies'}}  />
            <Stack.Screen name="popular" component={Popular}  options={{title : 'Populars Movies'}} />
            <Stack.Screen name="search" component={Search}  options={{title : ''}} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})
