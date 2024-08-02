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
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Запись №{{ recordData.number }}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col">
                                <p>ФИО/Наименование</p>
                                <p class="value text-body-secondary">{{ recordData.name }}</p>
                                <p>Дата рождения</p>
                                <p class="value text-body-secondary">{{ recordData.dob }}</p>
                                <p>Регистрационная информация <a class="noprint" data-bs-toggle="tooltip" data-bs-title="Для физ.лиц указывается ИНН и СНИЛС, для юр.лиц РФ указывается ИНН и ОГРН, для иностранных юр.лиц указывается регистрационный номер в стране регистрации"><i class="bi bi-question-circle"></i></a></p>
                                <p class="value text-body-secondary" v-html="recordData.reg"></p>
                            </div>
                            <div class="col">
                                <p>Основание для включения</p>
                                <p class="value text-body-secondary"><a :href="recordData.law_link" id="law_link">{{ recordData.law }}</a></p>
                                <p>Дата включения</p>
                                <p class="value text-body-secondary">{{ recordData.dateIn }}</p>
                                <p>Дата опубликования решения о включении</p>
                                <p class="value text-body-secondary">{{ recordData.datePubl }}</p>
                                <p>Дата исключения</p>
                                <p class="value text-body-secondary">{{ recordData.dateOut }}</p>
                            </div>
                        </div>
                        <div class="row noprint">
                            <div class="accordion">
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseResources" aria-expanded="false" aria-controls="collapseResources">
                                            Информационные ресурсы
                                        </button>
                                    </h2>
                                    <div id="collapseResources" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div style="word-wrap: break-word;" class="accordion-body">{{ recordData.resources }}</div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseMembers" aria-expanded="false" aria-controls="collapseMembers">
                                            Участники
                                        </button>
                                    </h2>
                                    <div id="collapseMembers" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div style="word-wrap: break-word;" class="accordion-body">{{ recordData.members }}</div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseMsg" aria-expanded="false" aria-controls="collapseMsg">
                                            Сноска (для сайтов и т.п)
                                        </button>
                                    </h2>
                                    <div id="collapseMsg" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">{{ recordData.msg }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="noprint modal-footer">
                        <a :href="recordData.press_link" target="_blank"><button type="button" class="btn btn-primary">Причины внесения (β)</button></a>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                    </div>
                </div>
            </div>
    </div>
</template>
<style scoped>
.value {
    margin-top: -15px;
}
</style>