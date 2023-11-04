import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { apis } from "../../utils/apis";
import * as actions from "../../actions";
import Select from "../Select";
import uploadCircle from "../../assets/img/upload-circle.png";
import close from "../../assets/img/close.png";
import pdfIcon from "../../assets/img/pdf.png";

const Modal = (props) => {
  const { type } = props;
  const dispatch = useDispatch();

  const options = [
    { id: 0, name: "Public" },
    { id: 1, name: "Internal" },
    { id: 2, name: "Confidential" },
  ];
  const status = useSelector((state) => state.source_dialog.open);

  const [category, setCategory] = useState("Category");
  const handleCategory = (e) => {
    console.log("category", e.name);
    setCategory(e.name);
  };

  const cancelButtonRef = useRef(null);

  const closeDialog = () => {
    dispatch({ type: actions.OPEN_ADD_DIALOG, payload: false });
    setChosenFile(null);
    setPreviewFileName(null);
    setCategory("Category");
    setIsDepth(false);
    setDepth("");
  };

  // File upload part
  const fileUploadRef = useRef(undefined);
  const [chosenFile, setChosenFile] = useState(null);
  const [previewFileName, setPreviewFileName] = useState(null);

  const submitFile = () => {

    const formData = new FormData();
    formData.append("category", category);
    formData.append("file", chosenFile)
    axios.post(apis.uploadFile, formData).then(res=>{
      alert(res.data.message)
    }).catch(error=>{
      alert(error.response.data.message)
    })
    closeDialog();
  };

  // URL upload part
  const [isDepth, setIsDepth] = useState(false);
  const [scrapingOption, setScrapingOption] = useState("Scraping Options");
  const [depth, setDepth] = useState("");
  const [url, setUrl] = useState("");
  const scrapingOptions = [
    { id: 0, name: "All Pages" },
    { id: 1, name: "Depth" },
  ];
  const handleScrapingOption = (e) => {
    setScrapingOption(e.name);
    if (e.name === "Depth") {
      setIsDepth(true);
    } else {
      setIsDepth(false);
    }
  };

  const submitUrl = () => {
    console.log("Submitted Url");
    console.log("category", category);
    console.log("scraping Option", scrapingOption);
    console.log("depth", depth);
    console.log("url", url);

    closeDialog();
  };

  // Text upload part
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const submitText = () => {
    console.log("category", category);
    console.log("title", title);
    console.log("text", text);

    axios.post(apis.uploadText, {
      category,
      title,
      text
    }).then((res)=>{
      actions.getDocuments(dispatch);
      alert(res.data.message);
    }).catch((error)=>{
      alert(error.response.data.message);
    })
    closeDialog();
  }

  return (
    <Transition.Root show={status} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={closeDialog}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-main text-left shadow-xl transition-all sm:my-8 bg-white dark:bg-slate h-[609px] md:w-[735px] mx-3 flex flex-col">
                <div className="divide-y divide-solid divide-[#3A3A3A] flex flex-col flex-grow">
                  <div className="flex items-center text-left h-[88px] justify-between px-default">
                    <p className="text-2xl text-black dark:text-white font-bold">
                      Add{" "}
                      {type === "File"
                        ? "File"
                        : type === "URL"
                        ? "URL"
                        : "Text"}
                    </p>
                    <img
                      src={close}
                      onClick={closeDialog}
                      className="cursor-pointer hover:opacity-70"
                    ></img>
                  </div>
                  <div className="flex-col p-default flex flex-grow ">
                    <Select
                      className="w-[144px] rounded-default text-xs hidden sm:inline h-10"
                      options={options}
                      handleClick={handleCategory}
                      value={category}
                    >
                      {category}
                    </Select>
                    {type === "File" && (
                      <div className="flex flex-col flex-grow justify-between">
                        <div
                          className="flex w-full h-[86px] bg-light-charcoal dark:bg-charcoal rounded-default items-center cursor-pointer mt-3"
                          onClick={() => {
                            fileUploadRef.current?.click();
                          }}
                        >
                          <img
                            src={previewFileName ? pdfIcon : uploadCircle}
                            alt=""
                            className="px-[14px] w-24 rounded-full"
                          />
                          <p className="dark:text-white font-bold text-sm">
                            {previewFileName ? previewFileName : "Upload File"}
                          </p>
                          <input
                            type="file"
                            ref={fileUploadRef}
                            hidden
                            onChange={(e) => {
                              const files = e.target.files;
                              if (files.length) {
                                const file = files[0];
                                setChosenFile(file);
                                setPreviewFileName(file.name);
                              }
                            }}
                          />
                        </div>
                        <button
                          onClick={submitFile}
                          className="bg-primary rounded-default w-full hover:bg-opacity-70 h-button text-white"
                        >
                          Upload
                        </button>
                      </div>
                    )}
                    {type === "URL" && (
                      <div className="flex flex-col flex-grow justify-between space-y-3 mt-3">
                        <div className="flex flex-col space-y-3">
                          <div className="flex space-x-3">
                            <Select
                              className="w-[144px] rounded-default text-xs hidden sm:inline h-10"
                              options={scrapingOptions}
                              handleClick={handleScrapingOption}
                              value={scrapingOption}
                            >
                              {scrapingOption}
                            </Select>
                            {isDepth && (
                              <input
                                type="number"
                                className="w-[144px] border border-dark-gray rounded-default h-button p-default text-sm"
                                placeholder="Scraping Depth"
                                value={depth}
                                onChange={(e) => setDepth(e.target.value)}
                              />
                            )}
                          </div>
                          <input
                            type="text"
                            className="border border-dark-gray rounded-default h-button p-default text-sm"
                            placeholder="https://example.com"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                          />
                        </div>

                        <button
                          onClick={submitUrl}
                          className="bg-primary rounded-default w-full hover:bg-opacity-70 h-button text-white"
                        >
                          Upload
                        </button>
                      </div>
                    )}
                    {type === "Text" && (
                      <div className="flex flex-col flex-grow justify-between space-y-3 mt-3">
                        <div className="flex flex-col space-y-3">
                          <div className="flex flex-col space-y-3">
                            <input
                              type="text"
                              className="w-full border border-dark-gray rounded-default h-button p-default text-sm"
                              placeholder="Title"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                            />
                            <textarea
                              name=""
                              id=""
                              rows={10}
                              className="w-full border border-dark-gray rounded-default p-default text-sm resize-none"
                              placeholder="Add text here"
                              value={text}
                              onChange={(e) => setText(e.target.value)}
                            ></textarea>
                          </div>
                        </div>
                        <button
                          onClick={submitText}
                          className="bg-primary rounded-default w-full hover:bg-opacity-70 h-button text-white"
                        >
                          Upload
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
