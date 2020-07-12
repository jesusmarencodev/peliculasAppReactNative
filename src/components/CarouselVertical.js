import React, { useState, useEffect} from 'react';
import { StyleSheet, View, Image, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Text, Title } from 'react-native-paper';
import { BASE_PATH_IMG } from '../utils/constanst';
import { genereMovieApi } from '../api/movies';
import { map, size } from 'lodash';


const { width } = Dimensions.get('window');
const ITEM_WIDTH = Math.round(width * 0.7);

export default function CarouselVertical(props) {
    const { data, navigation } = props;
    return (
        <Carousel
            layout={'default'}
            data={data}
            renderItem={(item)=><RenderItem {...item} navigation={navigation}  />}
            sliderWidth={width}
            itemWidth={ITEM_WIDTH}
        />
    )
}




function RenderItem({item, navigation}){
    const  { title, poster_path, genre_ids, id } = item;
    const imageURL = `${BASE_PATH_IMG}w500/${poster_path}`;
    const [genresData, setGenresData] = useState(null);

     useEffect(()=>{
        getGenero(genre_ids);
    },[])

    const getGenero = async () => {
       const dataGenres = await genereMovieApi(genre_ids);
       setGenresData(dataGenres);  
    } 

    const onNavigation = () => {
        navigation.navigate('movie', { id });
    }
    
    return(
        <TouchableWithoutFeedback  onPress={onNavigation}>
            <View style={styles.card}>
               <Image style={styles.image} source={{uri : imageURL}} />
                <Title style={styles.title} numberOfLines={1}>{title}</Title>
                <View style={styles.genres}>
                    {genresData && (
                        map(genresData, (genreItem, index) =>(
                            <Text key={index} style={styles.genre} numberOfLines={1}>
                                {genreItem}
                                {index !== size(genresData) -1 && ', '}{/* esto lo que hace es comparar el index con size que es el tamaño maximo del array */}
                            </Text>
                        ))
                    )}
                </View> 
            </View>
        </TouchableWithoutFeedback>
    )
}



const styles = StyleSheet.create({
    card : {
        shadowColor : '#000',
        shadowOffset : {
            width :0,
            height : 10,
        },
        shadowOpacity : 1,
        shadowRadius : 10,
    },
    image : {
        width : '100%',
        height : 300,
        borderRadius : 20,
    },
    title : {
        marginHorizontal : 10,
        marginTop : 10,
    },
    genres : {
        flexDirection : 'row',
        marginHorizontal : 10,
    },
    genre : {
        fontSize : 12,
        color : '#8997a5',
    },
})
