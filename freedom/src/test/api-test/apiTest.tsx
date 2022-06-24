import { Add, DeleteOutline } from "@mui/icons-material";
import {
  AlertProps,
  Box,
  Card,
  CardContent,
  Fab,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import MuiAlert, { AlertColor } from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { AxiosResponse } from "axios";
import React from "react";
import { useState, forwardRef, useEffect } from "react";
import "./apiTest.css";
import { ApiTestService } from "./apiTestService";

function ApiTest() {
  type form = {
    id: string;
    title: string;
    url: string;
    method: string;
    parameters: ParametersProps;
  };
  type ParametersProps = {
    key: string;
    value: string;
  }[];
  type AlertProp = {
    text: string;
    alertColor: AlertColor;
  };
  const apiTestService = new ApiTestService();
  const [id, setId] = useState("");
  const [allSettings, setAllSettings] = useState<form[]>([]);
  const [parameters, setParameters] = useState<ParametersProps>([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("");
  const [inputValue] = useState("");
  const [open, setOpen] = useState(false);
  const [alertProp, setAlertProp] = useState<AlertProp>();
  const [response, setResponse] = useState<AxiosResponse | null>(null);
  const [isOpration, setIsOpration] = useState<boolean>(false);

  const onload = () => {
    apiTestService.getAllSetting().then((res) => {
      let forms: form[] = [];
      res.forEach((data) => {
        const form: form = {
          id: String(data.id),
          title: data.title,
          url: data.url,
          method: data.method,
          parameters: data.parameters,
        };
        forms.push(form);
      });
      setAllSettings(forms);
    });
  };
  useEffect(() => {
    onload();
  });
  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

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
  const openAlert = (alertProp: AlertProp) => {
    setOpen(true);
    setAlertProp(alertProp);
  };
  const handleSaveClick = () => {
    setIsOpration(true);
    if (id) {
      apiTestService.update(id, title, url, method, parameters);
      return;
    }
    apiTestService.save(title, url, method, parameters);
    setIsOpration(false);
    openAlert({ text: "complete save", alertColor: "success" });
  };
  const handleApiGoClick = () => {
    setIsOpration(true);
    apiTestService
      .apiSend(url, method, parameters)
      .then((res) => {
        setResponse(res);
      })
      .catch((err) => {
        setResponse(err);
      });
    setIsOpration(false);
    openAlert({ text: "complete api send", alertColor: "success" });
  };

  const handleChange = (event: SelectChangeEvent) => {
    const id = event.target.value;
    setId(id);
    if (id) {
      const selectedSetting = allSettings.find((setting) => setting.id === id);
      if (!selectedSetting) {
        return;
      }
      setTitle(selectedSetting.title);
      setUrl(selectedSetting.url);
      setMethod(selectedSetting.method);
      setParameters(selectedSetting.parameters);
    }
  };

  const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  return (
    <div>
      <h3>Setting</h3>
      <Box sx={{ minWidth: 120 }}>
        <FormControl sx={{ m: 1, minWidth: 240 }} variant="standard">
          <InputLabel id="demo-simple-select-standard-label">
            select setting
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={id}
            onChange={handleChange}
            label="select setting"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {allSettings.map((setting, _index) => (
              <MenuItem value={setting.id}>{setting.title}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
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
      {response && (
        <Box sx={{ minWidth: 120 }}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {response.status},{response.statusText}
              </Typography>
              <Typography variant="h5" component="div">
                {JSON.stringify(response.data)}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      )}
      <div className="btn-area">
        {isOpration && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}

        {!isOpration && (
          <Stack spacing={1} sx={{ width: "20%" }}>
            <Button
              variant="outlined"
              className="btn"
              onClick={() => handleSaveClick()}
            >
              SAVE
            </Button>
            <Button
              variant="outlined"
              className="btn"
              onClick={() => handleApiGoClick()}
            >
              API GO!!
            </Button>
            {alertProp && (
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity={alertProp.alertColor}
                  sx={{ width: "100%" }}
                >
                  {alertProp.text}
                </Alert>
              </Snackbar>
            )}
          </Stack>
        )}
      </div>
    </div>
  );
}

export default ApiTest;
