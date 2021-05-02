<template>
  <div class="container">
    <b-tabs content-class="mt-3" justified>
      <b-tab title="Översikt" active><ReportSummary /> </b-tab>
      <b-tab title="Inleverans"><DeliveryReport /></b-tab>
      <b-tab title="Lagersaldo"><InventoryReport /> </b-tab>
      <b-tab title="Beställning"><Order /></b-tab>
      <b-tab title="Förbrukning"><Consumption /></b-tab>
      <b-tab title="Kapacitet"><Capacity /> </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ReportSummary from "../components/ReportSummary.vue";
import DeliveryReport from "../components/DeliveryReport.vue";
import InventoryReport from "../components/InventoryReport.vue";
import Consumption from "../components/Consumption.vue";
import Capacity from "../components/Capacity.vue";
import Order from "../components/Order.vue";
export default {
  name: "Home",
  components: {
    ReportSummary,
    DeliveryReport,
    InventoryReport,
    Consumption,
    Capacity,
    Order,
  },

  mounted() {
    this.fetchVaccineDeliveryReport();
    this.fetchHealthcareProviders();
    this.fetchInventoryReportList();
    this.fetchVaccineSuppliersList();
    this.fetchOrderReportList();
  },
  methods: {
    ...mapActions([
      "fetchVaccineDeliveryReport",
      "fetchHealthcareProviders",
      "fetchInventoryReportList",
      "fetchVaccineSuppliersList",
      "fetchOrderReportList",
    ]),
  },
};
</script>
<style scoped></style>
