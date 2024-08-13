import axios from 'axios'
const $host = axios.create({
    baseURL: 'https://chat-with-auto-response.onrender.com/'
})

export {
    $host
}
