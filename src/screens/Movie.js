import React, {useState, useEffect} from 'react'
import { StyleSheet,  View, ScrollView, Image } from 'react-native'
import { map } from 'lodash';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { IconButton, Text, Title } from 'react-native-paper';
import { getMovieByIdApi } from '../api/movies'
import { BASE_PATH_IMG } from '../utils/constanst';
import ModalVideo from '../components/ModalVideo';
import usePreferences from '../hooks/usePreferences';
import starDark from '../assets/png/starDark.png';
import starLight from '../assets/png/starLight.png';




export default function Movie({route}) {
    const [movie, setMovie] = useState(null);
    const [showVideo, setShowVideo] = useState(false)
    const { id } = route.params;
  

    useEffect(()=>{
        getMovieById();
    },[])

    
    //Consulta la movie
    const getMovieById = async () => {
        const resultado = await getMovieByIdApi(id);
        setMovie(resultado)
    }


    //si la movie no ha cargado muestra null
    if(!movie) return null;

    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false}>
                <MovieEmage posterPath = {movie.poster_path} />
                <MovieTrailer setShowVideo = { setShowVideo } />
                <MovieTitle
                    movie={movie}
                />
                <MovieRating
                    vote_count = { movie.vote_count }
                    vote_average = { movie.vote_average }
                />
                <Text style={styles.overview}>
                    {movie.overview}
                </Text>
                <Text style={[styles.overview, {marginBottom : 50}]}>
                    Fecha de lanzamiento: {movie.release_date}
                </Text>
            </ScrollView>
            <ModalVideo
                show = { showVideo }
                setShow = { setShowVideo }
                idMovie = { id }
            />
        </>
    )
}


function MovieEmage(props){
    const { posterPath } = props;

    return (
        <View style={styles.viewPoster}>
            <Image
                style={styles.poster}
                source={{ uri : `${BASE_PATH_IMG}w500/${posterPath}` }}
            />
        </View>
    )
}

function MovieTrailer(props){
    const { setShowVideo } = props;

    return(
        <View style = { styles.viewPlay }>
            <IconButton
                icon = 'play'
                color = '#000'
                size = { 30 }
                style = { styles.play }
                onPress = { ()=> setShowVideo(true) }
            />
        </View>
    )
}

function MovieTitle({movie}) {
    console.log(movie)
    return (
        <View style={styles.viewInfo}>
            <Title numberOfLines={1}>{movie.title}</Title>
            <View style={styles.viewGenres}>
                {map(movie.genres, (genre)=> (
                    <Text style={styles.genre} key={genre.id}>
                        { genre.name }
                    </Text>
                ))
                }
            </View>
        </View>
    )
}

function MovieRating({vote_count, vote_average}){
    const  media = vote_average / 2;
    console.log(media)
    const { theme } = usePreferences();


    return (
        <View style = { styles.viewRating }>
            <Rating
                type='custom'
                ratingImage = { theme === 'dark' ? starDark : starLight}
                ratingColor = '#ffc205'
                ratingBackgroundColor = { theme === 'dark' ? '#192734' : '#F0F0F0'}
                startingValue = { media }
                imageSize = { 20 }
                style = {{ marginRight : 15 }}
            />
            <Text style = {{ fontSize : 16, marginRight : 5 }}>{media}</Text>
            <Text style = {{ fontSize : 12, color : '#8697a5' }}>{vote_count} votos</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    viewPoster : {
        shadowColor : '#000',
        shadowOffset : {
            width : 0,
            height : 10
        },
        shadowOpacity : 1,
        shadowRadius : 10
    },
    poster : {
        width :'100%',
        height : 500,
        borderBottomLeftRadius : 30,
        borderBottomRightRadius : 30
    },
    viewPlay : {
        justifyContent : 'flex-end',
        alignItems : 'flex-end',

    },
    play : {
        backgroundColor : '#fff',
        marginTop : -30,
        marginRight : 30,
        width : 60,
        height : 60,
        borderRadius : 100,
    },
    viewInfo : {
        marginHorizontal : 30,
        
    },
    viewGenres : {
        flexDirection : 'row',
    },
    genre : {
        marginRight : 10,
        color : '#8697a5',
    },
    viewRating : {
        marginHorizontal : 30,
        marginTop : 10,
        flexDirection : 'row',
        alignItems : 'center',
    },
    overview : {
        marginHorizontal : 30,
        marginTop : 20,
        textAlign : 'justify',
        color : '#8697a5'
    }
})
