<script setup lang="ts">
import PieChart from "@/components/charts/PieChart.vue";
import LineChart from "@/components/charts/LineChart.vue";
import BarChart from "@/components/charts/BarChart.vue";
</script>
<script lang="ts">
export default {
    data() {
        return {
            loaded: false,
            charts: {
                selected: "line",
                type: {
                    data: {},
                    options: {}
                },
                law: {
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
    mounted() {
        fetch(`https://raw.githubusercontent.com/fz255/foreign-agents/main/registry.json`)
        .then(res => res.json())
        .then(body => {
            let ul = body.filter((i: any) => i.inn.length==10).length
            let fl = body.filter((i: any) => i.dob != "" || i.inn.length==12).length

            this.charts.type = {
                data: {
                    labels: ['Юридические лица', 'Физические лица', 'Прочее'],
                    datasets: [{
                        data: [ul, fl, body.length-(ul+fl)],
                        backgroundColor: ['#ff5722', '#00e676', '#1e88e5'],
                        borderWidth: 0.5 ,
                        borderColor: '#ddd'
                    }]
                },
                options: {
                    plugins: { title: { display: true, text: 'По типу агента' }, subtitle: { display: true, text: `Всего: ${body.length} записей` } },
                }
            }
            this.charts.law = {
                data: {
                    labels: ['ст. 2.1 272-ФЗ *', 'ст. 6 Закона "О СМИ"', 'ст. 25.1 Закона "О СМИ" *', 'cт. 29.1 82-ФЗ *', 'ст. 32 7-ФЗ', 'ст. 7 255-ФЗ', 'ст. 9 255-ФЗ'],
                    datasets: [{
                        data: this.filterLaw(body),
                        backgroundColor: ['#4dc9f6', '#f67019',  '#f53794', '#acc236', '#00a950', '#58595b', '#8549ba'],
                        borderWidth: 0.5 ,
                        borderColor: '#ddd'
                    }]
                },
                options: {
                    plugins: { title: { display: true, text: 'По основанию' }, subtitle: { display: true, text: `* - статья утратила силу` } },
                }
            }
            this.charts.years = {
                data: {
                    labels: this.generateYears(2013),
                    datasets: [
                        { label: 'Внесено', backgroundColor: "#1e88e5", borderColor: "#1e88e5", data: this.filter(body, "dateIn", 2013), pointStyle: 'circle', pointRadius: 5, pointHoverRadius: 10 },
                        { label: 'Исключено', backgroundColor: "#ff5722", borderColor: "#ff5722", data: this.filter(body, "dateOut", 2013), pointStyle: 'circle', pointRadius: 5, pointHoverRadius: 10 }
                    ]
                },
                options: {
                    plugins: { title: { display: true, text: 'По кол-ву внесений/исключений' }, subtitle: { display: true, text: '* - на момент последнего обновления' }},
                }
            }
            this.loaded = true
        })
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
        filter: (body: object[], prop: string, from: number) => {
            let curr = new Date().getFullYear(), output = [];
            while ( from <= curr ) {
                // @ts-ignore
                output.push(body.filter((i: any) => i[prop].includes(from.toString())).length);
                from++;
            }
            return output;
        },
        filterLaw: (body: object[]) => {
            let laws = ["Статья 2.1", "Статья 6", "Статья 25.1", "Статья 29.1", "Статья 32", "Статья 7", "Статья 9"], output = [];
            for(let law of laws) {
                output.push(body.filter((i: any) => i.law.includes(law)).length)
            }
            return output
        }
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
                                <div class="card-header"><span class="small ms-1">По типу агента</span></div>
                                <div class="card-body">
                                    <center>
                                        <div class="p-3">
                                            <PieChart v-if="loaded" :data="charts.type.data" :options="charts.type.options"/>
                                        </div>
                                    </center>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card mb-4">
                                <div class="card-header"><span class="small ms-1">По основанию</span></div>
                                <div class="card-body">
                                    <center>
                                        <div class="p-3">
                                            <PieChart v-if="loaded" :data="charts.law.data" :options="charts.law.options"/>
                                        </div>
                                    </center>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="card mb-4">
                                <div class="card-header"><span class="small ms-1">Кол-во включений и исключений по годам</span></div>
                                <div class="card-body">
                                    <div class="p-3">
                                        <center>
                                            <LineChart v-if="loaded && charts.selected == 'line'" :data="charts.years.data" :options="charts.years.options"/>
                                            <BarChart v-if="loaded && charts.selected == 'bar'" :data="charts.years.data" :options="charts.years.options"/>
                                            <div class="btn-group mt-3" role="group">
                                                <button @click="() => charts.selected = 'bar'" type="button" class="btn btn-outline-primary">Диаграмма</button>
                                                <button @click="() => charts.selected = 'line'" type="button" class="btn btn-outline-primary">График</button>
                                            </div>
                                        </center>
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