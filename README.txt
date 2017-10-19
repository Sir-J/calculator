Подключение калькулятора.

1) Содержимое файла content.html скопировать на нужную страницу.

2) Скопировать папку font

3) Далее необходимо подключить следующие вещи:
    <link rel="stylesheet" href="ui-select.css">
    <link rel="stylesheet" href="popover.css">
	<link rel="stylesheet" href="font/custom-icon-font.css"> // - указать путь до папки font
    <link rel="stylesheet" href="styles.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script> // - если отсутствует на сайте
    <script src="popover.js"></script> // - если отсутствует на сайте
    <script src="scrollTo.min.js"></script>
    <script src="ui-select.js"></script>
    <script src="calculator.js"></script>