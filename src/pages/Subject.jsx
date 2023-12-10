import { Link, useNavigate, useParams } from "react-router-dom";


function Subject() {

    const { name } = useParams();
    const navigate = useNavigate();

    return (
        <>
            <Link to={`/dashboard/subject/${name}/create-paper-pattern`}>
                <button className="w-full max-w-[300px] mt-20 mb-10 text-white bg-[#08823F] hover:bg-[#08823F] hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    Create paper pattern
                </button>
            </Link>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 select-none">
                                Title
                            </th>
                            <th scope="col" className="px-6 py-3 select-none">
                                Class
                            </th>
                            <th scope="col" className="px-6 py-3 select-none">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer" onClick={() => navigate(`/dashboard/subject/${name}/paper-upload/title`)}>
                            <td className="px-6 py-4">
                                Title will be here...
                            </td>
                            <td className="px-6 py-4">
                                11
                            </td>
                            <Link>
                                <td className="px-6 py-4 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500 hover:underline">
                                    Result
                                </td>
                            </Link>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer" onClick={() => navigate(`/dashboard/subject/${name}/paper-upload/title`)}>
                            <td className="px-6 py-4">
                                Title will be here...
                            </td>
                            <td className="px-6 py-4">
                                9
                            </td>
                            <Link>
                                <td className="px-6 py-4 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500 hover:underline">
                                    Result
                                </td>
                            </Link>
                        </tr>
                    </tbody>
                </table>
            </div>

        </>
    )
}


export { Subject };



