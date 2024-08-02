<script setup lang="ts">
import { Grid, h} from 'gridjs'
import "gridjs/dist/theme/mermaid.css"
import locale from "../../locale"
import { Modal } from 'bootstrap';
import OrgsModalVue from '@/components/OrgsModal.vue';
</script>
<script lang="ts">
export default {
    data() {
        return {
            recordData: {
                number: "",
                fullName: "",
                decisionInMinjust: "",
                decisionInGenproc: "",
                decisionOutMinjust: "",
                decisionOutGenproc: "",
                dateIn: "",
                dateOut: ""
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
                    "id": "decisionInMinjust",
                    "name": "Решение Минюста о включении",
                    hidden: true
                },
                {
                    "id": "decisionInGenproc",
                    "name": "Решение Генеральной прокуратуры о признании деятельности нежелательной",
                    hidden: true
                },
                {
                    "id": "decisionOutMinjust",
                    "name": "Решение Минюста об исключении",
                    hidden: true
                },
                {
                    "id": "decisionOutGenproc",
                    "name": "Решение Генеральной прокуратуры об отмене признания деятельности нежелательной",
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
                    id: "actions",
                    name: "",
                    formatter: (cell, row) => {
                        return h("button", {
                            className: "btn btn-primary",
                            onClick: () => {
                                let data = row.cells
                                this.recordData = {
                                    number: data[0].data as string,
                                    fullName: data[1].data as string,
                                    decisionInMinjust: data[2].data as string,
                                    decisionInGenproc: data[3].data as string,
                                    decisionOutMinjust: (data[4].data as string).trim() != "" ? data[4].data as string : "-",
                                    decisionOutGenproc: (data[5].data as string).trim() != "" ? data[5].data as string : "-",
                
                                    dateIn: data[6].data as string,
                                    dateOut: data[7].data != "" ? data[7].data as string : "-"
                                }
                                new Modal("#card").show()
                            }
                        }, "Просмотр")
                    }
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
                url: `https://raw.githubusercontent.com/fz255/undesirable-organizations/main/registry.json`,
                then: data => data
            }
        })
        this.grid.render(document.getElementById("reestr") as Element);
    }
}
</script>
<template>
    <main>
        <OrgsModalVue id="card" :record-data="recordData" />
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