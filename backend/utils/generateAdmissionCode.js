const generateAdmissionCode = () => {
  const random = Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase();

  return `SPIS-${random}`;
};

export default generateAdmissionCode;