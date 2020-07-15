import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { map } from 'lodash';
import { Title, Text, Button } from 'react-native-paper';
import { getNewsMoviesApi } from '../api/movies';
import usePreferences from '../hooks/usePreferences';
import { BASE_PATH_IMG } from '../utils/constanst';


const { width } = Dimensions.get('window')

export default function News({navigation}) {

    const [movies, setMovies] = useState(null);
    const [page, setPage] = useState(1);
    const [showbtnMore, setShowBtnMore] = useState(true)
    const { theme } = usePreferences();

    useEffect(()=> {
        getNewsMovies();
    },[page])

    
    
    const getNewsMovies = async () => {
        const resultado = await getNewsMoviesApi(page);
        const total_pages = resultado.total_pages;
        if ( page < total_pages ) {
            if ( !movies ) {
                setMovies(resultado.results)
            }else{
                setMovies([...movies, ...resultado.results])
            }
        }else{
            setShowBtnMore(false);
        }
    }

    return (
        <ScrollView>
            <View style = { styles.container }>
                {
                    map(movies, (movie, index) => (
                        <Movie 
                            key = { index }
                            movie = { movie }
                            theme = { theme }
                            navigation = { navigation }
                        />
                    ))
                }
            </View>
                {showbtnMore && (
                    <Button
                        mode = 'contained'
                        contentStyle = {styles.loadMoreContainer}
                        style = {styles.loadMore}
                        labelStyle = {{color : theme === 'dark' ? '#FFF' :  '#000'}}
                        onPress = {() => setPage( page + 1 )}
                    >
                        Cargar mas ...
                    </Button>
                )

                }

        </ScrollView>
    )
}


function Movie({movie, theme, navigation}) {

    const {id, title, poster_path, } = movie;
    const url = `${BASE_PATH_IMG}w500${poster_path}`;

    const goMovie = () => {
        navigation.navigate('movie', { id })
    }
    
    return(
        <TouchableWithoutFeedback onPress = { goMovie }>
            <View style = { styles.movie }>
                {poster_path ? (
                    <Image
                        style = {styles.image} 
                        source = {{ uri : url }}
                    />
                ):  <Text>{title}</Text>
                }
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
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
    },
    loadMoreContainer : {
        paddingTop : 10,
        paddingBottom : 30
    },
    loadMore : {
        backgroundColor :'transparent'
    }
})
