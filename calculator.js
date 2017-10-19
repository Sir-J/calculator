function daysInMonth(year, monthNumber) {
    return 33 - new Date(year, monthNumber, 33).getDate();
};

function daysInYear(year) {
    return daysInMonth(year, 1) === 28 ? 365 : 366;
}

function monthPay(s, n) {
    return s / n;
}

function percents(s, p, year, month) {
    return s * (p / 100) * daysInMonth(year, month) / daysInYear(year);
}

function annuityPayment(s, n, p) {
    var p_n = (p / 100 / 12);

    return Math.round(s * (p_n + (p_n / (Math.pow((1 + p_n), n) - 1))));
}

function differentialPayment(s, n, p, year, month) {
    var mainPayment = monthPay(s, n);
    var payments = [];
    var startDate = new Date(year, month, 1);

    for (var i = 0; i < n; i++) {
        payments.push(Math.round(mainPayment + percents(s, p, year, month)));
        month++;
        if (month === 12) {
            month = 0;
            year++;
        }
        s -= mainPayment;
    }
    return payments;
}

function thousand(text) {
    if (text) {
        if (isNaN(parseInt(text)))
            return text;
        return text.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 ");
    }
    return "";
};

$(document).ready(function () {
    var months = [{ id: 0, name: "Январь" }, { id: 1, name: "Февраль" }, { id: 2, name: "Март" }, { id: 3, name: "Апрель" }, { id: 4, name: "Май" },
    { id: 5, name: "Июнь" }, { id: 6, name: "Июль" }, { id: 7, name: "Август" }, { id: 8, name: "Сентябрь" }, { id: 9, name: "Октябрь" },
    { id: 10, name: "Ноябрь" }, { id: 11, name: "Декабрь" }];

    var currencies = [{ id: 0, name: 'руб' }, { id: 1, name: '\u20AC' }, { id: 2, name: '$' }];
    var regexFloat = new RegExp(/(^[0-9]{0,2})+(\.[0-9]{0,2}){0,1}$/g);
    var regexNumber = new RegExp(/^\d+$/);
    var specialKeys = ['Backspace', 'Tab', 'End', 'Home', 'Delete', 'ArrowLeft', 'ArrowRight'];
    var calcValue = 0;
    var years = [];
    var currentYear = new Date().getFullYear();
    var idx = 0;
    while (idx < 5) {
        years.push({
            id: currentYear + idx,
            name: currentYear + idx
        });
        idx++;
    }

    $('#currencies').uiSelect({
        data: currencies,
        selectedId: 0,
        hasScroll: false
    });

    $('#months').uiSelect({
        data: months,
        selectedId: new Date().getMonth(),
        hasScroll: true
    });

    $('#years').uiSelect({
        data: years,
        selectedId: currentYear,
        hasScroll: false
    });

    var settingsAnnuity = {
        trigger: 'hover',
        content: '<p class="popover-content">При аннуитетном порядке погашения ежемесячные выплаты равны в течение всего срока кредитования</p>',
        width: '300px',
        multi: true,
        closeable: false,
        style: '',
        delay: 150,
        padding: true,
        backdrop: false
    };

    var settingsDifferential = Object.assign({}, settingsAnnuity);
    settingsDifferential.content = '<p class="popover-content">При дифференцированном порядке погашения ежемесячные выплаты уменьшаются в течение всего срока кредитования</>'

    $('.payment-type.annuity').webuiPopover(settingsAnnuity);
    $('.payment-type.differential').webuiPopover(settingsDifferential);

    //$('.payment-type').popover();

    var parseValue = function (e, regex) {
        if (specialKeys.indexOf(event.key) !== -1) {
            return;
        }
        var position = e.target.selectionEnd;
        const current = e.target.value.replace(" ", "");
        var next = '';
        if (current.length > 0) {
            next = [current.slice(0, position), e.key, current.slice(position)].join('');
        }
        else {
            next = current.concat(e.key);
        }

        if (next && !String(next).match(regex)) {
            event.preventDefault();
        }
    };

    $('.radio-button').click(function (e) {
        calcValue = parseInt($(e.target).attr("value"));
    });

    $("#sum").keydown(function (e) {
        parseValue(e, regexNumber);
    })
        .on("input", function (e) {
            if ($(e.target).hasClass('input-control_error')) {
                $(e.target).removeClass('input-control_error');
            }
        })
        .focus(function (e) {
            $("#sum").val($("#sum").val().replace(" ", ""));
        })
        .blur(function (e) {
            $("#sum").val(thousand($("#sum").val().replace(" ", "")));
        });

    $("#period").keydown(function (e) {
        parseValue(e, regexNumber);
    })
        .on("input", function (e) {
            if ($(e.target).hasClass('input-control_error')) {
                $(e.target).removeClass('input-control_error');
            }
        });

    $("#percent").keydown(function (e) {
        parseValue(e, regexFloat);
    })
        .on("input", function (e) {
            if ($(e.target).hasClass('input-control_error')) {
                $(e.target).removeClass('input-control_error');
            }
        });

    $('.calc-button').click(function () {
        $('.result-content').hide();
        var valid = true;
        var sum = parseInt($("#sum").val().replace(" ", ""));
        if (!sum) {
            $("#sum").addClass("input-control_error");
            valid = false;
        }
        var percent = parseFloat($("#percent").val().replace(" ", "").replace(',', '.'));
        if (!percent) {
            $("#percent").addClass("input-control_error");
            valid = false;
        }
        else {
            if (percent > 100) {
                $("#percent").addClass("input-control_error");
                valid = false;
            }
        }

        var period = parseInt($("#period").val().replace(" ", ""));
        if (!period) {
            $("#period").addClass("input-control_error");
            valid = false;
        } else {
            if (period > 600) {
                $("#period").addClass("input-control_error");
                valid = false;
            }
        }

        if (!valid)
            return false;

        var currency = $("#currencies").uiSelect("getValue");
        var month = $("#months").uiSelect("getValue");
        var year = $("#years").uiSelect("getValue");
        var endYear = year.id + Math.floor(period / 12);
        var endMonth = (month.id + 1) + (period - Math.floor(period / 12) * 12);
        if (endMonth > 12) {
            endYear += 1;
            endMonth -= 12;
        }
        var monthPay = '';
        var overpay = '';
        var fullPayments = '';
        if (calcValue == 0) {
            var val = annuityPayment(sum, period, percent)
            monthPay = `${val} ${currency.name}`;
            overpay = `${(val * period) - sum}  ${currency.name}`;
            fullPayments = `${(val * period)} ${currency.name}`;
            $('.payment-type-text').text('Ежемесячный платёж');
        } else {
            var payments = differentialPayment(sum, period, percent, year.id, month.id);
            var total = payments.reduce((a, b) => a + b, 0);
            monthPay = `${payments[0]} ${currency.name}`;
            overpay = `${total - sum}  ${currency.name}`;
            fullPayments = `${total} ${currency.name}`;
            $('.payment-type-text').text('Размер первого платежа');
        }
        $(".month-pay").text(monthPay);
        $(".overpay").text(overpay);
        $(".full-payments").text(fullPayments);
        $(".end-pay").text(`01.${endMonth < 10 ? '0' + (endMonth) : endMonth}.${endYear}`);

        $('.result-content').show();
    });
});