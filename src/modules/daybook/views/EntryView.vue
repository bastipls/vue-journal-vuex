<template>
    <div class="entry-title d-flex justify-content-between p-2">
        <div>
            <span class="text-success fs-3 fw-bold">
                15
            </span>
            <span class="text-success fs-3 fw-bold">
                Julio
            </span>
            <span class="text-success fs-3 fw-bold">
                2022, jueves
            </span>
        </div>
        <div>
            <button class="btn btn-danger mx-2">
                Borrar
                <i class="fa fa-trash-alt "></i>
            </button>
            <button class="btn btn-danger mx-2">
                Subir foto
                <i class="fa fa-upload "></i>
            </button>
        </div>
    </div>
    <hr>
    <div class="d-flex flex-column px-3 h-75">
        <textarea 
            placeholder="¿Qué sucedió hoy?"
        ></textarea>
    </div>
    <Fab 
        icon="fa-save"
    />
    <img 
        src="https://www.adslzone.net/app/uploads-adslzone.net/2019/04/borrar-fondo-imagen.jpg" 
        alt="entry-picture"
        class="img-thumbnail"
        >
</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core'
export default {
    components:{
        Fab:defineAsyncComponent(() => import('../components/Fab.vue'))
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