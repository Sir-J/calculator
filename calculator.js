$(document).ready(function () {
    var months = [{
        id: 0,
        name: 'Январь'
    },
    {
        id: 1,
        name: 'Февраль'
    },
    {
        id: 2,
        name: 'Март'
    },
    {
        id: 3,
        name: 'Апрель'
    },
    {
        id: 4,
        name: 'Май'
    },
    {
        id: 5,
        name: 'Июнь'
    },
    {
        id: 6,
        name: 'Июль'
    },
    {
        id: 7,
        name: 'Август'
    },
    {
        id: 8,
        name: 'Сентябрь'
    },
    {
        id: 9,
        name: 'Октябрь'
    },
    {
        id: 10,
        name: 'Ноябрь'
    },
    {
        id: 11,
        name: 'Декабрь'
    }
    ];


    $('#months').uiSelect({
        data: months,
        selectedId: 7
    });
});