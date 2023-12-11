import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spin } from 'antd';


function Results() {

    const { id, name } = useParams();
    const navigate = useNavigate();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        setLoading(true);

        const token = localStorage.getItem("token") || sessionStorage.getItem("token");

        axios.get(`https://tutorswan-backend.onrender.com/paper-pattern/get-all-results/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }

            }).then(function (response) {
                console.log(response);
                if (response.data) {

                    setResults(response.data);
                }
            }).catch(function (error) {
                console.log(error, "error");

                setResults([]);

                // navigate.push("/register");
                // }
                try {
                    if (error.response.data.detail) {
                        // navigate.push("/register");
                    }
                }
                catch { /* empty */ }
            });

        setLoading(false);

    }, [name, navigate, id]);

    return (
        <>
            <Spin spinning={loading}>
                <h1 className='text-4xl font-bold text-center text-gray-800 mt-24'>
                    Results
                </h1>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3 select-none">
                                    Branch
                                </th>
                                <th scope="col" className="px-6 py-3 select-none">
                                    Roll no
                                </th>
                                <th scope="col" className="px-6 py-3 select-none">
                                    Total marks
                                </th>
                                <th scope="col" className="px-6 py-3 select-none">
                                    Date & Time
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                results.length > 0 ?
                                    results.map((item, index) => {
                                        return (
                                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <td className="px-6 py-4">
                                                    {item.student_branch}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {item.student_rollno}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {item.total_marks}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {new Date(item.created_at).toLocaleDateString() + " " + new Date(item.created_at).toLocaleTimeString()}
                                                </td>
                                            </tr>
                                        )
                                    })
                                    :
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                                        <span className="px-6 py-4">
                                            No results found.
                                        </span>
                                    </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </Spin>
        </>
    )
}


export { Results };



