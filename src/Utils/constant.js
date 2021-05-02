const DELIVERY_REPORT_FIELDS = [
  {
    key: "healthcareProvider",
    label: "Vårdgivare Namn",
    sortable: true
  },
  {
    key: "deliveryDate",
    label: "Leverans Datum",
    sortable: true
  },
  {
    key: "scheduledDate",
    label: "Planerat lev datum"
  },
  {
    key: "supplier",
    label: "Vaccineleverantör ",
    sortable: true
  },
  {
    key: "quantity",
    label: "kvantitet vial"
  },
  {
    key: "gln",
    label: "GLN-mottagre"
  }
];
const INVENTORY_REPORT_FIELDS = [
  {
    key: "healthcareProvider",
    label: "Vårdgivare Namn",
    sortable: true
  },
  {
    key: "InventoryUpdateDate",
    label: "Datum"
  },
  {
    key: "VaccineSupplier",
    label: "Vaccineleverantör ",
    sortable: true
  },
  {
    key: "QuantityVial",
    label: "kvantitet vial"
  },
  {
    key: "QuantityDose",
    label: "kvantitet dos"
  }
];
const ORDER_REPORT_FIELDS = [
  {
    key: "healthCareProvider",
    label: "Vårdgivare Namn",
    sortable: true
  },
  {
    key: "orderDate",
    label: "Beställningsdatum"
  },
  {
    key: "deliveryDate",
    label: "Önskat lev datum ",
    sortable: true
  },

  {
    key: "quantityDos",
    label: "kvantitet dos"
  },
  {
    key: "gln",
    label: "GLN-mottagre"
  }
];
module.exports = {
  DELIVERY_REPORT_FIELDS,
  INVENTORY_REPORT_FIELDS,
  ORDER_REPORT_FIELDS
};
