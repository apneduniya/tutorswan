import axios from "axios";
import { useState } from "react";
// import { useOutletContext } from "react-router-dom";


function CreateSubject() {
    const [form, setForm] = useState({
        subject: "",
    });
    // const data = useOutletContext();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token") || sessionStorage.getItem("token");

        await axios.post("https://tutorswan-backend.onrender.com/subjects/create",
            {
                "name": form.subject,
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "accept": "application/json",
                }
            }).then(function (response) {
                console.log(response);
                if (response.data) {
                    window.location.replace("/dashboard");
                }
            }).catch(function (error) {
                console.log(error, "error");
                try {
                    if (error.response.data.detail) {
                        // navigate("/login");
                    }
                }
                catch { /* empty */ }
            });
    }

    return (
        <>
            <div className="h-[calc(100vh-56px)] w-full flex items-center justify-center">
                <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Create Subject</h5>
                        <div>
                            <label htmlFor="create-subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject name</label>
                            <input type="text" name="create-subject" id="create-subject" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#08823F] focus:opacity-90 focus:border-[#08823F] block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="History" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
                        </div>
                        <button type="submit" className="w-full text-white bg-[#08823F] hover:bg-[#08823F] hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export { CreateSubject };


