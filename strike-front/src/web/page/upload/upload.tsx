import { Box, Button, TextField } from "@mui/material";
import { useRef, useState } from "react";
import MessageService from "../../service/messageService";
import { UploadService } from "../../service/uploadService";

function Upload() {
  const service = new UploadService();
  const [files, setFiles] = useState<File[] | null>(null);
  const [filesName, setFilesName] = useState<string>("");
  const fileSelectRef = useRef<HTMLInputElement>(null);
  const handleFileSelectClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const img: File = e.target.files[0];
    const targetFiles = files ? files : [];
    console.log(targetFiles);
    targetFiles.push(img);
    setFiles(targetFiles);
    setFilesName(getFileNames());
  };
  const getFileNames = () => {
    if (!files) {
      return "";
    }
    let result: string = "";
    files.forEach((file) => {
      result = result + file.name + "\n";
    });
    return result;
  };
  const hundleReferenceClick = () => {
    (fileSelectRef.current as HTMLInputElement).click();
  };
  const hundleClearClick = () => {
    setFiles(null);
    setFilesName("");
  };

  const onSendClick = () => {
    if (!files || files.length == 0) {
      alert(MessageService.Messages.alert.not_selected_file);
      return;
    }
    service.fileUpload(files);
  };
  return (
    <div>
      <Box color="primary">
        <h2>{MessageService.Messages.menu.file_upload}</h2>
      </Box>
      <TextField
        disabled
        multiline
        value={filesName}
        onClick={hundleReferenceClick}
      />
      <Button onClick={hundleReferenceClick}>
        {MessageService.Messages.text.refarence}
      </Button>
      <Button onClick={hundleClearClick}>
        {MessageService.Messages.text.clear}
      </Button>
      <input
        hidden
        type="file"
        id="file-select"
        onChange={handleFileSelectClick}
        ref={fileSelectRef}
      />
      <Box>
        <Button onClick={onSendClick}>
          {MessageService.Messages.text.send}
        </Button>
      </Box>
    </div>
  );
}

export default Upload;
