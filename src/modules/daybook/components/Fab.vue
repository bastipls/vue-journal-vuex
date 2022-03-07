<template>
  <button
    @click="$emit('on:click')"
    class="btn btn-primary"
    :class="colorButton"
    >
        <i
            class="fa fa-2x fa-plus"
            :class="icon"
        ></i>
        </button
    >
</template>

<script>
export default {
    props:{
            icon: {
                type: String,
                default: 'fa-plus'
            },
            colorButton: {
                type: String,
                default: 'btn-primary'
            },
            size: {
                type: String,
                default: 'btn-lg'
            }
        }
    
}
</script>

<style lang="scss" scoped>
    button{
        border-radius: 100%;
        bottom: 20px;
        height: 80px;
        position: fixed;
        right: 20px;
        width: 80px;
    }
</style>