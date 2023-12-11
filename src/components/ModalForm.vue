<script>

    export default{
        methods: {
            close(){
                this.$emit("close")
            }
        }
    }

</script>


<template>

<Transition name="modal-fade">
    <div v-show="isModalVisible" class="modal-wrap" id="item-modal">
        <div class="modal-content">
            <header class="modal-header" id="modal-title">
                <slot name="header">
                    Hi User
                </slot>
                <button type="button" @click="close">Close &cross;</button>
            </header>
            <section class="modal-body" id="modal-details">
                <slot name="body">Add something here</slot>
            </section>
        </div>
    </div>
</Transition>

</template>


<style>

.modal-wrap{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(133, 226, 100, 0.427);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9998;
}

.modal-content{
    background: #eeeeee;
    width: 80%;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: block;
    padding: 10px;
}

.modal-content header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-block: 10px;
}

.modal-fade-enter,
.modal-fade-leave-to{
    opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active{
    transition: 0.5s ease;
}
</style>