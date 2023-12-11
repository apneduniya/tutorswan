import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


function Subject() {

    const { name } = useParams();
    const navigate = useNavigate();
    const [paperData, setPaperData] = useState([]);

    useEffect(() => {


        const token = localStorage.getItem("token") || sessionStorage.getItem("token");

        axios.get(`https://tutorswan-backend.onrender.com/paper-pattern/get-all/${name}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }

            }).then(function (response) {
                console.log(response);
                if (response.data) {

                    setPaperData(response.data);
                }
            }).catch(function (error) {
                console.log(error, "error");

                setPaperData([]);

                // navigate.push("/register");
                // }
                try {
                    if (error.response.data.detail) {
                        // navigate.push("/register");
                    }
                }
                catch { /* empty */ }
            });

    }, [name, navigate]);

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
                        {/* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer" onClick={() => navigate(`/dashboard/subject/${name}/paper-upload/title`)}>
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
                        </Link> */}
                        {
                            paperData.length > 0 ?
                                paperData.map((item, index) => {
                                    return (
                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="px-6 py-4">
                                                {item.title}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.class_no}
                                            </td>
                                            <td className="px-6 py-4 flex gap-5">
                                                <Link to={`/dashboard/subject/${name}/paper-upload/${item._id}`}>
                                                    <button className="w-full max-w-[150px] text-white bg-[#08823F] hover:bg-[#08823F] hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                                        Upload paper
                                                    </button>
                                                </Link>
                                                <Link to={`/dashboard/subject/${name}/result/${item._id}`}>
                                                    <button className="w-full max-w-[150px] text-white bg-[#08823F] hover:bg-[#08823F] hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                                        Result
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })
                                :
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                                    <span className="px-6 py-4">
                                        No paper pattern created yet.
                                    </span>
                                </tr>
                        }
                        {/* </tr> */}
                    </tbody>
                </table>
            </div>

        </>
    )
}


export { Subject };



