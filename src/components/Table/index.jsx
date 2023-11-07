import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';

import deleteIcon from "../../assets/img/delete.svg";

export default function Table(props) {

  const {documents} = props;
  const handleClick = () => {

  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Type
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {
            documents.length>0 && documents.map((document, id)=>(
            <tr onClick={handleClick} key={id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {document.name}
              </td>
              <td className="px-6 py-4">{document.type}</td>
              <td className="px-6 py-4">{document.category}</td>
              <td className="px-6 py-4">
                {
                  <img src={deleteIcon} alt="" className="w-4 cursor-pointer"/>
                }
              </td>
              <td className="px-6 py-4">
              {formatDistanceToNow(new Date(document.created_at), { addSuffix: true, locale: enUS })}
              </td>
            </tr>

            ))
          }
        </tbody>
      </table>
    </div>
  );
}
