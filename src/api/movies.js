import { API_HOST, API_KEY, LANG } from '../utils/constanst';
import axios from 'axios';

export function getNewsMoviesApi(page = 1) {
	const url = `${API_HOST}movie/now_playing?api_key=${API_KEY}&language=${LANG}&page=${page}`;

	return fetch(url)
		.then((response) => {
			return response.json();
		})
		.then((result) => {
			return result;
		})
		.catch((err) => {
			console.log(err);
		});
}

export const  genereMovieApi = async (idGeneres) => {
	const urlGenre = `${API_HOST}genre/movie/list?api_key=${API_KEY}&language=${LANG}`;
    const resultado = await fetch(urlGenre).then(result => result.json())
    const arrayGenres = [];
    //console.log(resultado.genres)
    idGeneres.forEach((id)=>{
        resultado.genres.forEach((item)=>{
            if(item.id === id) arrayGenres.push(item.name)
        })
    })
    
    return arrayGenres;
}

export const getAllGenresApi = async () => {
	const urlGenresAll = `${API_HOST}genre/movie/list?api_key=${API_KEY}&language=${LANG}`;

	try {
		const resultado = await fetch(urlGenresAll).then(result => result.json());
		return resultado;
	} catch (error) {
		console.log(error)
	}
}

export const getGenreMoviesApi = async (idGenre) => {
	const urlGenresAll = `${API_HOST}discover/movie?api_key=${API_KEY}&with_genres=${idGenre}&language=${LANG}`;

	try {
		const resultado = await fetch(urlGenresAll).then(result => result.json());
		return resultado;
	} catch (error) {
		console.log(error)
	}
}

export const getMovieByIdApi = async (idMovie) => {

	const urlMovieId = `${API_HOST}movie/${idMovie}?api_key=${API_KEY}&language=${LANG}`
 	try {
		const resultado = await fetch(urlMovieId).then(result => result.json());
		return resultado;
	} catch (error) {
		console.log(error)
	} 
}
