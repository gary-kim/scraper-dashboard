<template>
    <div class="dashboard-wrapper">
        <span slot="header" class="max-adjust-buttons">
            <md-button class="md-icon-button" @click="adjustDashboardMax(1)">
                <md-icon>add</md-icon>
            </md-button>
            <md-button class="md-icon-button" @click="adjustDashboardMax(-1)">
                <md-icon>remove</md-icon>
            </md-button>
        </span>
        <Draggable v-model="options" class="draggable-flex" animation="100" draggable=".feed-event" filter=".feed-text" :preventOnFilter="false">
            <FeedEvent v-for="e in options" :key="e.id" :current="getLatest(e)" :feed="e" class="feed-event" :style="{width: width}" :dashboard-mode="true" />
        </Draggable>
    </div>
</template>

<script>
import FeedEvent from "./FeedEvent";
import Draggable from "vuedraggable";
import * as helpers from "../../js/helpers";
export default {
    name: "DashboardInterface",
    components: {
        FeedEvent,
        Draggable
    },
    data() {
        return {
            feed: helpers.feed
        }
    },
    computed: {
        options: {
            get() {
                return this.feed.options
            },
            set(e) {
                helpers.setFeedOptions(JSON.parse(JSON.stringify(e)));
            }
        },
        width() {
            return `${(100 / this.feed.settings.dashboardMax) - 3}%`;
        }
    },
    methods: {
        getLatest(feedOption) {
            return this.feed.latestData[feedOption.id] || { };
        },
        adjustDashboardMax(val) {
            helpers.setDashboardMax(this.feed.settings.dashboardMax + val);
        }
    }
}
</script>

<style lang="less" scoped>
.draggable-flex {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    // justify-content: space-around;
    justify-content: left;
}
.max-adjust-buttons {
    display: inherit;
    * {
        align-self: center;
        margin: 0;
    }
}
</style>
