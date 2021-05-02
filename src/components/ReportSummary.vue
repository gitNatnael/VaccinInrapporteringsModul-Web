<template>
  <div class="mt-5">
    <b-jumbotron class="mb-4">
      <b-row class="mb-3">
        <label for="search" class="mr-3">Mata in vårdgivare namn:</label>
        <input type="text" id="search" v-model="search" />
      </b-row>
      <b-row>
        <!-- Delivery table -->
        <b-form-checkbox
          id="showDeliveryReports"
          class="ml-3"
          v-model="showDeliveryReports"
        >
          Inleverans
        </b-form-checkbox>
        <!-- Inventory table -->
        <b-form-checkbox
          id="showInventoryReports"
          class="ml-3"
          v-model="showInventoryReports"
        >
          Lagersaldo
        </b-form-checkbox>
        <!-- Order table -->
        <b-form-checkbox
          id="showOrderReport"
          class="ml-3"
          v-model="showOrderReport"
        >
          Beställning
        </b-form-checkbox>
      </b-row>
    </b-jumbotron>
    <div class="summary-report">
      <!-- Delivery table -->
      <b-table
        v-show="DeliveryReportList.length > 0 && showDeliveryReports"
        striped
        bordered
        :fields="DeliveryReportTableFields"
        :items="DeliveryReportList"
        caption-top
      >
        <template #table-caption
          ><span class="caption-font">Inleverans rapport</span></template
        >
      </b-table>
      <!-- Inventory table -->
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
      <!-- Order table -->
      <b-table
        v-show="OrderReportList.length > 0 && showOrderReport"
        striped
        bordered
        :fields="OrderReportTableFields"
        :items="OrderReportList"
        caption-top
      >
        <template #table-caption
          ><span class="caption-font">
            Beställning
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
  OrderReportTableObj,
} from "../Utils/functions.js";
import {
  DELIVERY_REPORT_FIELDS,
  INVENTORY_REPORT_FIELDS,
  ORDER_REPORT_FIELDS,
} from "../Utils/constant.js";

export default {
  name: "ReportSummary",
  data: () => ({
    search: "",
    showDeliveryReports: false,
    showInventoryReports: false,
    showOrderReport: false,
  }),
  computed: {
    ...mapState(["vaccinesDeliverReport", "inventoryReport", "orderReport"]),
    DeliveryReportList() {
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
    OrderReportList() {
      const reports = [];
      this.orderReport.forEach((r) => {
        reports.push(OrderReportTableObj(r));
      });
      if (this.search.length === 0) return reports;
      else
        return reports.filter((x) =>
          x.healthCareProvider.includes(this.search)
        );
    },
    DeliveryReportTableFields() {
      return DELIVERY_REPORT_FIELDS.filter((f) => f.key !== "gln");
    },
    InventoryReportTableFields() {
      return INVENTORY_REPORT_FIELDS.filter((f) => f.key !== "gln");
    },
    OrderReportTableFields() {
      return ORDER_REPORT_FIELDS.filter((f) => f.key !== "gln");
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
