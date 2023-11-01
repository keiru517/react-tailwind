import Table from "../components/Table";
import { useState } from "react";
import Modal from "../components/Modal";
import Select from '../components/Select';
import { useDispatch } from "react-redux";
import * as actions from '../actions';

function Home() {
  const dispatch = useDispatch();
  const [category, setCategory] = useState("Add");

  const options = [
    {id:0, name:'File'},
    {id:1, name:'URL'},
    {id:2, name:'Text'},
  ]

  const handleCategory = (e) =>{
    // console.log(e.name)
    setCategory(e.name)
    dispatch({type: actions.OPEN_ADD_DIALOG, payload: true})

  }

  return (
    <div>
      <p className="text-black dark:text-white text-3xl">
        Let's build our knowledge database together!
      </p>
      <div className="grid grid-cols-3 mt-10 gap-3">
        <div className="col-span-2">
          <div className="flex flex-col">
          <Select
            className="w-[144px] rounded-lg text-xs hidden sm:inline h-10"
            options={options}
            handleClick={handleCategory}
            value={category}
          >
            {category}
          </Select>
            {/* <select
              id="countries"
              className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-28 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              defaultValue="add"
            >
              <option value="add" disabled hidden>Add</option>
              <option value="file" onClick={handleOptionClick}>File</option>
              <option value="url">URL</option>
              <option value="text">Text</option>
            </select> */}
            <Table />
          </div>
        </div>
      </div>
      <Modal category={category}/>
    </div>
  );
}

export default Home;
