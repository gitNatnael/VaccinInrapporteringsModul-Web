import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import cors from "cors";

Vue.use(Vuex);
Vue.use(cors);

const resource_api_delivery =
  "http://localhost:6565/api/v1/VaccineDeliveryReport";
const resource_api_suppliers = "http://localhost:6565/api/v1/VaccineSupplier";
const resource_api_healtcare_provider =
  "http://localhost:6565/api/v1/HealthCareProvider";

const resource_api_inventory = "http://localhost:6565/api/v1/InventoryReport";

const headers = { Accept: "application/json" };
export default new Vuex.Store({
  state: {
    vaccinesDeliverReport: [],
    vaccineSuppliers: [],
    healthCareProvider: [],
    inventoryReport: []
  },
  getters: {
    suppliersList: state => state.vaccineSuppliers.map(x => x.name),
    healthCareProvidersList: state => state.healthCareProvider.map(x => x.name)
  },
  mutations: {
    SET_DELIVERY_REPORT: (state, vaccineDeliveryReport) =>
      (state.vaccinesDeliverReport = vaccineDeliveryReport),
    SET_SUPPLIERS_LIST: (state, vaccineSuppliers) =>
      (state.vaccineSuppliers = vaccineSuppliers),
    SET_HEALTHCARE_PROVIDER: (state, healthCareProvider) =>
      (state.healthCareProvider = healthCareProvider),
    SET_INVENTORY_REPORT: (state, inventoryReport) =>
      (state.inventoryReport = inventoryReport)
  },
  actions: {
    async fetchInventoryReportList({ commit }) {
      await axios
        .get(resource_api_inventory, headers)
        .then(res => {
          commit("SET_INVENTORY_REPORT", res.data);
        })
        .catch(console.error());
    },
    async fetchVaccineDeliveryReport({ commit }) {
      await axios
        .get(resource_api_delivery, headers)
        .then(res => {
          commit("SET_DELIVERY_REPORT", res.data);
        })
        .catch(console.error());
    },
    async fetchVaccineSuppliersList({ commit }) {
      await axios
        .get(resource_api_suppliers, headers)
        .then(res => {
          commit("SET_SUPPLIERS_LIST", res.data);
        })
        .catch(console.error());
    },
    async fetchHealthcareProviders({ commit }) {
      await axios
        .get(resource_api_healtcare_provider, headers)
        .then(res => {
          commit("SET_HEALTHCARE_PROVIDER", res.data);
        })
        .catch(console.error());
    }
  },
  modules: {}
});
