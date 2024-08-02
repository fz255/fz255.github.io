<script setup lang="ts">
import { Bar } from "vue-chartjs"
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, SubTitle } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, SubTitle)
</script>
<script lang="ts">
export default {
    props: ["data", "options"]
}
</script>
<template>
    <Bar :data="data" :options="options" />
</template>