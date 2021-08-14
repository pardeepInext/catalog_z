<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Catalog-z</title>
    <meta name="csrf" content="{{ csrf_token() }}">
    <meta name="asset" content="{{ asset('/') }}">
    <link rel="icon" href="{{ asset('assets/favicon.ico') }}">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/templatemo-style.css') }}">
</head>

<body>
    <div id="root"></div>
    <script src="{{ asset('js/app.js') }}"></script>
</body>

</html>
