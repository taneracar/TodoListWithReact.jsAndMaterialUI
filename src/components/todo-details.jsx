import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import React from "react";

const TodoDetails = ({
  todoDetails,
  openDialog,
  setOpenDialog,
  setTodoDetails,
}) => {
  return (
    <>
      <Dialog onClose={() => setOpenDialog(false)} open={openDialog}>
        <DialogTitle>{todoDetails?.todo}</DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDialog(false);
              setTodoDetails(null);
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TodoDetails;
