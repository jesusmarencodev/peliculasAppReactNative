import React, { useState, useMemo } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { Provider as PaperProvider, DarkTheme as DarkThemePaper, DefaultTheme as DefaultThemePaper } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { 
			NavigationContainer,
			DarkTheme as DarkThemeNative,
			DefaultTheme as DefaultThemeNative
	    } from '@react-navigation/native';
import Navigation from './src/navigation/Navigation';
import PreferencesContext from './src/context/PreferencesContext';

const App = () => {

	const [theme, setTheme] = useState('light')

	DefaultThemePaper.colors.primary = '#1ae1f2';
	DarkThemePaper.colors.primary = '#1ae1f2';
	DarkThemePaper.colors.accent ='#1ae1f2';

	DarkThemeNative.colors.background = '#192734';
	DarkThemeNative.colors.card = '#15212b';

	const toggleTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	}

	const preference = useMemo(
		 () => ({
			toggleTheme,
			theme 
		 }),
		 [theme]//estas propiedades solo cambiaran si theme sufre cambios
	);

	return (
		<PreferencesContext.Provider value={preference}>
			<PaperProvider	theme={theme ==='dark' ? DarkThemePaper : DefaultThemePaper} >
				<StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}/>
				<NavigationContainer theme={theme === 'dark' ? DarkThemeNative : DefaultThemeNative} >
					<Navigation/>
				</NavigationContainer>
			</PaperProvider>
		</PreferencesContext.Provider>
	);
};

export default App;

const styles = StyleSheet.create({});
