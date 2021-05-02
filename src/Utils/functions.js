const deliveryReportTableObj = obj => {
  return {
    deliveryDate: new Date(obj.deliveryDate).toLocaleDateString(),
    scheduledDate: new Date(obj.scheduledDeliveryDate).toLocaleDateString(),
    supplier: obj.vaccineSupplier,
    quantity: obj.quantityVial,
    gln: obj.gln ? obj.gln : "-",
    healthcareProvider: obj.healthCareProvider
  };
};

const InventoryReportTableObj = obj => {
  return {
    InventoryUpdateDate: new Date(obj.inventoryUpdateDate).toLocaleDateString(),
    VaccineSupplier: obj.vaccineSupplier,
    QuantityVial: obj.quantityVial,
    QuantityDose: obj.quantityDose,
    healthcareProvider: obj.healthCareProvider
  };
};

module.exports = {
  deliveryReportTableObj,
  InventoryReportTableObj
};
