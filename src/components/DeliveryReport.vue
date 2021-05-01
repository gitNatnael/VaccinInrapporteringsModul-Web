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
            label="Leverans datum:"
            label-for="delivery-date"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-input
              id="delivery-date"
              v-model="deliverReportData.deliveryDate"
              type="date"
            />
          </b-form-group>

          <b-form-group
            label="Planerat lev datum:"
            label-for="scheduled-date"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-datepicker
              id="scheduled-date"
              v-model="deliverReportData.scheduledDeliveryDate"
              today-button
              reset-button
              close-button
              locale="sv"
            />
          </b-form-group>

          <b-form-group
            label="VaccineLeverantör:"
            label-for="nested-state"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-select
              v-model="deliverReportData.vaccineSupplier"
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
              id="nquantity"
              v-model="deliverReportData.quantityVial"
              min="0"
              type="number"
            />
          </b-form-group>
          <b-form-group
            label="GLN-mottagre:"
            label-for="gln"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-input
              id="gln"
              v-model="deliverReportData.gln"
              type="text"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="Vårdgivare:"
            label-for="nested-state"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-select
              v-model="deliverReportData.healthCareProvider"
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
    <div class="row m-0 mt-5" v-show="!show && ReportList.length > 0">
      <b-table
        striped
        bordered
        :fields="deliveryReportTableFields"
        :items="ReportList"
      ></b-table>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import axios from "axios";
import { deliveryReportTableObj } from "../Utils/functions.js";
import { DELIVERY_REPORT_FIELDS } from "../Utils/constant.js";
import config from "../../config/default";
export default {
  name: "ReportSummary",
  data: () => ({
    deliverReportData: {
      deliveryDate: "",
      scheduledDeliveryDate: "",
      vaccineSupplier: "",
      quantityVial: "",
      gln: "",
      healthCareProvider: "",
    },
    show: false,
  }),
  computed: {
    ...mapState(["vaccinesDeliverReport"]),
    ...mapGetters(["suppliersList", "healthCareProvidersList"]),
    ReportList() {
      const reports = [];
      this.vaccinesDeliverReport.forEach((r) => {
        reports.push(deliveryReportTableObj(r));
      });
      return reports;
    },
    suppliers() {
      return this.suppliersList;
    },
    healtCareList() {
      return this.healthCareProvidersList;
    },
    deliveryReportTableFields() {
      return DELIVERY_REPORT_FIELDS.filter(
        (x) => x.key !== "healthcareProvider"
      );
    },
  },
  methods: {
    ...mapActions(["fetchVaccineDeliveryReport"]),
    showForm() {
      this.show = !this.show;
    },
    async onSubmit(event) {
      event.preventDefault();
      this.show = false;

      await axios
        .post(config.resource_api_delivery, this.deliverReportData)
        .then((res) => {
          if (res.status === 201) {
            this.fetchVaccineDeliveryReport();
            this.restFieldsInput();
          } else
            console.log(
              `res.status: ${res.status}, res.statusText: ${res.statusText}`
            );
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onReset(event) {
      event.preventDefault();
      this.restFieldsInput();
      this.$nextTick(() => {
        this.show = true;
      });
    },
    restFieldsInput() {
      this.deliverReportData.deliveryDate = "";
      this.deliverReportData.scheduledDeliveryDate = "";
      this.deliverReportData.vaccineSupplier = "";
      this.deliverReportData.quantityVial = "";
      this.deliverReportData.gln = "";
      this.deliverReportData.healthCareProvider = "";
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
