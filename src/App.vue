<template>
  <div id="app">
    <Header />
    <Transactions />
  </div>
</template>

<script>
import Header from './components/Header';
import Transactions from './components/Transactions';
export default {
  name: 'App',
  components: {
    Header,
    Transactions
  }
}
</script>
