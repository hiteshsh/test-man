import React from "react";

const Handlepopup = () => {
  const [openPopup, setOpen] = React.useState(false);
  const handleOpenPopup = () => setOpen(true);
  const handleClosePopup = () => setOpen(false);

  return { openPopup,handleOpenPopup, handleClosePopup };
};

export default Handlepopup;
