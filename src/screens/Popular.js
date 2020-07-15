import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Image, TouchableWithoutFeedback } from 'react-native';
import { getPopularMoviesApi } from '../api/movies';
import { Title, Text, Button } from 'react-native-paper';
import { map } from 'lodash';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { BASE_PATH_IMG } from '../utils/constanst';
import usePreferences from '../hooks/usePreferences';
import starDark from '../assets/png/starDark.png';
import starLight from '../assets/png/starLight.png';
import noImage from '../assets/png/default-imgage.png';

export default function Popular({ navigation }) {

    const [movies, setMovies] = useState(null);
    const [showBtnMore, setShowBtnMore] = useState(true);
    const [page, setPage] = useState(1)

    const { theme } = usePreferences();

    useEffect(() => {
        getMoviePopulars()
    },[page])

    const getMoviePopulars = async () => {
        const resultado = await getPopularMoviesApi(page)
        const total_page = resultado.total_pages;
     
        if ( page < total_page ) {
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
            {
                map(movies, (movie, index) => (
                    <Movie 
                        key = {index}
                        movie = { movie }
                        theme = { theme }
                        navigation = { navigation }
                    />
                ))
            }
            {
                showBtnMore && ( <Button
                                    mode = 'contained'
                                    contentStyle = { styles.loadModeContained }  
                                    style = { styles.loadMode }
                                    labelStyle = {{ color : theme === 'dark' ? '#FFF' : '#000' }}
                                    onPress = { ()=> setPage(page + 1)}
                                 >Cargar mas ...</Button>)
            }
        </ScrollView>
    )
}

function Movie({movie, theme, navigation}) {
    const { id, poster_path, title, release_date, vote_count, vote_average } = movie;
    const url = `${BASE_PATH_IMG}w500${poster_path}`;

    const goMovie = () => {
        navigation.navigate('movie', { id });
    }
    
        return (
            <TouchableWithoutFeedback onPress = {goMovie}> 
                <View style={styles.movie}>
                    <View style={styles.left}>
                        <Image 
                            style = {styles.image}
                            source = {
                                poster_path
                                    ? {uri : url}
                                    : noImage
                            }
                        /> 
                    </View>
                    <View style={styles.right}>
                        <Title>{title}</Title>  
                        <Text>{release_date}</Text>
                        <MovieRating
                            theme = { theme }
                            vote_count = { vote_count }
                            vote_average = { vote_average }
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
    )
}

function MovieRating({ theme, vote_count, vote_average }){

    const media = vote_average / 2;

    return(
        <View style={styles.viewRating}>
            <Rating
                type='custom'
                ratingImage = { 
                    theme === 'dark' 
                            ? starDark
                            : starLight        
                }
                ratingColor = '#ddc205'
                ratingBackgroundColor = {
                    theme === 'dark'
                            ? '#192734'
                            : '#F0F0F0'
                }
                startingValue = { media }
                imageSize = {20}
                style = {{ marginRight : 25 }}
            />
            <Text style = {{ fontSize : 12, color : '#8697a5', marginTop : 5}}>
                {vote_count} votos
            </Text>
        </View>
    )
}


const styles = StyleSheet.create({
    movie : {
        marginBottom : 20,
        flexDirection : 'row',
        alignItems : 'center',
    },
    left : {
        marginRight : 20,
        marginLeft :10,
    },
    right : {

    },
    image : {
        width : 100,
        height : 150,
    },
    viewRating : {
        alignItems : 'flex-start',
        justifyContent : 'flex-start',
        marginTop : 10
    },
    loadModeContained : {
        paddingTop : 10,
        paddingBottom : 30
    },
    loadMode : {
        backgroundColor : 'transparent'
    },



})
