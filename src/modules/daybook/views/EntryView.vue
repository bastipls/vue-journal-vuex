<template>
    <template  v-if="entry">

        <div 
           
            class="entry-title d-flex justify-content-between p-2">
            <div>
                <span class="text-success fs-3 fw-bold">
                    {{day}}
                </span>
                <span class="text-success fs-3 fw-bold">
                    {{month}}
                </span>
                <span class="text-success fs-3 fw-bold">
                    {{yearDay}}
                </span>
            </div>
            <div>
                <input
                    @change="onSelectedImage"
                    ref="imageSelector"
                    v-show="false"
                    accept="image/png, image/jpeg"
                    type="file" >
                <button v-if="entry.id" @click="onDeleteEntry" class="btn btn-danger mx-2">
                    Borrar
                    <i class="fa fa-trash-alt "></i>
                </button>
                <button 
                    @click="onSelectImage"
                    class="btn btn-primary mx-2">
                    Subir foto
                    <i class="fa fa-upload "></i>
                </button>
            </div>
        </div>
        <hr>
        <div class="d-flex flex-column px-3 h-75">
            <textarea 
                v-model="entry.text"
                placeholder="¿Qué sucedió hoy?"
            ></textarea>
        </div>
        <img 
            v-if="entry.picture && !localImage"
            :src="entry.picture"
            alt="entry-picture"
            class="img-thumbnail"
            >
        <img 
            v-if="localImage"
            :src="localImage" 
            alt="entry-picture"
            class="img-thumbnail"
            >
    </template>
        <Fab 
            icon="fa-save"
            @on:click="saveEntry"
        />
</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core'
import {mapGetters,mapActions} from 'vuex'
import getDayMonthYear from '../helpers/getDayMonthYear'
import Swal from 'sweetalert2'
import uploadImage from '../helpers/uploadImage'
export default {
    props:{
        id:{
            type:String,
            required:true
        }
    },
    data(){
        return {
            entry:null,
            localImage:null,
            file:null
        }
    },
    components:{
        Fab:defineAsyncComponent(() => import('../components/Fab.vue')),
        
    },
    methods:{
        ...mapActions('journal',['updateEntry','createEntry','deleteEntry']),
        async saveEntry(){
            new Swal({
                title:'Espere por favor',
                allowOutsideClick:false,
            })
            Swal.showLoading()
            const picture = await uploadImage(this.file)
            this.entry.picture = picture
            if(this.entry.id){
                await this.updateEntry(this.entry)
            }else{
                const id = await this.createEntry(this.entry)
                this.$router.push({name:'entry',params:{id}})
            }
            Swal.fire("Gurdado",'Entrada registrada con éxito','success')
            this.file = null
        },
        async onDeleteEntry(){
            const {isConfirmed} = await Swal.fire({
                title:'¿Está seguro?',
                text:'Esta acción no se puede deshacer',
                showDenyButton:true,
                confirmButtonColor:'#3085d6',
                cancelButtonColor:'#d33',
                confirmButtonText:'Si, estoy seguro'
            })
            if(isConfirmed){
                new Swal({
                    title:'Espere por favor',
                    allowOutsideClick:false,
                })
                Swal.showLoading()
                await this.deleteEntry(this.entry.id)
                this.$router.push({name:'no-entry'})
                Swal.fire('Borrado','Entrada borrada con éxito','success')
            }
        }
        ,
        loadEntry(){
            let entry;
            if(this.id === 'new'){
                entry = {
                    date:new Date(),
                    text:'',
                }
            }else{
                    
                entry = this.getEntryById(this.id)
                if(!entry) return this.$router.push({name:'no-entry'})
            }
            this.entry = entry
        },
        onSelectedImage(event){
            const file = event.target.files[0]
            if(!file) {
                this.localImage = null
                this.file = null
                return
            }
            this.file = file
            const fr = new FileReader()
            fr.onload = () =>  this.localImage = fr.result
            fr.readAsDataURL(file)
        
        },
        onSelectImage(){
            this.$refs.imageSelector.click()
        }
    },

    computed:{
        ...mapGetters('journal',['getEntryById']),
        day(){
            const { day } = getDayMonthYear(this.entry.date)
            return day;
        },
        month(){
            const { month } = getDayMonthYear(this.entry.date)
            return month;
        },
        yearDay(){
            const { yearDay } = getDayMonthYear(this.entry.date)
            return yearDay
        }
    },
    created(){
        this.loadEntry()
    },
    watch:{
        id(){
            this.loadEntry()
        }
    }
    
}
</script>

<style scoped lang="scss">
    textarea{
        font-size: 20px;
        border:none;
        height: 100%;
        &:focus{
            outline: none;
        }
    }
    img{
        width:200px;
        position: fixed;
        bottom: 150px;
        right: 20px;
        box-shadow: 0px 5px 10px rgba(0,0,0,0.2);
    }
</style>