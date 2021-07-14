<template>
    <header>
        <div class="logo">
            <img :src="logoImg" alt="dev.finance">
        </div>
    </header>
</template>

<script>
import logoImg from '../../assets/images/logo.svg';

export default {
    name: 'Header',
    data() {
        return {
            logoImg
        }
    }
}
</script>

<style src="./style.scss" lang="scss" scoped />