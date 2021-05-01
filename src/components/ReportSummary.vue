<template>
  <div class="mt-5">
    <b-jumbotron class="mb-4">
      <b-row class="mb-3">
        <label for="search" class="mr-3">Mata in vårdgivare namn:</label>
        <input type="text" id="search" v-model="search" />
      </b-row>
      <b-row>
        <b-form-checkbox
          id="showDeliveryReports"
          class="ml-3"
          v-model="showDeliveryReports"
        >
          Inleverans
        </b-form-checkbox>
        <b-form-checkbox
          id="showInventoryReports"
          class="ml-3"
          v-model="showInventoryReports"
        >
          Lagersaldo
        </b-form-checkbox>
      </b-row>
    </b-jumbotron>
    <div class="summary-report">
      <b-table
        v-show="ReportList.length > 0 && showDeliveryReports"
        striped
        bordered
        :fields="DeliveryReportTableFields"
        :items="ReportList"
        caption-top
      >
        <template #table-caption
          ><span class="caption-font">Inleverans rapport</span></template
        >
      </b-table>
      <b-table
        v-show="InventoryReportList.length > 0 && showInventoryReports"
        striped
        bordered
        :fields="InventoryReportTableFields"
        :items="InventoryReportList"
        caption-top
      >
        <template #table-caption
          ><span class="caption-font">
            Lagersaldo
          </span></template
        >
      </b-table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  deliveryReportTableObj,
  InventoryReportTableObj,
} from "../Utils/functions.js";
import {
  DELIVERY_REPORT_FIELDS,
  INVENTORY_REPORT_FIELDS,
} from "../Utils/constant.js";

export default {
  name: "ReportSummary",
  data: () => ({
    DeliveryReportTableFields: DELIVERY_REPORT_FIELDS,
    InventoryReportTableFields: INVENTORY_REPORT_FIELDS,
    search: "",
    showDeliveryReports: false,
    showInventoryReports: false,
    showCapacityReports: false,
    showConsumptionsReport: false,
    showOrderReport: false,
  }),
  computed: {
    ...mapState(["vaccinesDeliverReport", "inventoryReport"]),
    ReportList() {
      const reports = [];
      this.vaccinesDeliverReport.forEach((r) => {
        reports.push(deliveryReportTableObj(r));
      });
      if (this.search.length === 0) return reports;
      else
        return reports.filter((x) =>
          x.healthcareProvider.includes(this.search)
        );
    },
    InventoryReportList() {
      const reports = [];
      this.inventoryReport.forEach((r) => {
        reports.push(InventoryReportTableObj(r));
      });
      if (this.search.length === 0) return reports;
      else
        return reports.filter((x) =>
          x.healthcareProvider.includes(this.search)
        );
    },
  },
};
</script>

<style scoped>
.form-check-input {
  margin-left: 0;
}
.row {
  margin: 0;
}
.form-check-label {
  margin-left: 1.5rem;
}
.summary-report {
  padding-bottom: 55px;
}
.caption-font {
  color: black !important;
  font-size: 20px !important;
}
</style>
