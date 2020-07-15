import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { IconButton } from 'react-native-paper';
import Home from '../screens/Home';
import Movie from '../screens/Movie';
import News from '../screens/News';
import Popular from '../screens//Popular';
import Search from '../screens/Search';

const Stack = createStackNavigator();

export default function StackNavigation({navigation}) {
    

    const buttonLeft = (screen) => {
        
        switch(screen) {

            case 'search' :
            case 'movie' :   
                return(
                    <IconButton
                        icon='arrow-left'
                        onPress={()=> navigation.goBack()}
                    />
                );
            default : 
                return(
                    <IconButton
                        icon='menu'
                        onPress={()=> navigation.openDrawer()}
                    />
                )

        }

    }
    const buttonRightSearch = () => {
        return(
            <IconButton
                icon='magnify'
                onPress={()=> navigation.navigate('search')}
            />
        )
    }



    return (
        <Stack.Navigator>
            <Stack.Screen
                name="home"
                component={Home}
                options={
                            { title : 'The MovieApp',
                              headerTitleAlign : 'center' ,
                              headerLeft : () => buttonLeft('home'),
                              headerRight : () => buttonRightSearch(),
                            }
                        }
             />
            <Stack.Screen
                name="movie"
                component={Movie}
                options={
                            { title : '',
                              headerTitleAlign : 'center', 
                              headerTransparent : true,//hace que el stack sea trasnparente
                              headerLeft : () => buttonLeft('movie'),
                              headerRight : () => buttonRightSearch(),
                            } 
                        } 
            />
            <Stack.Screen
                name="news"
                component={News}
                options={
                            { title : 'News movies',
                              headerTitleAlign : 'center',
                              headerLeft : () => buttonLeft('news'),
                              headerRight : () => buttonRightSearch(),
                            } 
                        } 
            />
            <Stack.Screen
                name="popular"
                component={Popular}
                options={
                            { title : 'Populars Movies',
                              headerTitleAlign : 'center', 
                              headerLeft : () => buttonLeft('popular'),
                              headerRight : () => buttonRightSearch(),
                            } 
                        } 
            />
            <Stack.Screen
                name="search"
                component={Search}
                options={
                            { title : '',
                              headerTitleAlign : 'center',
                              headerLeft : () => buttonLeft('search'),
                            } 
                        } 
            />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})
