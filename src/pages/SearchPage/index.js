import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import instance from '../../api/axios';
import { BASE_URL } from '../../constant';
import { useDebounce } from '../../hooks/useDebounce';
import './SearchPage.css'

const SearchPage = () => {

  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery()
  const searchTerm = query.get('q')
  const debouncedValue = useDebounce(searchTerm, 1000);


  useEffect(() => {
    if (debouncedValue) {
      fetchSearchMovie(debouncedValue)
    }
  }, [debouncedValue])

  const fetchSearchMovie = async (searchTerm) => {
    try {
      const response = await instance.get(
        `/search/multi?include_adult=false&query=${searchTerm}`
      )
      setSearchResults(response.data.results)
    } catch (error) {
      console.log(error)
    }
  }

  if (searchResults.length > 0) {
    return (
      <section className='search-container'>
        {searchResults.map((movie) => {
          if(movie.backdrop_path !== null && movie.media_type !== "person") {

            const movieImgUrl = `${BASE_URL}/w500${movie.backdrop_path}`
            
            return (
              <div key={movie.id} className="movie">
                <div 
                  className="movie__column-poster" 
                  onClick={() => navigate(`/${movie.id}`)}> 
                  {/* detail 페이지로 이동 */}
                  <img 
                    src={movieImgUrl}
                    alt={movie.name}
                    className='movie__poster'
                  />
                </div>
              </div>
            )
          }
        })}
      </section>
    )
  } else {
    return (
      <section className='no-results'>
        <div className='no-results__text'>
          <p>찾고자 하는 검색어 "{searchTerm}"에 맞는 영화 검색 결과가 없습니다.</p>
        </div>
      </section>
    )

  }

}

export default SearchPage
