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
								<p>Наименование</p>
								<p class="value text-body-secondary">{{ recordData.fullName }}</p>
								<p>Дата включения</p>
								<p class="value text-body-secondary">{{ recordData.dateIn }}</p>
								<p>Дата исключения</p>
								<p class="value text-body-secondary">{{ recordData.dateOut }}</p>
							</div>
							<div class="col">
								<p>Решения о включении</p>
								<ul class="value list-group">
									<li class="list-group-item">Минюст: {{ recordData.decisionInMinjust }}</li>
									<li class="list-group-item">Генеральная прокуратура: {{ recordData.decisionInGenproc }}</li>
								</ul><br>
								<p>Решения об исключении</p>
								<ul class="value list-group">
									<li class="list-group-item">Минюст:</li>
									<li class="list-group-item">Генеральная прокуратура: {{ recordData.decisionOutGenproc }}</li>
								</ul>
								
							</div>
						</div>
					</div>
					<div class="noprint modal-footer">
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