import { Box, FilledInput, Stack } from "@mui/material";
import React, { useState } from "react";

import "./memo.css";

function Memo() {
  const [text, setText] = useState("");
  const [line, setLine] = useState(1);

  const toggleDrawer = () => (event: React.KeyboardEvent) => {
    if (
      event.type === "keydown" &&
      (event as React.KeyboardEvent).key === "Enter"
    ) {
      const el = event.currentTarget as HTMLTextAreaElement;
      console.log((el.innerText.match(/\n/g) || []).length);
      setLine(el.rows + 1);
    }
  };
  return (
    <div>
      <Box color="primary">
        <h2>MEMO</h2>
      </Box>
      <FilledInput
        sx={{ marginLeft: "auto", marginRight: 0 }}
        id="outlined-textarea"
        fullWidth
        rows={line}
        startAdornment={
          <Stack sx={{ width: "5%" }}>
            {Array.from(Array(line).keys()).map((_item, index) => (
              <div>{index + 1}</div>
            ))}
          </Stack>
        }
        multiline
        onKeyDown={toggleDrawer()}
      />
    </div>
  );
}

export default Memo;
