import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Spin } from 'antd';


function Login() {
    const navigate = useNavigate();

    const [transactionId, setTransactionId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });


    const handleSubmit = async (e) => {
        
        e.preventDefault();
        
        if (form.email === "" || form.password === "") {
            alert("Please fill all the fields");
            return;
        }

        const payload = {
            "username": `${form.email}`,
            "password": `${form.password}`,
        };

        setLoading(true);

        await axios.post("https://tutorswan-backend.onrender.com/user/login",
            payload,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }
        ).then(function (response) {
            console.log(response);
            if (response.data) {
                console.log(response.data);
                // localStorage.setItem("token", response.data.access_token);
                localStorage.setItem("token", response.data.refresh_token);
                setTimeout(() => {
                    navigate("/dashboard");
                }, 1000);
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

        setLoading(true);

        axios.post("https://tutorswan-backend.onrender.com/payment/verify-payment",
            {
                "transaction_id": transactionId
            },
            {
                headers: {
                    "accept": "application/json",
                }
            }).then(function (response) {
                console.log(response);
                if (response.data) {
                    console.log(response.data);
                }
            }).catch(function (error) {
                console.log(error, "error");
                try {
                    if (error.response.data.detail) {
                        // navigate("/login");
                    }
                }
                catch { /* empty */ }
            })

        setLoading(false);

    }, [transactionId]);

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);

        if (query.get('check')) {
            setTransactionId(query.get('transaction_id'));
        }

    }, []);
    return (
        <>
            <Spin spinning={loading}>
                <div className="bg-[url(https://flowbite.s3.amazonaws.com/blocks/marketing-ui/authentication/background.jpg)] bg-blend-multiply bg-fit w-full h-screen overflow-hidden">
                    <div className="absolute top-0 left-0 w-full inset-0 bg-black bg-opacity-[.42] z-1"></div>
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 relative z-2">
                        <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-white dark:text-white">
                            <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
                            Tutor Swan
                        </Link>
                        <div className="w-full bg-white rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Sign in to your account
                                </h1>
                                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                            </div>
                                        </div>
                                        {/* <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a> */}
                                    </div>
                                    <button type="submit" className="w-full text-white bg-[#08823F] hover:bg-[#08823F] hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Don&apos;t have an account yet? <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
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

export { Login };



