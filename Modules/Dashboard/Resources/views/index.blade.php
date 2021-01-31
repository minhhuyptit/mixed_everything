@extends('layouts.master')

@section('content')
<div id="dashboard-app">
    <app></app>
</div>
<script src="{{ mix('/modules/dashboard/assets/js/dashboard.js') }}"></script>
@endsection