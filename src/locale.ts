export default {
    search: {
        placeholder: "Поиск..."
    },
    sort: {
        sortAsc: "Сортировка по возрастанию",
        sortDesc: "Сортировка по убыванию"
    },
    pagination: {
        previous: "Назад",
        next: "Вперед",
        navigate: function(e: string | number, r: string | number) {
            return "Страница " + e + " из " + r
        },
        page: function(e: string | number) {
            return "Страница " + e
        },
        showing: "Отображение с",
        of: "из",
        to: "по",
        results: "записей"
    },
    loading: "Загрузка...",
    noRecordsFound: "Не найдено подходящих записей",
    error: "Ошибка при загрузке данных"
}