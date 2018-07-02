import axios from "axios";

export default {
    getCardData: () => axios.get(`/api/cards/`, {headers: {'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMzk2ODUwNjUzZGI1M2EzODQ4MjU3MCIsImlhdCI6MTUzMDQ4ODkxMn0.obd5tWfNUfA7wXRBaAVQTSjqK552lVXbYowoJ4aXUzQ'}}),
    getNewsData: () => axios.get(`/api/news/`)
}