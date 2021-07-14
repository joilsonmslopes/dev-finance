<template>
    <section>
        <div class="transactions">
            <div class="transaction">
                <div class="title">
                    <h1>Entradas</h1>
                    <img :src="incomesImg" alt="Entradas">
                </div>
                <h2>
                    R$ 17.400,00
                </h2>
            </div>
            <div class="transaction">
                <div class="title">
                    <h1>Saídas</h1>
                    <img :src="expenseImg" alt="Saídas">
                </div>
                <h2>
                    R$ 1.259,00
                </h2>
            </div>
            <div class="transaction">
                <div class="title">
                    <h1>Total</h1>
                    <img :src="totalImg" alt="Total">
                </div>
                <h2>
                    R$ 16.141,00
                </h2>
            </div>
        </div>

        <div class="newTransaction">
            <button class="btn">Adicionar Transação <img :src="newTransaction" alt="Nova Transação"></button>
        </div>

        
    </section>
</template>

<script>
import incomesImg from '../../assets/images/incomes.svg';
import expenseImg from '../../assets/images/expense.svg';
import totalImg from '../../assets/images/total.svg';
import newTransaction from '../../assets/images/plus.svg';

export default {
    name: 'Transactions',
    data() {
        return {
            incomesImg,
            expenseImg,
            totalImg,
            newTransaction
        }
    }
}
</script>

<style src="./style.scss" lang="scss" scoped />