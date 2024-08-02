<script setup lang="ts">
import { Grid, h} from 'gridjs'
import "gridjs/dist/theme/mermaid.css"
import locale from "../locale"
import { Modal } from 'bootstrap';
import AgentsModal from '@/components/AgentsModal.vue';
import moment from 'moment';
</script>
<script lang="ts">
export default {
    data() {
        return {
            recordData: {
                number: "",
                name: "",
                dob: "",
                resources: "",
                members: "",
                law: "",
                law_link: "",
                dateIn: "",
                dateOut: "",
                datePubl: "",
                msg: "",
                reg: "",
                press_link: ""
            },
            grid: new Grid()
        }
    },
    mounted() {
        this.grid.updateConfig({
            columns: [
                {
                    "id": "id",
                    "name": "№"
                },
                {
                    "id": "fullName",
                    "name": "Наименование"
                },
                {
                    "id": "dob",
                    "name": "Дата рождения",
                    hidden: true
                },
                {
                    "id": "ogrn",
                    "name": "ОГРН",
                    hidden: true
                },
                {
                    "id": "inn",
                    "name": "ИНН",
                    hidden: true
                },
                {
                    "id": "regNum",
                    "name": "Регистрационный номер",
                    hidden: true
                },
                {
                    "id": "snils",
                    "name": "СНИЛС",
                    hidden: true
                },
                {
                    "id": "address",
                    "name": "Адрес",
                    hidden: true
                },
                {
                    "id": "resources",
                    "name": "Информационный ресурс",
                    hidden: true
                },
                {
                    "id": "members",
                    "name": "Участники",
                    hidden: true
                },
                {
                    "id": "law",
                    "name": "Основание для включения",
                    hidden: true
                },

                {
                    "id": "dateIn",
                    "name": "Дата включения",
                    hidden: true
                },
                {
                    "id": "dateOut",
                    "name": "Дата исключения",
                    hidden: true
                },
                {
                    "id": "datePubl",
                    "name": "Дата опубликования решения о включении",
                    hidden: true
                },
                {
                    "id": "actions",
                    name: "",
                    formatter: (cell, row) => {
                        return h("button", {
                            className: "btn btn-primary",
                            onClick: () => {
                                let data = row.cells
                                this.recordData = {
                                    number:  data[0].data as string,
                                    name: data[1].data as string,
                                    dob: (data[2].data != "" ? data[2].data as string : "-"),
                                    resources: (data[8].data != "" ? data[8].data as string : "Не указаны"),
                                    members: (data[9].data != "" ? data[9].data as string : "Не указаны"),
                                    law: data[10].data as string,
                                    law_link: `https://www.consultant.ru/search/?q=${data[10].data}`,
                                    dateIn: data[11].data as string,
                                    dateOut: (data[12].data != "" ? data[12].data as string : "-"),
                                    datePubl: (data[13].data != "" ? data[13].data as string : "-"),
                                    msg: `18+ НАСТОЯЩИЙ МАТЕРИАЛ (ИНФОРМАЦИЯ) ПРОИЗВЕДЕН И (ИЛИ) РАСПРОСТРАНЕН ИНОСТРАННЫМ АГЕНТОМ ${(data[1].data as string).toUpperCase()}, ЛИБО КАСАЕТСЯ ДЕЯТЕЛЬНОСТИ ИНОСТРАННОГО АГЕНТА ${(data[1].data as string).toUpperCase()}.`,
                                    reg: "-",
                                    press_link: ""
                                }
                                if (data[2].data != "" || (data[4].data as string).length == 12) {
                                    this.recordData.reg = `${data[4].data != "" ? `<a href="https://egrul.itsoft.ru/${(data[4].data as string).split(" ").join("")}">${data[4].data}</a>` : "-"} / ${data[6].data != "" ? data[6].data : "-"}`
                                }
                                else if(data[3].data != "" || (data[4].data as string).length == 10) {
                                    this.recordData.reg = `<a href="https://egrul.itsoft.ru/${(data[4].data as string).split(" ").join("")}">${data[4].data}</a> / ${data[3].data != "" ? data[3].data : "-"}`
                                }
                                else if(data[5].data != ""){
                                    this.recordData.reg = `${data[5].data}`
                                }
                                this.recordData.press_link = `https://minjust.gov.ru/ru/events/list/?words=О+реестре+иностранных+агентов&start_date=${(data[11].data as string).split(".").join("-")}&end_date=${moment(data[11].data as string, "DD.MM.YYYY").add(6, "days").format("DD-MM-YYYY")}`
                                new Modal("#card").show()
                            }
                        }, "Просмотр")
                    },
                }
            ],
            pagination: {
                limit: 10
            },
            fixedHeader: true,
            search: {
                ignoreHiddenColumns: false,
            },
            language: locale,
            server: {
                url: `https://raw.githubusercontent.com/fz255/foreign-agents/main/registry.json`,
                then: data => data
            }
        })
        this.grid.render(document.getElementById("reestr") as Element);
    }
}
</script>
<template>
    <main>
        <AgentsModal id="card" :record-data="recordData" />
        <div class="container">
            <div class="row">
                <div id="reestr"></div>
            </div>
        </div>
    </main>
</template>
<style scoped>
.value {
    margin-top: -15px;
}
</style>