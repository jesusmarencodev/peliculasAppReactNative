import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableWithoutFeedback, Dimensions, Platform, ScrollView } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { size, map } from 'lodash';
import usePreferences from '../hooks/usePreferences';
import { searchMovieApi } from '../api/movies';
import { BASE_PATH_IMG } from '../utils/constanst';

const { width } = Dimensions.get('window');

export default function Search({ navigation }) {
    
    const [movies, setMovies] = useState(null);
    const [search, setSearch] = useState('');
    console.log(movies)

      useEffect(()=> {
        searchMovie();
    },[search]) 

    const searchMovie = async ()=> {
        if( size(search) > 2 ){
            const resultado = await searchMovieApi(search);
            setMovies(resultado.results)
        }
    } 
 


    return (
        <SafeAreaView>
            <Searchbar
                placeholder = 'Buca tu pelicula'
                iconColor = { Platform.OS === 'ois' && 'transparent' }
                icon = 'arrow-left'
                style = {styles.input}
                onChangeText = { (e) => setSearch(e)}
            />
            <ScrollView>
                <View style = { styles.container }>
                    {
                        map(movies, (movie, index) => (
                            <Movie
                                key = { index }
                                movie = { movie }
                                navigation = { navigation }
                            />
                        ))
                    }
                 </View>
            </ScrollView>
        </SafeAreaView>
    )
}


function Movie({ movie, navigation }) {

    const { theme } = usePreferences();

    const { id, poster_path, title } = movie;
    const url = `${BASE_PATH_IMG}w500${poster_path}`;

    const goMovie = () => {
        navigation.navigate('movie', { id });
    }

    return(
        <TouchableWithoutFeedback onPress = { goMovie }>
            <View style = { styles.movie } >
                {
                    poster_path ? (
                        <Image
                            style = { styles.image }
                            source = {{ uri : url }}
                        />
                    ) : <Text
                            style = {{ color :  theme === 'dark' ? '#FFF' : '#000' }}
                        >{ title }</Text>
                }

            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    input : {
        marginTop : -3,
        backgroundColor : '#15212B',
    },
    container : {
        flex : 1,
        flexDirection : 'row',
        flexWrap : 'wrap'
    },
    movie : {
        width : width / 2,
        height : 300,
        justifyContent : 'center',
        alignItems : 'center'
    },
    image : {
        width : '100%',
        height : '100%'
    }

})
