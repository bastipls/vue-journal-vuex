<template>
    <div class="entry-list-container">
        <div class="px-2 pt-2">
            <input type="text" v-model="term" class="form-control" placeholder="Buscar entrada">
        </div>
        <div class="mt-2 d-flex flex-column">
            <button class="btn btn-primary mx-3"
                @click="$router.push({name:'entry',params:{id:'new'}})">
            
                <i class="fa fa-plus-circle"></i>
                Nueva Entrada
            </button>
        </div>
        <div class="entry-scrollarea">
            <Entry v-for="entry in entriesByTerm" :key="entry.id" :entry="entry" />
            
            
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core'
import {mapGetters} from 'vuex'
export default {
    components:{
        Entry:defineAsyncComponent(() => import('./Entry.vue'))

    },
    computed:{
        entriesByTerm(){
            return this.getEntriesByTerm(this.term)
        },
        ...mapGetters('journal',['getEntriesByTerm'])
    },
    data(){
        return {
            term:''
        }
    }
}
</script>
<style scoped>

.entry-list-container {
    border-right:1px solid #2c3e50;
    height: calc(100vh - 56px);
}
.entry-scrollarea{
    height: calc(100vh - 110px);
    overflow-y: scroll;
}
</style>