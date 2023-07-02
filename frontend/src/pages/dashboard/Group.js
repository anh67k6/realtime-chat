import React, { useState } from "react";
import {
  Box,
  Stack,
} from "@mui/material";

// Part 12
// Lưu ý: Component Group chưa được ref từ bất kỳ component nào !!! Hãy ref đầy đủ để có thể sử dụng nó
import CreateGroup from "../../sections/dashboard/CreateGroup";
// --------

const Group = () => {

//   Part 12:
  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
// ----------


  return (
    <>
      <Stack direction="row" sx={{ width: "100%" }}>
        {/* Left */}
        <Box>
        </Box>
        {/* Right */}
      </Stack>


      {/* Part 12: */}
      {openDialog && (
        <CreateGroup open={openDialog} handleClose={handleCloseDialog} />
      )}
      {/* ------------- */}
    </>
  );
};

export default Group;
