import axios from "axios";

export default {
    getCardData: () => axios.get(`/api/cards/`)
}