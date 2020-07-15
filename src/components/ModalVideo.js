import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View , Platform} from 'react-native';
import { Modal, IconButton, Title } from 'react-native-paper';
import YouTube from 'react-native-youtube';
import { WebView } from 'react-native-webview';
import { getVideoMovieApi } from '../api/movies';

export default function ModalVideo(props) {
    const  { show, setShow, idMovie } = props; 

    const [video, setVideo] = useState(null);
    console.log(video)

    useEffect(()=> {
        getVodeoYoutube();
    },[]);


    const getVodeoYoutube = async () => {
        const resultado = await getVideoMovieApi(idMovie);
        console.log(resultado)
        let idVideo = null;
        resultado.forEach(video => {
            if(video.site === 'YouTube' && !idVideo){
                idVideo = video.key;
            }
        });
        setVideo(idVideo);
    }

    if(!video) return null
    
    return (
        <Modal
            visible={show}
            contentContainerStyle={styles.modal}
        >
            {Platform.OS === 'ios' ? (
                <YouTube
                    videoId = { video }
                    style =  { styles.video }
                />
            ):
                <WebView 
                    style = {{ width : 500 }}
                    source = {{ uri: `https://www.youtube.com/embed/${video}?controls=0&showinfo=0` }} 
                />
            }
            <IconButton
                icon='close'
                onPress={()=>setShow(false)}
                style={styles.close}
            />
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal : {
        backgroundColor : '#000',
        height : '120%',
        alignItems : 'center'
    },
    close : {
        backgroundColor : '#1ea1f2',
        width : 50,
        height : 50,
        borderRadius :100,
        position :'absolute',
        bottom : 100
    },
    video : {
        alignSelf : 'stretch',
        height : 300
    }
})
