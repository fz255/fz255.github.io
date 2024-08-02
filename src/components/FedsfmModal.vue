<script lang="ts">
export default {
    props: ["recordData", "id"]
}
</script>
<template>
    <div :id="id" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Запись №{{ recordData.id }}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
                    </div>
                    <div class="modal-body">
                        <p><b>Тип записи:</b> {{ recordData.is_terr }}</p>
                        <p><b>ФИО:</b> {{ recordData.name_full }}</p>
                        <p><b>Дата рождения:</b> {{ recordData.birth }}</p>
                        <p><b>Место рождения:</b> {{ recordData.place }}</p>
                    </div>
                    <div class="noprint modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                    </div>
                </div>
            </div>
        </div>
</template>