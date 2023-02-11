import axios from "axios";

export const awsAPI = axios.create({
    baseURL: 'https://03jijq9cw1.execute-api.ap-northeast-2.amazonaws.com/insta/',
}); 