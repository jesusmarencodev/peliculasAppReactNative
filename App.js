import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation/Navigation';

const App = () => {
	return (
		<PaperProvider>
			<NavigationContainer>
				<Navigation/>
			</NavigationContainer>
		</PaperProvider>
	);
};

export default App;

const styles = StyleSheet.create({});
