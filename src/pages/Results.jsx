import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spin } from 'antd';


function Results() {

    const navigate = useNavigate();
    const { id, name } = useParams();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);


    const convertToCSV = (data) => {
        // Add header row
        let csvContent = 'Branch,Roll No,Total Marks,Date & Time\n';
    
        // Add data rows
        data.forEach((item) => {
            const branch = item.student_branch || '';
            const rollNo = item.student_rollno || '';
            const totalMarks = item.total_marks? item.total_marks: item.total_marks === 0? 0: '';
            const dateTime = item.created_at || '';
    
            csvContent += `${branch},${rollNo},${totalMarks},"${new Date(dateTime).toLocaleDateString() + " " + new Date(dateTime).toLocaleTimeString()}"\n`;
        });
    
        return csvContent;
    };
    
    const download = () => {
        // Replace 'yourData' with the actual array of objects
    
        const csvContent = convertToCSV(results);
        const encodedURI = encodeURI(`data:text/csv;charset=utf-8,${csvContent}`);
        // window.open(encodedURI);

        window.location.href = encodedURI;
    };
    

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
                <div className="flex items-center lg:justify-between flex-wrap gap-5 justify-center mt-24">
                    <h1 className='text-4xl font-bold text-center text-gray-800'>
                        Results
                    </h1>
                    <button onClick={download} className="w-[300px] h-fit bg-blue-500 hover:bg-blue-600 select-none text-white font-bold py-2 px-4 rounded">
                        Download CSV
                    </button>
                </div>
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



