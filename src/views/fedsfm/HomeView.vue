<script setup lang="ts">
import { Grid, h} from 'gridjs'
import "gridjs/dist/theme/mermaid.css"
import locale from "../../locale"
import { Modal } from 'bootstrap';
import FedsfmModal from '@/components/FedsfmModal.vue';
</script>
<script lang="ts">
export default {
    data() {
        return {
            recordData: {
                id: "",
                name_full: "",
                birth: "",
                place: "",
                is_terr: ""
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
                    "id": "name_full",
                    "name": "ФИО"
                },
                {
                    "id": "birth",
                    "name": "Дата рождения",
                },
                {
                    "id": "place",
                    "name": "Место рождения",
                    hidden: true
                },
                {
                    "id": "is_terr",
                    "name": "Тип записи",
                    hidden: true
                },
                {
                    "id": "actions",
                    "name": "",
                    formatter: (cell, row) => {
                        return h("button", {
                            className: "btn btn-primary",
                            onClick: () => {
                                let data = row.cells
                                this.recordData = {
                                    id: data[0].data as string,
                                    name_full: data[1].data as string,
                                    birth: data[2].data as string,
                                    place: data[3].data as string,
                                    is_terr: data[4].data ? "Террорист" : "Экстремист",
                                }
                                new Modal("#card").show()
                            }
                        }, `Просмотр`)
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
                url: `https://api.li0ard.rest/fuckcors?url=https://extrem.ishukshin.ru/json/all`,
                then: data => data
            }
        })
        this.grid.render(document.getElementById("reestr") as Element);
    }
}
</script>
<template>
    <main>
        <FedsfmModal id="card" :record-data="recordData" />
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