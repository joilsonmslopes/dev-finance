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
                    {{ totalIncome }}
                </h2>
            </div>
            <div class="card">
                <div class="title">
                    <h1>Saídas</h1>
                    <img :src="expenseImg" alt="Saídas">
                </div>
                <h2>
                    {{ totalExpense }}
                </h2>
            </div>
            <div class="card">
                <div class="title">
                    <h1>Total</h1>
                    <img :src="totalImg" alt="Total">
                </div>
                <h2>
                    {{ totalBalance }}
                </h2>
            </div>
        </div>

        <div id="newTransaction">
            <button @click="openModal" class="btn">Adicionar Transação <img :src="newTransactionBtn" alt="Nova Transação"></button>
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
                            <img :src="removeImg" alt="Remover Transação" @click="deleteTransaction(transaction, transaction.id)">
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>

        <section id="modalOverlay" :class="{activeModal}" >
            <div class="modal">
                <h2>Nova Trasação</h2>
                <form @submit.prevent="saveTransaction">
                    <div class="input-group">
                        <label for="description" class="sr-only">Descrição</label>
                        <input type="text" name="description" id="description" placeholder="Descrição" v-model="addTransaction.description">
                    </div>
                    <div class="input-group">
                        <label for="amount" class="sr-only">Valor</label>
                        <input type="text" name="amount" id="amount" placeholder="0,00" v-model="addTransaction.amount">
                        <small>Use o sinal - (negativo) para despesas e , (vírgula) para casas decimais</small>
                    </div>
                    <div class="input-group">
                        <label for="date" class="sr-only">Data</label>
                        <input type="text" name="date" id="date" placeholder="dd/mm/yyyy" v-model="addTransaction.date">
                    </div>
                    <div class="button-group">
                        <button type="button" class="cancel" @click="closeModal">Cancelar</button>
                        <button class="btn" type="submit" @click="closeModal">Salvar</button>
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
import newTransactionBtn from '../../assets/images/plus.svg';
import removeImg from '../../assets/images/minus-circle.svg';

import TransactionApi from '../../services/transactions';
import Api from '../../services/api';

export default {
    name: 'Transactions',
    data() {
        return {
            incomesImg,
            expenseImg,
            totalImg,
            newTransactionBtn,
            removeImg,
            activeModal: false,
            transactions: [],
            addTransaction: {
                description: '',
                amount: '',
                date: ''
            },
            transactionType: 'income',
            incomes: [],
            expenses: [],
            totalIncome: 0,
            totalExpense: 0,
            totalBalance: 0,
            errors: []
        }
    },
    mounted() {
        this.listAll();
        this.clearBalance();
        this.filteredTransactions();
    },
    methods: {
        openModal() {
        this.activeModal = true
        },
        closeModal() {
            this.activeModal = false
        },
        isIncome(value) {
            return value > 0 ? value = 'income' : 'expense';
        },
        clearBalance() {
            this.totalIncome = 0;
            this.totalExpense = 0;
            this.totalBalance = 0;
        },
        async listAll() {
            const value = await TransactionApi.listar();
            this.transactions = value.data;

            return this.transactions;
        },
        async filteredTransactions() {
            const allItems = await this.listAll();

            for(let item of allItems) {
                if(item.amount < 0) {
                    this.$set(this.expenses, this.expenses.length, item.amount)
                } else if (item.amount >= 0) {
                    this.$set(this.incomes, this.incomes.length, item.amount)
                }
            }
            
            const absolutValue = this.expenses.map(expense => Math.abs(expense));
            this.totalExpense = absolutValue.reduce((totalExpenses, currentValue) => {
                return totalExpenses + currentValue
                });

            this.totalIncome = this.incomes.reduce((totalIncomes, currentValue) => {
                console.log(totalIncomes, currentValue)
                return totalIncomes + currentValue
            });

            this.totalBalance = this.totalIncome - this.totalExpense;            
        },
        // async getIncomes() {
        //     const allItems = await this.listAll();

        //     for(let item of allItems) {
        //         if(item.amount < 0) {
        //             this.$set(this.expenses, this.expenses.length, item.amount)
        //         }
        //     }

        //     this.expenses.reduce((totalExpense, currentValue) => {
        //         return totalExpense + currentValue;
        //     }, 0)
        // },
        async saveTransaction() {
            const amountValue = parseFloat(this.addTransaction.amount);

            await Api.post('transactions', {
                description: this.addTransaction.description,
                amount: amountValue,
                date: this.addTransaction.date
            });

            this.listAll();
        },
        async deleteTransaction(transaction) {
            await Api.delete('http://localhost:3000/transactions/' + transaction.id);

            this.listAll();
        }
    }
}
</script>

<style src="./style.scss" lang="scss" scoped />