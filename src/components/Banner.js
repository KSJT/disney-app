import React, { useEffect, useState } from 'react'
import requests from '../api/requests'
import axios from '../api/axios'
import './Banner.css'
import {truncate} from '../utils/truncate'
import styled from 'styled-components'

const Banner = () => {

  const [movie, setMovie] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => { 
    const response = await axios.get(requests.fetchNowPlaying)

    const movieId = response.data.results[
      Math.floor(Math.random() * response.data.results.length)
    ].id;

    const {data: movieDetail} = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: 'videos'}
    });

    setMovie(movieDetail);
  }


  if(!movie) {
    return (
      <div>loading...</div>
    )
  }

  if(isClicked) {
    return (
      <>
        <Container>
          <HomeContainer>
            <Iframe 
              width="640" height="360"
              src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1`}
              frameBorder="0"
              allow="autoplay; fullscreen"
              >
              <div>video</div>
            </Iframe>
          </HomeContainer>
          <button 
          onClick={() => setIsClicked(false)}
          className='close-btn'>X</button>
        </Container>
        
      </>
    )
  } else {
    return (
      <header 
        className='banner'
        style={{ 
          background: `url("https://images.tmdb.org/t/p/original${movie.backdrop_path}")`,
          backgroundPosition: 'top center',
          backgroundSize: 'cover'
        }}
      >
        <div className='banner__contents'>
          <h1 className='banner__title'>
            {movie.title || movie.name || movie.original_name}
          </h1>

          <div className='banner__buttons'>
            {movie?.videos?.results[0]?.key && <button 
              className='banner__button'
              onClick={() => setIsClicked(true)}
              >
                Play</button>}
          </div>

          <p className='banner__description'>
            {truncate(movie.overview, 130)}
          </p>
        </div>
        <div className='banner__fadeBottom' />
      </header>
    );
  }}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;
  
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`


export default Banner;