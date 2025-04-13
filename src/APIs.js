import axios from "axios"
import noti from './common/noti'



let token
function checkToken() {
    token = localStorage.getItem('token')
    return token
}
checkToken()
const instance = axios.create({
    baseURL: 'https://localhost:5001',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
    },
})

instance.interceptors.request.use(
    (config) => {
        checkToken()
        config.headers['Authorization'] = 'Bearer ' + token
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('user')
            noti.error('Phiên đăng nhập đã hết hạn')
            window.location.href = '/'
        }
        return Promise.reject(error)
    }
)

export default class APIs {
    // auth
    static login(data) {
        return instance.post('/api/user/login', data) // login chưa cần Bearer
    }

    static getProductByCategory(id) {
        return instance.get(`/api/product/getByCategory?categoryId=${id}`) 
    }

    static createMomoPayment(data) {
        return instance.post('/api/payment/create', data)
    }

}