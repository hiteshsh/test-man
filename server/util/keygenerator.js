const generateUniqueKey = async (model, prefix) => {
  const lastEntry = await model.findOne().sort({ key: -1 });
  if (lastEntry && lastEntry.key) {
    const lastKeyNumber = parseInt(lastEntry.key.split("-")[1], 10);
    const newKeyNumber = lastKeyNumber + 1;
    return `${prefix}-${newKeyNumber.toString().padStart(2, "0")}`;
  }
  return `${prefix}-01`;
};

export default generateUniqueKey;
