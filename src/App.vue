<script setup lang="ts">
import logo from "./assets/logo.png"
</script>
<script lang="ts">
export default {
    watch: {
        $route: {
            immediate: true,
            handler(to) {
                document.title = to.meta.title || "Реестры Министерства юстиции"
            }
        }
    }
}
</script>

<template>
    <nav class="navbar bg-body-tertiary noprint">
        <div class="container-fluid">
            <span class="navbar-brand mb-0 h1"><img :src="logo" alt="Logo" width="30" height="30" class="d-inline-block align-text-top"> {{ $route.meta.title }}</span>
            <button v-if="$route.meta.reestr != ''" class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
            <div v-if="$route.meta.reestr != ''" class="collapse navbar-collapse" id="navbarNav">
                <ul v-if="$route.meta.reestr == 'inoagent'" class="navbar-nav">
                    <li class="nav-item"><RouterLink class="nav-link" to="/">Главная</RouterLink></li>
                    <li class="nav-item"><RouterLink class="nav-link" to="/stats">Статистика</RouterLink></li>
                </ul>
                <ul v-if="$route.meta.reestr == 'orgs'" class="navbar-nav">
                    <li class="nav-item"><RouterLink class="nav-link" to="/orgs">Главная</RouterLink></li>
                    <li class="nav-item"><RouterLink class="nav-link" to="/orgs/stats">Статистика</RouterLink></li>
                </ul>
                <ul v-if="$route.meta.reestr == 'fedsfm'" class="navbar-nav">
                    <li class="nav-item"><RouterLink class="nav-link" to="/fedsfm">Главная</RouterLink></li>
                    <li class="nav-item"><RouterLink class="nav-link" to="/fedsfm/stats">Статистика</RouterLink></li>
                </ul>
            </div>
        </div>
    </nav>
    <RouterView />
    <div class="container">
        <hr>
    </div>
    <footer class="py-4 py-md-5 bg-body-tertiary">
        <div class="container py-4 py-md-5 px-4 px-md-3 text-body-secondary">
            <div class="row">
                <div class="col-lg-3 mb-3">
                    <a class="d-inline-flex align-items-center mb-2 text-body-emphasis text-decoration-none">
                        <span class="fs-5">Проект "255-ФЗ"</span>
                    </a>
                    <ul class="list-unstyled small">
                        <li class="mb-2">Разработано <a class="noline" href="https://li0ard.rest" target="_blank">li0ard'ом</a> в 2023 году</li>
                        <li class="mb-2"><a href="https://yoomoney.ru/to/4100117876385180" target="_blank"><button class="btn specialbtn">Поддержать проект</button></a></li>
                    </ul>
                </div>
                <div class="col-6 col-lg-2 mb-3">
                    <h5>Сервисы</h5>
                    <ul class="list-unstyled">
                        <li class="mb-2"><RouterLink class="noline" to="/">Реестр иноагентов</RouterLink></li>
                        <li class="mb-2"><RouterLink class="noline" to="/orgs">Реестр нежелательных организаций</RouterLink></li>
                        <li class="mb-2"><RouterLink class="noline" to="/fedsfm">Реестр террористов и экстремистов</RouterLink></li>
                        <li class="mb-2"><RouterLink class="noline" to="/double">Люди с "двойным статусом"</RouterLink></li>
                    </ul>
                </div>
                <div class="col-6 col-lg-2 mb-3">
                    <h5>Источники</h5>
                    <ul class="list-unstyled">
                        <li class="mb-2"><a class="noline" href="https://minjust.gov.ru" target="_blank">Министерство юстиции</a></li>
                        <li class="mb-2"><a class="noline" href="https://t.me/bad_list_updates" target="_blank">Проект "Обновления перечня теppористов и экстpемистов"</a></li>
                    </ul>
                </div>
                <div class="col-6 col-lg-2 mb-3">
                    <h5>Ссылки</h5>
                    <ul class="list-unstyled">
                        <li class="mb-2"><a class="noline" href="https://t.me/inoagent_info" target="_blank">Telegram</a></li>
                        <li class="mb-2"><a class="noline" href="https://github.com/fz255" target="_blank">Github</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.noline {
    text-decoration: none;
}
.specialbtn {
    background: black;
    color: white;
    font-size: 16px;
    line-height: 24px;
    transition: 0.3s;
}
.specialbtn:hover {
    color: black;
    background: linear-gradient(68.94deg, #C3AAB2 -4.77%, #99EECC 46.72%, #80C0C8 90.23%, #4B8BFA 134.46%);
}
</style>
