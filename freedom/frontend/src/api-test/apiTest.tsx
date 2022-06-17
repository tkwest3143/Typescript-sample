import { Add, DeleteOutline } from "@mui/icons-material";
import {
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import "./apiTest.css";
import { ApiTestService } from "./apiTestService";

function ApiTest() {
  // Itemが１ユニット。
  type ParametersProps = {
    key: string;
    value: string;
  }[];

  const [parameters, setParameters] = useState<ParametersProps>([]);

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("");
  const [inputValue, setInputValue] = useState("");
  const apiTestService = new ApiTestService();
  const handleAddButtonClick = () => {
    //作られるitemの定義
    const newItem = {
      key: inputValue,
      value: inputValue,
    };
    const newItems = [...parameters, newItem];

    //useStateのitemsに反映
    setParameters(newItems);
  };
  const handleDeleteButtonClick = (index: number) => {
    parameters.splice(index, 1);
    const newItems = [...parameters];
    setParameters(newItems);
  };
  const handleChangeTitle = (val: string) => {
    setTitle(val);
  };
  const handleChangeUrl = (val: string) => {
    setUrl(val);
  };
  const handleChangeMethod = (val: string) => {
    setMethod(val);
  };
  const handleChangeKey = (index: number, key: string) => {
    //itemsを展開した配列、newItemsを作る
    const newItems = [...parameters];
    //テキストを更新する。
    newItems[index].key = key;
    setParameters(newItems);
  };
  const handleChangeValue = (index: number, value: string) => {
    //itemsを展開した配列、newItemsを作る
    const newItems = [...parameters];
    //テキストを更新する。
    newItems[index].value = value;
    setParameters(newItems);
    console.log(parameters);
  };
  const handleSaveClick = () => {
    apiTestService.save(title, url, method, parameters);
  };
  const handleApiGoClick = () => {
    apiTestService.apiSend(url, method, parameters);
  };
  return (
    <div>
      <h3>Setting</h3>
      <div className="setting-field">
        <TextField
          required
          className="param-field"
          id="outlined-basic"
          label="title"
          variant="outlined"
          type="text"
          name="title"
          value={title}
          onChange={(event) => handleChangeTitle(event.target.value)}
        />
        <TextField
          required
          className="param-field"
          id="outlined-basic"
          label="url"
          variant="outlined"
          type="text"
          name="url"
          value={url}
          onChange={(event) => handleChangeUrl(event.target.value)}
        />
        <FormControl sx={{ minWidth: 200 }} required>
          <InputLabel id="demo-simple-select-label">Method</InputLabel>
          <Select
            className="param-field"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={method}
            label="method"
            onChange={(event) => handleChangeMethod(event.target.value)}
          >
            <MenuItem value={"get"}>Get</MenuItem>
            <MenuItem value={"post"}>Post</MenuItem>
            <MenuItem value={"delete"}>Delete</MenuItem>
            <MenuItem value={"put"}>Put</MenuItem>
            <MenuItem value={"patch"}>Patch</MenuItem>
          </Select>
        </FormControl>
      </div>
      <h3>Parameter</h3>
      {parameters.map((item, index) => (
        <div key={index} className="input-parameter">
          <TextField
            required
            className="param-field"
            id="outlined-basic"
            label="key"
            variant="outlined"
            type="text"
            name={"key[" + index + "]"}
            value={item.key}
            onChange={(event) => handleChangeKey(index, event.target.value)}
          />
          <TextField
            className="param-field"
            id="outlined-basic"
            label="value"
            variant="outlined"
            type="text"
            name={"value[" + index + "]"}
            value={item.value}
            onChange={(event) => handleChangeValue(index, event.target.value)}
          />
          <Fab
            color="error"
            size="small"
            aria-label="DeleteOutline"
            onClick={() => handleDeleteButtonClick(index)}
            className="icon-delete param-field"
          >
            <DeleteOutline />
          </Fab>
        </div>
      ))}
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => handleAddButtonClick()}
      >
        <Add />
      </Fab>
      <div className="btn-area">
        <Button
          variant="outlined"
          className="btn"
          onClick={() => handleApiGoClick()}
        >
          API GO!!
        </Button>
        <Button
          variant="outlined"
          className="btn"
          onClick={() => handleSaveClick()}
        >
          SAVE
        </Button>
      </div>
    </div>
  );
}

export default ApiTest;
