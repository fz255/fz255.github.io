<script setup lang="ts">
import PieChart from "@/components/charts/PieChart.vue";
import LineChart from "@/components/charts/LineChart.vue";
</script>
<script lang="ts">
export default {
    data() {
        return {
            loaded: false,
            charts: {
                type: {
                    data: {},
                    options: {}
                },
                ukrn: {
                    data: {},
                    options: {}
                },
                years: {
                    data: {},
                    options: {}
                },
            }
        }
    },
    methods: {
        generateYears: (from: number): string[] => {
            let curr = new Date().getFullYear(), years = [];
            while ( from < curr ) {
                years.push((from++).toString());
            }
            years.push(`${curr} *`)
            return years;
        },
        filter: (body: object[], prop: string, val: boolean, from: number) => {
            let curr = new Date().getFullYear(), output = [];
            while ( from <= curr ) {
                // @ts-ignore
                output.push(body.filter(i => i[prop].includes(from.toString()) && i.is_terr == val).length);
                from++;
            }
            return output;
        },
        filter2: (body: object[], prop: string, from: number) => {
            let curr = new Date().getFullYear(), output = [];
            while ( from <= curr ) {
                // @ts-ignore
                output.push(body.filter((i: any) => i[prop].includes(from.toString())).length);
                from++;
            }
            return output;
        }
    },
    mounted() {
        fetch(`https://api.li0ard.rest/fuckcors?url=https://extrem.ishukshin.ru/json/all`)
        .then(res => res.json())
        .then(body => {
            let terr = body.filter((i: any) => i.is_terr == true).length
            let extr = body.filter((i: any) => i.is_terr == false).length
            let ukrn = body.filter((i: any) => i.is_ukrainian == true).length
            // ff5722 00e676

            this.charts.type = {
                data: {
                    labels: ['Террористы', 'Экстремисты'],
                    datasets: [{ data: [terr, extr], backgroundColor: ['#ff9f40', '#36a2eb'], borderWidth: 0.5 , borderColor: '#ddd' }] 
                },
                options: {
                    plugins: { title: { display: true, text: 'По типу записи' }, subtitle: { display: true, text: `Всего: ${body.length} записей` } },
                }
            }
            this.charts.ukrn = {
                data: {
                    labels: ['Уроженцы', 'Не уроженцы'],
                    datasets: [{ data: [ukrn, body.length - ukrn], backgroundColor: ['#36a2eb', '#ff9f40'], borderWidth: 0.5 , borderColor: '#ddd' }]
                },
                options: {
                    plugins: { title: { display: true, text: 'Уроженцы Украины' }, subtitle: { display: true, text: `Всего: ${body.length} записей` } },
                }
            }
            this.charts.years = {
                data: {
                    labels: this.generateYears(2018),
                    datasets: [
                        { label: 'Экстремисты', backgroundColor: ["#36a2eb"], borderColor: "#36a2eb", data: this.filter(body, "added_at", false, 2018), pointStyle: 'circle', pointRadius: 5, pointHoverRadius: 10 },
                        { label: 'Террористы', backgroundColor: ["#ff9f40"], borderColor: "#ff9f40", data: this.filter(body, "added_at", true, 2018), pointStyle: 'circle', pointRadius: 5, pointHoverRadius: 10 },
                        { label: 'Внесено всего', backgroundColor: ["#ff6384"], borderColor: "#ff6384", data: this.filter2(body, "added_at", 2018), pointStyle: 'circle', pointRadius: 5, pointHoverRadius: 10 }
                    ] 
                },
                options: {
                    plugins: { title: { display: true, text: 'По кол-ву внесений (Диаграмма)' }, subtitle: { display: true, text: '* - на момент последнего обновления' } },
                }
            }
            this.loaded = true
        })
    }
}
</script>
<template>
    <main>
        <div style="margin-top: 20px;" class="wrapper d-flex flex-column min-vh-100">
            <div class="body flex-grow-1">
                <div class="container-lg px-4">
                    <div class="row row-cols-1 row-cols-md-2">
                        <div class="col">
                            <div class="card mb-4">
                                <div class="card-header"><span class="small ms-1">По типу записи</span></div>
                                <div class="card-body">
                                    <center>
                                        <div v-if="!loaded" class="p-3 text-center">
                                            <div class="spinner-border" role="status">
                                                <span class="visually-hidden">Загрузка...</span>
                                            </div>
                                        </div>
                                        <div class="p-3">
                                            <PieChart v-if="loaded" :data="charts.type.data" :options="charts.type.options" />
                                        </div>
                                    </center>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card mb-4">
                                <div class="card-header"><span class="small ms-1">Являются уроженцами Украины</span></div>
                                <div class="card-body">
                                    <center>
                                        <div v-if="!loaded" class="p-3 text-center">
                                            <div class="spinner-border" role="status">
                                                <span class="visually-hidden">Загрузка...</span>
                                            </div>
                                        </div>
                                        <div class="p-3">
                                            <PieChart v-if="loaded" :data="charts.ukrn.data" :options="charts.ukrn.options" />
                                        </div>
                                    </center>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="card mb-4">
                                <div class="card-header"><span class="small ms-1">Кол-во включений по годам</span></div>
                                <div class="card-body">
                                    <div v-if="!loaded" class="p-3 text-center">
                                        <div class="spinner-border" role="status">
                                            <span class="visually-hidden">Загрузка...</span>
                                        </div>
                                    </div>
                                    <div class="p-3">
                                        <LineChart v-if="loaded" :data="charts.years.data" :options="charts.years.options" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>