import api from './api';

export default {
    listar:() => {
        return api.get('transactions')
    },
    salvar:(transaction) => {
        return api.post('transactions', transaction )
    }
}