import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://api.themoviedb.org/3',
    params: {
        api_key: 'fb5d0109a7938bf0b37215915325ca00',
        language: 'ko-KR'
    }
})

export default instance;