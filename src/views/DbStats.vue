<template>
    <!--   :tbody-transition-props="transProps" -->
    <!--  striped bordered foot-clone small hover head-variant="dark" responsive caption-top -->
    <!-- <b-table striped bordered hover head-variant="dark" small responsive :items="globalVariables"
                        :fields="globalFields">
                        <template #cell(Variable_name)="row">
                            {{ row.item.Variable_name.trim() }}
                        </template>
<template #cell(Value)="row">
                            {{ row.item.Value.trim() }}
                        </template>
</b-table> --> 
    <div>
        <b-container style="max-width: fit-content;">
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
            <!-- {{  globalVariables }} -->
            <b-modal id="modal-creds" centered title="Enter Credentials" @ok="fetchGlobalvariables">
                <b-form-input v-model="user" placeholder="Enter Db User"></b-form-input>
                <b-form-input v-model="password" type="password"  placeholder="Enter Db Password"></b-form-input>  
            </b-modal>
            <b-row align-h="between" style="margin: 4px;">
                <b-tabs content-class="mt-3" justified>
                    <b-tab title="globalVariables">
                        <b-row>
                            <b-col cols="6">
                                <table class="table table-striped table-bordered thead-dark table-striped ">
                                    <thead>
                                        <th>Variable</th>
                                        <th style="width:20%">Value</th>
                                    </thead>
                                    <tr v-for="Variable in globalVariables" :key="Variable.Variable_name">
                                        <!-- <td>{{ refillrefills.name }}</td> -->
                                        <td><span>{{ Variable.Variable_name }}</span> </td>
                                        <td style="width: 25%">{{ Variable.Value }}</td>
                                    </tr>

                                </table>
                            </b-col>
                        </b-row>
                    </b-tab>
                    <b-tab title="globalStatus">
                        <b-row>
                            <b-col cols="6">
                                <table class="table table-striped table-bordered thead-dark table-striped ">
                                    <thead>
                                        <th>Variable</th>
                                        <th style="width:20%">Value</th>
                                    </thead>
                                    <tr v-for="Variable in globalStatus" :key="Variable.Variable_name">
                                        <!-- <td>{{ refillrefills.name }}</td> -->
                                        <td><span>{{ Variable.Variable_name }}</span> </td>
                                        <td style="width: 25%">{{ Variable.Value }}</td>
                                    </tr>

                                </table>
                            </b-col>
                        </b-row>
                    </b-tab>

                    <b-tab title="tableStatus">
                        <b-row>
                            <b-col>

                                <b-table striped bordered hover head-variant="dark" small responsive
                                    :items="tableStatus">

                                </b-table>
                                <!-- <table class="table table-striped table-bordered thead-dark table-striped ">
                                    <thead>
                                        <th>Variable</th>
                                        <th style="width:20%">Value</th>
                                    </thead>
                                    <tr v-for="Variable in globalVariables" :key="Variable.Variable_name">
                                        <td><span>{{ Variable.Variable_name }}</span> </td>
                                        <td style="width: 25%">{{ Variable.Value }}</td>
                                    </tr>

                                </table> -->
                            </b-col>
                        </b-row>
                    </b-tab>

                    <b-tab title="functionStatus">
                        <b-row>
                            <b-col cols="6">
                                <b-table striped bordered hover head-variant="dark" small responsive
                                    :items="functionStatus">

                                </b-table>
                                <!-- <table class="table table-striped table-bordered thead-dark table-striped ">
                                    <thead>
                                        <th>Variable</th>
                                        <th style="width:20%">Value</th>
                                    </thead>
                                    <tr v-for="Variable in globalVariables" :key="Variable.Variable_name">
                                        <td><span>{{ Variable.Variable_name }}</span> </td>
                                        <td style="width: 25%">{{ Variable.Value }}</td>
                                    </tr>

                                </table> -->
                            </b-col>
                        </b-row>
                    </b-tab>

                    <b-tab title="procedureStatus">
                        <b-row>
                            <b-col cols="6">
                                <b-table striped bordered hover head-variant="dark" small responsive
                                    :items="procedureStatus">

                                </b-table>
                                <!-- <table class="table table-striped table-bordered thead-dark table-striped ">
                                    <thead>
                                        <th>Variable</th>
                                        <th style="width:20%">Value</th>
                                    </thead>
                                    <tr v-for="Variable in globalVariables" :key="Variable.Variable_name">
                                        <td><span>{{ Variable.Variable_name }}</span> </td>
                                        <td style="width: 25%">{{ Variable.Value }}</td>
                                    </tr>

                                </table> -->
                            </b-col>
                        </b-row>
                    </b-tab>

                    <b-tab title="triggersStatus">
                        <b-row>
                            <b-col cols="6">
                                <b-table striped bordered hover head-variant="dark" small responsive
                                    :items="triggersStatus">

                                </b-table>
                                <!-- <table class="table table-striped table-bordered thead-dark table-striped ">
                                    <thead>
                                        <th>Variable</th>
                                        <th style="width:20%">Value</th>
                                    </thead>
                                    <tr v-for="Variable in globalVariables" :key="Variable.Variable_name">
                                        <td><span>{{ Variable.Variable_name }}</span> </td>
                                        <td style="width: 25%">{{ Variable.Value }}</td>
                                    </tr>

                                </table> -->
                            </b-col>
                        </b-row>
                    </b-tab>
                    <b-tab title="processList">
                        <b-row>
                            <b-col>
                                <b-table striped bordered hover head-variant="dark" small responsive
                                    :items="processList">

                                </b-table>
                                <!-- <table class="table table-striped table-bordered thead-dark table-striped ">
                                    <thead>
                                        <th>Variable</th>
                                        <th style="width:20%">Value</th>
                                    </thead>
                                    <tr v-for="Variable in globalVariables" :key="Variable.Variable_name">
                                        <td><span>{{ Variable.Variable_name }}</span> </td>
                                        <td style="width: 25%">{{ Variable.Value }}</td>
                                    </tr>

                                </table> -->
                            </b-col>
                        </b-row>
                    </b-tab>
                </b-tabs>

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
    name: "DbStats",
    beforeRouteEnter: (to, from, next) => {
        next(vm => {
            const { clusterId, dbId } = vm.$root.$route.params;
            if (clusterId && dbId) {
                next();
            } else next('/home');
        });
    },
    props: {
        clusterId: {
            type: String,
            default: ''
        },
        dbId: {
            type: String,
            default: ''
        },
    },
    data() {
        return {
            globalVariables: [],
            processList: [],
            triggersStatus: [],
            procedureStatus: [],
            functionStatus: [],
            tableStatus: [],
            globalStatus: [],
            reqError: '',
            globalFields: [
                {
                    key: 'Variable_name',
                    sortable: true,
                    label: 'Variable',
                },
                {
                    key: 'Value',
                    sortable: true,
                    label: 'Value',
                },
            ],
            user:'_4e34275bedab93dc',
            password:'OE8llCeSwUypQAZW'
        }
    },
    mounted() {
        this.$bvModal.show('modal-creds');
        // if(this.user && this.password){
        // this.fetchGlobalvariables();
        // } else {
        //     this.$bvModal.show('modal-creds');
        // }
    },
    methods: {
        promptDbUsernamePwd(){},
        fetchGlobalvariables() {
            //prompt for db username/password
            this.clusterNodes = [];
            // ${this.clusterId}/${this.dbId  {user:this.user,password:this.password}
            instance.get(`/db-info?nodeId=${this.dbId}&user=${this.user}&password=${this.password}`)
                .then(response => {
                    // Handle the response
                    this.globalVariables = response.data.dbVariables.globalVariables;
                    this.globalStatus = response.data.dbVariables.globalStatus;
                    this.tableStatus = response.data.dbVariables.tableStatus;
                    this.functionStatus = response.data.dbVariables.functionStatus;
                    this.procedureStatus = response.data.dbVariables.procedureStatus;
                    this.triggersStatus = response.data.dbVariables.triggersStatus;
                    this.processList = response.data.dbVariables.processList;
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
table {
    table-layout: fixed;
    word-wrap: break-word;
}
</style>