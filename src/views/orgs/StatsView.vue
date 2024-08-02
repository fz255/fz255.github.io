<script setup lang="ts">
import LineChart from "@/components/charts/LineChart.vue"
import BarChart from "@/components/charts/BarChart.vue"
</script>
<script lang="ts">
export default {
    data() {
        return {
            loaded: false,
            charts: {
                selected: "line",
                years: {
                    data: {},
                    options: {
                        plugins: { title: { display: true, text: 'По кол-ву внесений/исключений' }, subtitle: { display: true, text: '* - на момент последнего обновления' } },
                    }
                }
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
        filter: (body: object[], prop: string, from: number) => {
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
        fetch(`https://raw.githubusercontent.com/fz255/undesirable-organizations/main/registry.json`)
        .then(res => res.json())
        .then(body => {
            this.charts.years.data = {
                labels: this.generateYears(2015),
                datasets: [
                    { label: 'Внесено', backgroundColor: ["#1e88e5"], borderColor: "#1e88e5", data: this.filter(body, "dateIn", 2015), pointStyle: 'circle', pointRadius: 5, pointHoverRadius: 10 },
                    { label: 'Исключено', backgroundColor: "#ff5722", borderColor: "#ff5722", data: this.filter(body, "dateOut", 2015), pointStyle: 'circle', pointRadius: 5, pointHoverRadius: 10 }
                ]
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