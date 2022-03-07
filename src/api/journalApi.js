import axios from 'axios';


const journalApi = axios.create({
    baseURL: 'https://vue-demos-ee617-default-rtdb.firebaseio.com'
});

export default journalApi;