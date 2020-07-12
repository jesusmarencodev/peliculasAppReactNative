import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { getNewsMoviesApi, getAllGenresApi, getGenreMoviesApi } from '../api/movies';
import { Title, Text } from 'react-native-paper';
import { map } from 'lodash';
import CarouselVertical from '../components/CarouselVertical';
import usePreferences from '../hooks/usePreferences';
import CarouselMulti from '../components/CarouselMulti';

export default function Home({navigation}) {
    const {theme} = usePreferences();

    const [newMovies, setNewMovies] = useState(null);
    const [genresList, setGenresList] = useState([]);
    const [genreSelected, setGenreSelected] = useState(28);
    const [genresMovies, setGenresMovies] = useState(null);
    useEffect(()=>{
        obtenerNuevasPeliculas();
    },[]);

    useEffect(()=>{
        obtenerGeneros();
    },[]);

    useEffect(()=>{
        peliculasPorGenero();
    },[genreSelected]);

    //Obteniendo nuevas peliculas
    const obtenerNuevasPeliculas = async () => {
        const data = await getNewsMoviesApi();
        setNewMovies(data.results)
    }

    //Obteniendo Generos
    const obtenerGeneros = async () => {
       const genresAPI = await getAllGenresApi();
       setGenresList(genresAPI.genres); 
    }

    //Seleccionando Genero
    const onchangeGenre = (idGenre) => {
        setGenreSelected(idGenre)
    }
    //Obteniendo peliculas por genero
    const peliculasPorGenero = async () => {
        const moviesGender = await getGenreMoviesApi(genreSelected);
        setGenresMovies(moviesGender.results)
    }

    

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {newMovies && (
                <View style={styles.news}>
                    <Title style={styles.newsTitle}>Nuevas Peliculas</Title>
                    <CarouselVertical  data={newMovies} navigation={navigation}/>
                </View>
            )}
            <View style={styles.genres}>
                <Title style={styles.genresTitle}>Peliculas por genero</Title>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.genreList}
                >
                    {map(genresList, (genre) => (
                        <Text 
                            key={genre.id}
                            style={[styles.genre, {color : genre.id !== genreSelected ? '#8697a5' : '#fff'}]}
                            onPress={()=> onchangeGenre(genre.id)}
                        >
                            {genre.name}
                        </Text>
                    ))}
                </ScrollView>
                {
                    genresMovies && (
                        <CarouselMulti
                            data={genresMovies}
                            navigation={navigation}
                        />
                    )
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    news : {
        marginTop : 10,
        marginBottom:  0,
        paddingBottom : 0,
    },
    newsTitle : {
        marginHorizontal : 20,
        fontWeight : 'bold',
        fontSize : 22,
        textAlign : 'center',
        marginBottom : 20
    },
    genres : {
        marginBottom : 10,
    },
    genresTitle : {
        marginTop : 30,
        marginHorizontal : 20,
        fontWeight : 'bold',
        fontSize : 22,
        textAlign : 'center'
    },
    genreList : {
        marginTop : 5,
        marginBottom : 15,
        paddingHorizontal : 20,
        padding : 10,
    },
    genre : {
        marginRight : 20,
        fontSize :16
    },

})
