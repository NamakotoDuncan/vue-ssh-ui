<template>
    <b-container>
        <b-navbar type="dark" variant="info">
            <b-navbar-nav>
                <b-nav-item href="#">Home</b-nav-item>

                <!-- Navbar dropdowns -->
                <b-nav-item-dropdown text="Lang" right>
                    <b-dropdown-item href="#">EN</b-dropdown-item>
                    <b-dropdown-item href="#">ES</b-dropdown-item>
                </b-nav-item-dropdown>

                <b-nav-item-dropdown text="User" right>
                    <b-dropdown-item href="#">Account</b-dropdown-item>
                    <b-dropdown-item href="#">Settings</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-navbar>
        <b-row class="w-300">
            {{ cluster }}
            <div class="mt-3">
                <b-button-group>
                    <b-button variant="success">Configure</b-button>
                    <b-button variant="info">Load Balancer</b-button>
                    <b-button variant="warning">Statistics</b-button>
                </b-button-group>
            </div>

        </b-row>
        <b-row>
            <b-table striped bordered foot-clone small hover head-variant="dark" responsive caption-top
                :tbody-transition-props="transProps" :items="clusterNodes" :fields="nodeFields"
                @row-clicked="onClusterRowClicked">
                <template #table-caption>Nodes in cluster count {{ clusterNodes.length }}.</template>

                <template #cell(actions)="row">
                    <!-- <b-btn size="sm" variant="outline-dark">View</b-btn> -->
                    <b-dropdown  variant="outline-dark" text="Node Actions">
                        <b-dropdown-item>Statts</b-dropdown-item>
                        <b-dropdown-item>Remove from cluster</b-dropdown-item>
                    </b-dropdown>

                </template>
            </b-table>
        </b-row>
    </b-container>
</template>
<script>
import axios from 'axios';
const instance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Headers': 'Authorization'
    }
});
export default {
    name: 'ClusterDetails',
    beforeRouteEnter: (to, from, next) => {
        next(vm => {
            const { clusterId } = vm.$root.$route.params;
            if (clusterId) {
                next();
            } else next('/home');
        });
    },
    props: {
        clusterId: {
            type: String,
            default: ''
        },
    },
    data() {
        return {
            cluster: {},
            clusterNodes: [],
            nodeFields: [
                {
                    key: 'id',
                    sortable: true,
                    label: 'SN',
                },
                {
                    key: 'wsrep_node_name',
                    sortable: true,
                    label: 'WSREP Name',
                },
                {
                    key: 'wsrep_node_address',
                    sortable: false,
                    label: 'IP Address',
                },
                'actions'
                // cluster_id,wsrep_node_name,wsrep_node_address
            ],
        }
    },
    mounted() {
        this.fetchClusterDetails();
    },
    methods: {
        getNodes() {
            this.clusterNodes = [];
            instance.get(`/get-cluster-nodes/${this.clusterId}`)
                .then(response => {
                    // Handle the response
                    this.clusterNodes = response.data.nodes;
                })
                .catch(error => {
                    // Handle errors
                    this.reqError = error;
                });
        },
        fetchClusterDetails() {
            this.cluster = {};
            instance.get(`/get-cluster-details/${this.clusterId}`)
                .then(response => {
                    this.cluster = response.data.cluster;
                    this.getNodes();
                })
                .catch(error => {
                    // Handle errors
                    this.reqError = error;
                });
        }
    }
}
</script>