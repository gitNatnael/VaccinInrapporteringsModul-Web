<template>
  <div>
    <h4 class="mb-3 mt-5">Beställning rapport</h4>
    <div class="row m-0" v-if="!show">
      <b-button variant="outline-primary" @click="showForm()"
        >Skapa Beställning rapport</b-button
      >
    </div>
    <div class="row m-0" v-if="show">
      <b-card bg-variant="light">
        <b-form @submit="onSubmit" @reset="onReset">
          <b-form-group
            label="Beställningdatum:"
            label-for="Order-date"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-input
              id="Order-date"
              v-model="Order.orderDate"
              required
              type="date"
            />
          </b-form-group>

          <b-form-group
            label="Önskat leve datum:"
            label-for="scheduled-date"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-datepicker
              id="scheduled-date"
              v-model="Order.deliveryDate"
              required
              today-button
              reset-button
              close-button
              locale="sv"
            />
          </b-form-group>

          <b-form-group
            label="Kvantitet dos:"
            label-for="quantity"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-input
              id="quantity"
              v-model="Order.quantityDos"
              required
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
              v-model="Order.gln"
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
              v-model="Order.healthCareProvider"
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
    <div class="row m-0 mt-5" v-show="!show && OrderList.length > 0">
      <b-table
        striped
        bordered
        :fields="orderReportTableFields"
        :items="OrderList"
      ></b-table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import { ORDER_REPORT_FIELDS } from "../Utils/constant.js";
import { OrderReportTableObj } from "../Utils/functions.js";
import axios from "axios";
import config from "../../config/default";
export default {
  name: "OrderReport",
  data: () => ({
    Order: {
      orderDate: "",
      deliveryDate: "",
      quantityDos: "",
      gln: "",
      healthCareProvider: "",
    },
    show: false,
  }),
  computed: {
    ...mapGetters(["suppliersList", "healthCareProvidersList"]),
    ...mapState(["orderReport"]),
    suppliers() {
      return this.suppliersList;
    },
    healtCareList() {
      return this.healthCareProvidersList;
    },
    orderReportTableFields() {
      return ORDER_REPORT_FIELDS.filter((x) => x.key !== "healthcareProvider");
    },
    OrderList() {
      const reports = [];
      this.orderReport.forEach((r) => {
        reports.push(OrderReportTableObj(r));
      });
      return reports;
    },
  },
  methods: {
    ...mapActions(["fetchOrderReportList"]),
    showForm() {
      this.show = !this.show;
    },
    async onSubmit(event) {
      event.preventDefault();
      await axios
        .post(config.resource_api_order, this.Order)
        .then((res) => {
          if (res.status === 201) {
            this.fetchOrderReportList();
            this.restFieldsInput();
          } else
            console.log(
              `res.status: ${res.status}, res.statusText: ${res.statusText}`
            );
        })
        .catch((error) => {
          console.log(error);
        });
      this.show = false;
    },
    onReset(event) {
      event.preventDefault();
      this.restFieldsInput();
      this.$nextTick(() => {
        this.show = true;
      });
    },
    restFieldsInput() {
      this.Order.orderDate = "";
      this.Order.deliveryDate = "";
      this.Order.quantityDos = "";
      this.Order.gln = "";
      this.Order.healthCareProvider = "";
    },
  },
};
</script>

<style></style>
