<!-- eslint-disable no-console -->
<!-- eslint-disable vue/valid-template-root -->
<!-- eslint-disable vue/no-parsing-error -->
<!-- eslint-disable  -->
<template>
    <div>
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
                <b-col cols="4">
                    <b-row align-h="between" style="margin: 4px;">
                        <h4> Clusters</h4> <b-button @click="addCluster()" v-b-modal.modal-add-cluster> Add
                            Cluster</b-button>
                        <b-modal variant="dark" id="modal-add-cluster" title="New Cluster" button-size="lg"
                            @ok="addCluster" @show="clearClustername">
                            <b-form-group id="fieldset-1" description="Cluster Name." label="Enter cluster name"
                                label-for="cluster-name-input" valid-feedback="Thank you!"
                                :invalid-feedback="invalidCNFeedback" :state="clusterNameState">
                                <b-form-input id="cluster-name-input" v-model="clusterName" required></b-form-input>
                            </b-form-group>
                            <!-- <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close</b-button> -->
                            <!-- <b-button class="mt-2" variant="outline-info" block @click="toggleModal">Save</b-button> -->
                        </b-modal>
                    </b-row>
                    <b-row style="margin: 4px;">
                        <b-table striped bordered foot-clone small hover head-variant="dark" responsive caption-top
                            :tbody-transition-props="transProps" :items="clusters" :fields="clusterFields"
                            @row-clicked="onClusterRowClicked">
                            <template #table-caption>Clusters Deployed {{ clusters.length }}.</template>
                            <template #cell(actions)="row">
                                <b-btn size="sm" variant="outline-dark" @click="viewCluster(row.item)">View</b-btn>
                            </template>
                        </b-table>
                    </b-row>
                </b-col>


                <b-col cols="8">
                    <b-row align-h="between">
                        <h4> Nodes</h4> <b-button v-if="currentClusterId" v-b-modal.modal-add-cluster-node> Add Node to
                            {{ currentClusterId }}</b-button>
                        <b-modal variant="dark" id="modal-add-cluster-node" title="Add Node to Cluster" button-size="lg"
                            @ok="createNode" @show="clearNodeNames">
                            <b-form-group id="fieldset-2" description="Node Name." label="Enter Node name"
                                label-for="node-name-input" valid-feedback="Thank you!"
                                :invalid-feedback="invalidCNFeedback" :state="nodeNameState">
                                <b-form-input id="node-name-input" v-model="nodeName" required></b-form-input>
                            </b-form-group>
                            <b-form-group id="fieldset-3" description="Node IP." label="Enter Node IP"
                                label-for="node-address-input" valid-feedback="Thank you!"
                                :invalid-feedback="invalidCNFeedback" :state="IpState">
                                <b-form-input id="node-address-input" v-model="nodeAddress" required></b-form-input>
                            </b-form-group>
                            <!-- <p class="my-4">Add Node Details</p> -->
                        </b-modal>
                    </b-row>
                    <b-row>
                        <b-table striped bordered foot-clone small hover head-variant="dark" responsive caption-top
                            :tbody-transition-props="transProps" :items="clusterNodes" :fields="nodeFields"
                            @row-clicked="onClusterRowClicked">
                            <template #table-caption>Nodes in cluster count {{ clusterNodes.length }}.</template>

                            <template #cell(actions)="row">
                                <b-btn size="sm" variant="outline-dark">View</b-btn>
                            </template>
                        </b-table>
                    </b-row>
                </b-col>
            </b-row>
        </b-container>
    </div>

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
    name: 'Home',
    data() {
        return {
            clusters: [],
            reqError: '',
            currentClusterId: '',
            clusterNodes: [],
            clusterName: '',
            nodeAddress: '',
            nodeName: '',
            clusterFields: [{
                key: 'id',
                sortable: true,
                label: 'SN',
            },
            {
                key: 'name',
                label: 'Name',
                sortable: true
            },
                'actions'
            ],
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
            transProps: {
                // Transition name
                name: 'flip-list'
            },
        }
    },
    computed: {
        clusterNameState() {
            return this.nodeName.clusterName < 4
        },
        nodeNameState() {
            return this.nodeName.length < 4
        },
        IpState() {
            return this.nodeAddress.length < 4;
        },
        invalidCNFeedback() {
            if (this.clusterName.length > 0) {
                return 'Enter at least 4 characters.'
            }
            return 'This field is mandatory.'
        }
    },
    mounted() {
        // alert('mounted');
        this.getClusters();
    },
    methods: {
        viewCluster(item) {
            this.$root.$router.push({
                path: `/cluster-details/${item.id}`
            });
        },
        clearNodeNames() {
            this.nodeAddress = '';
            this.nodeName = '';
        },
        clearClustername() {
            this.clusterName = '';
        },
        onClusterRowClicked(item, index, event) {
            // alert(item)
            this.currentClusterId = item.id;
            this.getNodes();
        },
        getClusters() {
            this.clusters = [];
            instance.get('/get-cluster')
                .then(response => {
                    // Handle the response
                    // alert(JSON.stringify(response));
                    this.clusters = response.data.clusters
                })
                .catch(error => {
                    // Handle errors
                    this.reqError = error;
                });
        },
        addCluster() {
            instance.post('/create-cluster', { "name": this.clusterName })
                .then(response => {
                    // Handle the response
                    this.clusters.push(response);
                    this.clusterName = '';
                })
                .catch(error => {
                    // Handle errors
                    this.reqError = error;
                });
        },
        getNodes() {
            instance.get(`/get-cluster-nodes/${this.currentClusterId}`)
                .then(response => {
                    // Handle the response
                    this.clusterNodes = response.data.nodes;
                })
                .catch(error => {
                    // Handle errors
                    this.reqError = error;
                });
        },
        createNode() {
            let wsrepNodeName = this.nodeName;
            let wsrepNodeAddress = this.nodeAddress;
            instance.post(`/add-node/${this.currentClusterId}`, { wsrepNodeName, wsrepNodeAddress })
                .then(response => {
                    // Handle the response
                    // this.clusterNodes.push(response);
                    this.nodeAddress = '';
                    this.nodeName = '';
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
<style scoped>
table#table-transition-example .flip-list-move {
    transition: transform 1s;
}
</style>