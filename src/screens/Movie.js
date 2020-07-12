import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { getMovieByIdApi } from '../api/movies'

export default function Movie({route}) {
    const [movie, setMovie] = useState(null);
    const { id } = route.params;
    console.log(id)

    useEffect(()=>{
        getMovieById();
    },[])

    const getMovieById = async () => {
        const resultado = await getMovieByIdApi(id);
        console.log(resultado)
        setMovie(resultado)
    }

    return (
        <View>
            <Text>Movie</Text>
        </View>
    )
}

const styles = StyleSheet.create({})
