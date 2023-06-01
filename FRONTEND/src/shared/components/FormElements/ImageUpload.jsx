import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import AddIcon from "@mui/icons-material/Add";
// import "./ImageUpload.css";

function ImageUpload(props) {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  function pickHandler(event) {
    let PickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      PickedFile = event.target.files[0];
      setFile(PickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, PickedFile, fileIsValid);
  }

  function pickImageHandler() {
    filePickerRef.current.click();
  }

  return (
    <div>
      <input
        id={props.id}
        ref={filePickerRef}
        className=" hidden"
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickHandler}
      />
      <div className="flex gap-4">
        <div className=" border-2 w-40 h-40">
          {previewUrl && (
            <img
              src={previewUrl}
              className=" w-full h-full object-cover"
              alt="Preview"
            />
          )}
          {!previewUrl && (
            <div className=" flex flex-col justify-center items-center">
              <AddIcon sx={{ fontSize: 100 }} color="disabled" />
              <p className=" text-sm font-light text-center">
                {props.placeholder}
              </p>
            </div>
          )}
        </div>

        <Button
          type="button"
          onClick={pickImageHandler}
          className=" h-min !p-2"
        >
          <p>
            <AddIcon color="disabled" sx={{ color: "white" }} />
            <span> Pick Image</span>
          </p>
        </Button>
      </div>
      {!isValid && (
        <p className="text-red-600 pb-3 text-sm font-light">
          {props.errorText}
        </p>
      )}
    </div>
  );
}

export default ImageUpload;
