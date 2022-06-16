import { Add, DeleteOutline } from "@mui/icons-material";
import { Fab, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import "./apiTest.css";

function ApiTest() {
  // Itemが１ユニット。
  type ItemsProps = {
    key: string;
    value: string;
  }[];

  const [items, setItems] = useState<ItemsProps>([]);

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleAddButtonClick = () => {
    //作られるitemの定義
    const newItem = {
      key: inputValue,
      value: inputValue,
    };
    const newItems = [...items, newItem];

    //useStateのitemsに反映
    setItems(newItems);
  };
  const handleDeleteButtonClick = (index: number) => {
    items.splice(index, 1);
    const newItems = [...items];
    setItems(newItems);
  };
  const handleChangeTitle = (val: string) => {
    setTitle(val);
  };
  const handleChangeUrl = (val: string) => {
    setUrl(val);
  };
  const handleChangeKey = (index: number, key: string) => {
    //itemsを展開した配列、newItemsを作る
    const newItems = [...items];
    //テキストを更新する。
    newItems[index].key = key;
    setItems(newItems);
  };
  const handleChangeValue = (index: number, value: string) => {
    //itemsを展開した配列、newItemsを作る
    const newItems = [...items];
    //テキストを更新する。
    newItems[index].value = value;
    setItems(newItems);
    console.log(items);
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
      </div>
      <h3>Parameter</h3>
      {items.map((item, index) => (
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
        <Button variant="outlined" className="btn">
          API GO!!
        </Button>
        <Button variant="outlined" className="btn">
          SAVE
        </Button>
      </div>
    </div>
  );
}

export default ApiTest;