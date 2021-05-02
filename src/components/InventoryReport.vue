<template>
  <div>
    <h3>Rapporteras in inleverans</h3>
    <div class="row m-0" v-if="!show">
      <b-button variant="outline-primary" @click="showForm()"
        >Skapa report</b-button
      >
    </div>
    <div class="row m-0" v-if="show">
      <b-card bg-variant="light">
        <b-form @submit="onSubmit" @reset="onReset">
          <b-form-group
            label="Datum:"
            label-for="date"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-input
              id="date"
              v-model="inventoryReportData.InventoryUpdateDate"
              type="date"
            />
          </b-form-group>

          <b-form-group
            label="VaccineLeverantör:"
            label-for="VaccineSupplier"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-select
              id="VaccineSupplier"
              v-model="inventoryReportData.VaccineSupplier"
              :options="suppliers"
            ></b-form-select>
          </b-form-group>

          <b-form-group
            label="Kvantitet vial:"
            label-for="quantity"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-input
              id="quantity"
              v-model="inventoryReportData.QuantityVial"
              type="number"
              min="0"
            />
          </b-form-group>
          <b-form-group
            label="Kvantitet Dos"
            label-for="QuantityDose"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-input
              id="QuantityDose"
              v-model="inventoryReportData.QuantityDose"
              min="0"
              type="number"
            />
          </b-form-group>
          <b-form-group
            label="Vårdgivare:"
            label-for="healthCareProvider"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-select
              id="healthCareProvider"
              v-model="inventoryReportData.healthCareProvider"
              required
              :options="healtCareList"
            ></b-form-select>
          </b-form-group>

          <b-button type="submit" variant="outline-primary" class="mr-3"
            >Spara</b-button
          >
          <b-button type="reset" variant="outline-secondary">Rensa</b-button>
        </b-form>
      </b-card>
    </div>
    <div class="row m-0 mt-5" v-show="!show && InventoryReportList.length > 0">
      <b-table
        striped
        bordered
        :fields="inventoryTableFields"
        :items="InventoryReportList"
      ></b-table>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import axios from "axios";
import { InventoryReportTableObj } from "../Utils/functions.js";
import { INVENTORY_REPORT_FIELDS } from "../Utils/constant.js";
import config from "../../config/default";

export default {
  name: "ReportSummary",
  data: () => ({
    inventoryReportData: {
      inventoryReportData: "",
      VaccineSupplier: "",
      QuantityVial: "",
      QuantityDose: "",
      healthCareProvider: "",
    },
    show: false,
  }),

  computed: {
    ...mapState(["inventoryReport"]),
    ...mapGetters(["suppliersList", "healthCareProvidersList"]),
    InventoryReportList() {
      const reports = [];
      this.inventoryReport.forEach((r) => {
        reports.push(InventoryReportTableObj(r));
      });
      return reports;
    },
    suppliers() {
      return this.suppliersList;
    },
    healtCareList() {
      return this.healthCareProvidersList;
    },
    inventoryTableFields() {
      return INVENTORY_REPORT_FIELDS.filter(
        (x) => x.key !== "healthcareProvider"
      );
    },
  },
  methods: {
    ...mapActions(["fetchInventoryReportList"]),
    showForm() {
      this.show = !this.show;
    },
    async onSubmit(event) {
      event.preventDefault();
      this.show = false;
      await axios
        .post(config.resource_api_inventory, this.inventoryReportData)
        .then((res) => {
          if (res.status === 201) {
            this.cleanFieldsInput();
            this.fetchInventoryReportList();
          } else console.log("i am status failed");
          console.log(
            `res.status: ${res.status}, res.statusText: ${res.statusText}`
          );
        })
        .catch((error) => {
          console.log("i am catch");
          console.log(`Error: ${error}`);
        });
    },
    onReset(event) {
      event.preventDefault();
      this.cleanFieldsInput();
      this.$nextTick(() => {
        this.show = true;
      });
    },
    cleanFieldsInput() {
      this.inventoryReportData.inventoryReportData = "";
      this.inventoryReportData.VaccineSupplier = "";
      this.inventoryReportData.QuantityVial = "";
      this.inventoryReportData.QuantityDose = "";
      this.inventoryReportData.healthCareProvider = "";
    },
  },
};
</script>

<style scoped>
.card {
  min-width: 85%;
}
h3 {
  text-align: left;
  margin-top: 3rem;
  margin-bottom: 1rem;
}
.btn-outline-primary {
  float: right;
  color: black;
  border-color: #00aeef;
}
.btn-outline-secondary {
  float: right;
  margin-right: 1rem;
}
</style>
