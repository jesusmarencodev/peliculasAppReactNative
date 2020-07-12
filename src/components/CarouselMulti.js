import React from 'react'
import { StyleSheet, View, Image, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Text, Title } from 'react-native-paper';
import { BASE_PATH_IMG } from '../utils/constanst';


const { width } = Dimensions.get('window');
const ITEM_WIDTH = Math.round(width * 0.4);

export default function CarouselMulti({navigation, data}) {

    return (
        <Carousel
            layout={'default'}
            data={data}
            renderItem={ (item)=> <RenderItem data={item} navigation={navigation} />}
            sliderWidth={width}
            itemWidth={ITEM_WIDTH}
            firstItem={1} //para que las imagenes aparezcan en la primera posicion
            inactiveSlideScale={1} //para que la imagen del centro tenga la misma escala o todas las imagenes tengan la misma escala
            inactiveSlideOpacity={1} //para que la imagen del centro tenga la misma opacidad o todas tengan la misma opacidad
        />
    )
}

function RenderItem({data, navigation}){
    const { id, title, poster_path } = data.item;
    const imageURL = `${BASE_PATH_IMG}w500/${poster_path}`;

    const onNavigation = () => {
        navigation.navigate('movie', { id })
    }

    return(
        <TouchableWithoutFeedback
            onPress={ onNavigation }
        >
            <View style={ styles.card }>
                <Image
                    style={ styles.image }
                    source={{ uri:imageURL }}
                />
                <Text style={styles.title} numberOfLines={1}>
                    {title}
                </Text>
            </View>

        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    card : {
        shadowColor : '#000',
        shadowOffset : {
            width : 0,
            height : 10,
        },
        shadowOpacity : 1,
        shadowRadius : 10
    },
    image : {
        width : '85%',
        height : 170,
        borderRadius : 20
    },
    title : {
        marginHorizontal : 10,
        marginTop : 10,
        fontSize : 16
    }


})
