import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import close from "../../assets/img/close.png";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../actions";
import uploadCircle from "../../assets/img/upload-circle.png";
const Modal = (props) => {
  const dispatch = useDispatch();
  const { category } = props;

  const status = useSelector((state) => state.source_dialog.open);

  // const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);
  const fileUploadRef = useRef(undefined);
  const [chosenFile, setChosenFile] = useState(null);

  const closeDialog = () => {
    dispatch({ type: actions.OPEN_ADD_DIALOG, payload: false });
  };

  const submitFile = () =>{
    console.log("Submitted file")
    closeDialog();
  }
  const submitUrl = () =>{
    console.log("Submitted Url")
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
                      {category === "File"
                        ? "File"
                        : category === "URL"
                        ? "URL"
                        : "Text"}
                    </p>
                    <img
                      src={close}
                      onClick={closeDialog}
                      className="cursor-pointer hover:opacity-70"
                    ></img>
                  </div>
                  <div className="flex-col p-default flex flex-grow justify-between">
                    {category === "File" && (
                      <div
                        className="flex w-full h-[86px] bg-light-charcoal dark:bg-charcoal rounded-default items-center cursor-pointer"
                        onClick={() => {
                          fileUploadRef.current?.click();
                        }}
                      >
                        <img src={uploadCircle} alt="" className="px-[14px]" />
                        <p className="dark:text-white font-bold text-sm">
                          Upload File
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
                            }
                          }}
                        />
                      </div>
                    )}
                    {category === "Url" && <input type="text" />}

                    <button
                        onClick={category==="File"?submitFile:submitUrl}
                        className="bg-primary rounded-default w-full hover:bg-opacity-70 h-button text-white"
                      >
                        Upload
                      </button>
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
