@extends('layouts.master')

@section('content')
<div id="dashboard-app">
    <app></app>

    <script src="{{ mix('/modules/dashboard/assets/js/index.js') }}"></script>
</div>
@endsection