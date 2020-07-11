import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import {  DrawerContentScrollView } from '@react-navigation/drawer';
import { Drawer, Switch, TouchableRipple, Text } from 'react-native-paper';
import usePreferences from '../hooks/usePreferences';


export default function DrawerContent({navigation}) {

    const [active, setActive] = useState('home')
    const {theme, toggleTheme} = usePreferences();

    const onchangeScreen = (screen) => {
        setActive(screen)
        navigation.navigate(screen)
    }

    return (
        <DrawerContentScrollView>
            <Drawer.Section>
                <Drawer.Item
                    label='Inicio'
                    active={active === 'home'}
                    onPress={()=>onchangeScreen('home')}
                />
                <Drawer.Item
                    label='Populars Movies'
                    active={active === 'popular'}
                    onPress={()=>onchangeScreen('popular')}
                />
                <Drawer.Item
                    label='News Movies'
                    active={active === 'news'}
                    onPress={()=>onchangeScreen('news')}
                />
            </Drawer.Section>
            <Drawer.Section title='Options'>
                <TouchableRipple>
                    <View style={styles.preferences}>
                        <Text>Theme Dark</Text>
                        <Switch value={theme === 'dark' ? true : false} onValueChange={toggleTheme}/>
                    </View>
                </TouchableRipple>
            </Drawer.Section>
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    preferences : {
        flexDirection: 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        paddingVertical : 12,
        paddingHorizontal : 16
    }
})
