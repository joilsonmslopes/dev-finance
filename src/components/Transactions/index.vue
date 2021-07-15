<template>
    <section>
        <h2 class="sr-only">Balanço</h2>
        <div id="balance">
            <div class="card">
                <div class="title">
                    <h1>Entradas</h1>
                    <img :src="incomesImg" alt="Entradas">
                </div>
                <h2>
                    R$ 17.400,00
                </h2>
            </div>
            <div class="card">
                <div class="title">
                    <h1>Saídas</h1>
                    <img :src="expenseImg" alt="Saídas">
                </div>
                <h2>
                    R$ 1.259,00
                </h2>
            </div>
            <div class="card">
                <div class="title">
                    <h1>Total</h1>
                    <img :src="totalImg" alt="Total">
                </div>
                <h2>
                    R$ 16.141,00
                </h2>
            </div>
        </div>

        <div id="newTransaction">
            <button @click="openModal" class="btn">Adicionar Transação <img :src="newTransaction" alt="Nova Transação"></button>
        </div>

        <div id="allTransactions">
            <h2 class="sr-only">Transações</h2>
            <table id="data-table">
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Valor</th>
                        <th>Data</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="transaction in transactions" :key="transaction.id">
                        <td class="description">{{ transaction.description }}</td>
                        <td :class="isIncome(transaction.amount)">R$ {{ transaction.amount }}</td>
                        <td class="date">{{ transaction.date }}</td>
                        <td>
                            <img :src="removeImg" alt="Remover Transação">
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>

        <section id="modalOverlay" :class="{activeModal}" @click="closeModal">
            <div class="modal">
                <h2>Nova Trasação</h2>
                <form action="">
                    <div class="input-group">
                        <label for="description" class="sr-only">Descrição</label>
                        <input type="text" name="description" id="description" placeholder="Descrição">
                    </div>
                    <div class="input-group">
                        <label for="amount" class="sr-only">Descrição</label>
                        <input type="text" name="amount" id="amount" placeholder="0,00">
                        <small>Use o sinal - (negativo) para despesas e , (vírgula) para casas decimais</small>
                    </div>
                    <div class="input-group">
                        <label for="date" class="sr-only">Descrição</label>
                        <input type="text" name="date" id="date" placeholder="dd/mm/yyyy">
                    </div>
                    <div class="button-group">
                        <button type="button" :class="['cancel', {activeModal: closeModal}]">Cancelar</button>
                        <button class="btn" type="submit">Salvar</button>
                    </div>
                </form>
            </div>
        </section>
    </section>
</template>

<script>
import incomesImg from '../../assets/images/incomes.svg';
import expenseImg from '../../assets/images/expense.svg';
import totalImg from '../../assets/images/total.svg';
import newTransaction from '../../assets/images/plus.svg';
import removeImg from '../../assets/images/minus-circle.svg';

import api from '../../services/api.js';

export default {
    name: 'Transactions',
    data() {
        return {
            incomesImg,
            expenseImg,
            totalImg,
            newTransaction,
            removeImg,
            activeModal: false,
            transactions: [],
            transactionType: 'income'
        }
    },
    mounted() {
        api.get('/transactions').then( response => {
            this.transactions = response.data;
        })
    },
    methods: {
        openModal() {
        this.activeModal = true
        },
        closeModal() {
            this.activeModal = false
        },
        isIncome(value) {
            return value < 0 ? value = 'expense' : 'income';
        }
    }
}
</script>

<style src="./style.scss" lang="scss" scoped />