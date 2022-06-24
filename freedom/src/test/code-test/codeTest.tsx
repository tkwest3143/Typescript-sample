import { Box, Button, TextField } from "@mui/material";
import React from "react";

function CodeTest() {
  return (
    <div>
      <Box color="primary">
        <h2>Config</h2>

        <TextField
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={12}
          fullWidth
          sx={{ m: 1 }}
        />
      </Box>
      <Box>
        <Button>run!</Button>
      </Box>
    </div>
  );
}

export default CodeTest;
