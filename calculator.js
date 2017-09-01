$(document).ready(function () {
    var months = [{id:0,name:"Январь"},{id:1,name:"Февраль"},{id:2,name:"Март"},{id:3,name:"Апрель"},{id:4,name:"Май"},
                    {id:5,name:"Июнь"},{id:6,name:"Июль"},{id:7,name:"Август"},{id:8,name:"Сентябрь"},{id:9,name:"Октябрь"},
                    {id:10,name:"Ноябрь"},{id:11,name:"Декабрь"}];

    var currencies = [{ id: 0, name: 'руб' }, { id: 1, name: '\u20AC' }, { id: 2, name: '$' }];

    var years = [];
    var currentYear = new Date().getFullYear();
    var idx = 0;
    while(idx < 5){
        years.push({
            id: currentYear + idx,
            name: currentYear + idx
        });
        idx++;
    }

    $('#months').uiSelect({
        data: months,
        selectedId: 7,
        hasScroll: true
    });

    $('#years').uiSelect({
        data: years,
        selectedId: currentYear,
        hasScroll: false
    });

    $('#currency').uiSelect({
        data: currencies,
        selectedId: 0,
        hasScroll: false
    });

    $('.payment-type').popover();
});