import axios from "axios";

export default {
    getCardData: () => axios.get(`/api/cards/`, 
    {headers: {'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViM2E3MDZjMjlhMGU3NDlhYTczNTBhYSIsImlhdCI6MTUzMDU1NjUyNX0.pXbvjFMvMWYCqJsIW-5hnfJbl5BfHsZes_gUdaoeC9Q"}}
),
    getNewsData: () => axios.get(`/api/news/`)
}