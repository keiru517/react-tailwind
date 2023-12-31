import Table from "../components/Table";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import Select from "../components/Select";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../actions";

function Home() {
  const dispatch = useDispatch();
  const documents = useSelector(state=>state.documents);

  const [type, setType] = useState("Add");

  const options = [
    { id: 0, name: "File" },
    { id: 1, name: "URL" },
    { id: 2, name: "Text" },
  ];

  useEffect(() => {
    actions.getDocuments(dispatch);
  }, []);

  const handleCategory = (e) => {
    setType(e.name);
    dispatch({ type: actions.OPEN_ADD_DIALOG, payload: true });
  };

  return (
    <div>
      <p className="text-black dark:text-white text-3xl">
        Let's build our knowledge database together!
      </p>
      <div className="mt-10 gap-3">
        <div className="">
          <div className="flex flex-col">
            <div className="flex justify-end mb-3">
              <Select
                className="w-[144px] rounded-default text-xs hidden sm:inline h-10"
                options={options}
                handleClick={handleCategory}
                value={type}
              >
                {type}
              </Select>
            </div>
            <Table documents={documents}/>
          </div>
        </div>
      </div>
      <Modal type={type} />
    </div>
  );
}

export default Home;
