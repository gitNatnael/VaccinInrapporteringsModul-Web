const DELIVERY_REPORT_FIELDS = [
  {
    key: "deliveryDate",
    label: "Leverans Datum"
  },
  {
    key: "scheduledDate",
    label: "Planerat lev datum"
  },
  {
    key: "supplier",
    label: "Vaccineleverantör "
  },
  {
    key: "quantity",
    label: "kvantitet vial"
  },
  {
    key: "gln",
    label: "GLN-mottagre"
  },
  {
    key: "healthcareProvider",
    label: "Vårdgivare Namn"
  }
];
const INVENTORY_REPORT_FIELDS = [
  {
    key: "InventoryUpdateDate",
    label: "Datum"
  },
  {
    key: "VaccineSupplier",
    label: "Vaccineleverantör "
  },
  {
    key: "QuantityVial",
    label: "kvantitet vial"
  },
  {
    key: "QuantityDose",
    label: "kvantitet dos"
  },
  {
    key: "healthcareProvider",
    label: "Vårdgivare Namn"
  }
];
module.exports = {
  DELIVERY_REPORT_FIELDS,
  INVENTORY_REPORT_FIELDS
};
