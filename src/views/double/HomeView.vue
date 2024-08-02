<script setup lang="ts">
import { Grid, html} from 'gridjs'
import "gridjs/dist/theme/mermaid.css"
import locale from "../../locale"
</script>
<script lang="ts">
export default {
	data() {
		return {
			loaded: false,
			progress: 0,
			grid: new Grid()
		}
	},
	mounted() {
		this.progress = 20
		fetch(`https://raw.githubusercontent.com/fz255/foreign-agents/main/registry.json`)
		.then(res => res.json())
		.then(inoagents => {
			this.progress = 50
			fetch(`https://apiv2.li0ard.rest/cors?url=https://extrem.ishukshin.ru/json/all`)
			.then(res => res.json())
			.then(fedsfm => {
				this.progress = 60
				inoagents = inoagents.filter((i: any) => i.dob != "").map((i: any) => [
                    i.fullName.toUpperCase().trim().replace(/ \(.+\)/gm, ``),
                    i.dob,
					i.dateIn
                ])
				this.progress = 80
				fedsfm = fedsfm.filter((i: any) => !!i.birth).map((i: any) => [
					i.name_full.replace("*", ""),
					i.birth.replace(" г.р.", ""),
					i.added_at
				])
				let result = []
				for(let i of inoagents) {
                    if(fedsfm.filter((j: any) => j[0] == i[0] && j[1] == i[1]).length != 0) {
                        result.push([
							...i,
							fedsfm.filter((j: any) => j[0] == i[0] && j[1] == i[1])[0][2]
						])
                    }
                }
				this.progress = 100
				this.grid.updateConfig({
					columns: [
						"ФИО", 
						{
                        	name: "Дата рождения",
                        	sort: false
                    	}, 
						{
                        	name: html("Включение в реестр<br>Минюста"),
                        	sort: false
                    	}, 
						{
                        	name: html("Включение в реестр<br>Росфинмониторинга"),
                        	sort: false,
                        	formatter: (cell: string) => {
                            	cell = cell.replace("BEFORE", "до 08.2018")
                            	return cell
                        	}
                    	}
					],
					data: result,
				    pagination: {
				    	limit: 10
				    },
                    sort: true,
				    fixedHeader: true,
				    search: {
				    	ignoreHiddenColumns: false,
				    },
				    language: locale
				})
				this.loaded = true
				this.grid.render(document.getElementById("reestr") as Element);
			})
		})
	}
}
</script>
<template>
    <main>
        <div class="container noprint">
			<br>
			<div class="row">
				<center>
                    <div v-if="!loaded" id="loading">
						<div class="card mb-4">
							<div class="card-body">
								<center>
									<div class="p-3">
										<p>Двойной статус - это наличие записи о человеке одновременно<br>в реестре иностранных агентов Минюста и в реестре экстремистов/террористов Росфинмониторинга.<br></p>
                        				<div class="card mb-4">
											<div align="left" class="card-header"><span class="small ms-1">Загрузка...</span></div>
											<div class="card-body">
                        						<div class="progress" role="progressbar">
                            						<div id="bar" class="progress-bar" :style="`width: ${progress}%;`"></div>
                        						</div>
											</div>
										</div>
									</div>
								</center>
							</div>
						</div>
                    </div>
					<div id="reestr"></div>
				</center>
			</div>
		</div>
    </main>
</template>