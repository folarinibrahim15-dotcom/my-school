const generatePaymentReference = () => {
  const random = Math.floor(
    100000 + Math.random() * 900000
  );

  return `SPIS-${Date.now()}-${random}`;
};

export default generatePaymentReference;