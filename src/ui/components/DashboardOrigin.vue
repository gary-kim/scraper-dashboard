<template>
    <div class="card">
        <h3>{{ associatedFeed }} | {{ time }}</h3>
        <div>{{ current.data }}</div>
    </div>
</template>

<script>
    import * as helpers from '../../js/helpers';

    export default {
        name: "DashboardOrigin",

    }
</script>

<style lang="less" scoped>
    .card {
        padding: 10px;
        background-color: #FFFFFF;
        box-shadow: 2px 2px 0px 0px #52BFB9;
        border: 1px solid #52BFB9;
        background: rgba(255, 255, 255, 0.75);
        border-radius: 10px;
        margin-top: 10px;
    }
</style>
