import { Link } from "react-router-dom";
import logo from '../assets/logo.png';
import { useEffect, useState } from "react";
import axios from "axios";
import { Spin } from 'antd';


function Register() {
    const [form, setForm] = useState({
        name: '',
        instituteName: '',
        userName: '',
        email: '',
        password: '',
        nosStudents: 0,
        nosSemesters: 0,
        nosSubjects: 0
    });

    const [selectedPlan, setSelectedPlan] = useState('basic');
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalCredits, setTotalCredits] = useState(0);
    const [loading, setLoading] = useState(false);


    const autoSelectPlan = () => {
        // Adjust the conditions as needed based on your pricing logic
        if (form.nosStudents <= 300) {
            setSelectedPlan('basic');
        } else if (form.nosStudents <= 600) {
            setSelectedPlan('startup');
        } else {
            setSelectedPlan('premium');
        }
    };


    const calculatePriceAndCredits = (plan) => {
        const planPrices = {
            basic: 35,
            startup: 30,
            premium: 25
        };

        const totalPrice = form.nosStudents * form.nosSubjects * form.nosSemesters * planPrices[plan];
        const totalCredits = form.nosStudents * form.nosSubjects * form.nosSemesters;

        setTotalPrice(totalPrice);
        setTotalCredits(totalCredits);

        // You can use these values as needed, for example, send to a backend or update the state.
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.nosStudents <= 0 || form.nosSemesters <= 0 || form.nosSubjects <= 0 || form.name === '' || form.instituteName === '' || form.userName === '' || form.email === '' || form.password === '') {
            alert("Please fill all the fields");
            return;
        }

        setLoading(true);

        await axios.post("https://tutorswan-backend.onrender.com/payment/create-checkout-session", form,
            {
                headers: {
                    "Content-Type": "application/json",
                    "accept": "application/json",
                }
            }).then(function (response) {
                console.log(response);
                if (response.data) {
                    console.log(response.data);
                    window.open(response.data.url, "_blank");
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

        setLoading(false);
    }


    useEffect(() => {
        console.log(form);

        autoSelectPlan();
        calculatePriceAndCredits(selectedPlan);
    }, [form]);

    return (
        <>
            <Spin spinning={loading}>
                <div className="bg-[url(https://flowbite.s3.amazonaws.com/blocks/marketing-ui/authentication/background.jpg)] bg-blend-multiply bg-fit w-full h-screen overflow-hidden">
                    <div className="absolute top-0 left-0 w-full inset-0 bg-black bg-opacity-[.42] z-1"></div>
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 relative z-2 overflow-visible">
                        <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-white dark:text-white">
                            <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
                            Tutor Swan
                        </Link>
                        <div className="h-[80%] w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 overflow-x-auto">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Create and account
                                </h1>
                                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                        <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Jhon Doe" required="" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                                    </div>
                                    <div>
                                        <label htmlFor="institute-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Institute name</label>
                                        <input type="text" name="institute-name" id="institute-name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="XYZ Institute" required="" value={form.instituteName} onChange={(e) => setForm({ ...form, instituteName: e.target.value })} />
                                    </div>
                                    <div>
                                        <label htmlFor="user-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User name</label>
                                        <input type="text" name="user-name" id="user-name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="jhon123" required="" value={form.userName} onChange={(e) => setForm({ ...form, userName: e.target.value })} />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@teachers.com" required="" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                                    </div>
                                    <div>
                                        <label htmlFor="nos-students" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number of Students</label>
                                        <input type="number" name="nos-students" id="nos-students" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" required="" value={form.nosStudents} onChange={(e) => setForm({ ...form, nosStudents: e.target.value })} />
                                    </div>
                                    <div>
                                        <label htmlFor="nos-semesters" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number of Semesters</label>
                                        <input type="number" name="nos-semesters" id="nos-semesters" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" required="" value={form.nosSemesters} onChange={(e) => setForm({ ...form, nosSemesters: e.target.value })} />
                                    </div>
                                    <div>
                                        <label htmlFor="nos-subjects" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number of Subjects</label>
                                        <input type="number" name="nos-subjects" id="nos-subjects" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" required="" value={form.nosSubjects} onChange={(e) => setForm({ ...form, nosSubjects: e.target.value })} />
                                    </div>
                                    {/* <div>
                                    <label htmlFor="plan" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Plan</label>
                                    <input type="text" name="plan" id="plan" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-not-allowed" placeholder={selectedPlan} required="" value={selectedPlan.toUpperCase()} disabled />
                                </div> */}
                                    <div className="flex flex-col space-y-2">
                                        <span className="block font-medium text-gray-900 dark:text-white">Plan: {selectedPlan.toUpperCase()}</span>
                                        <span className="block font-medium text-gray-900 dark:text-white">Total Price: ₹ {totalPrice}</span>
                                        <span className="block font-medium text-gray-900 dark:text-white">Total Credits: {totalCredits}</span>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                        </div>
                                    </div>
                                    <button type="submit" className="w-full text-white bg-[#08823F] hover:bg-[#08823F] hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Already have an account? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Spin>
        </>
    )
}


export { Register };


