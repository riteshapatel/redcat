/**
 * axios configuration
 * @author ritesh.patel
 */
import axios from 'axios';

export default () => {
    return axios.create({
        baseUrl: `http://localhost:8001`,
        withCredentials: false,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}