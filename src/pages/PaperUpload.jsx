import { InboxOutlined } from '@mui/icons-material';
import { Upload } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Spin } from 'antd';


const { Dragger } = Upload;


function PaperUpload() {
    const navigate = useNavigate();
    const { id, name } = useParams();
    const [form, setForm] = useState({
        subject: name,
        id: id,
        student_branch: '',
        student_rollno: '',
        list: []
    });

    const [questionData, setQuestionData] = useState({});
    const [loading, setLoading] = useState(false);

    // const props = {
    //     // name: 'file',
    //     // multiple: true,
    //     // action: 'https://api.imgbb.com/1/upload?key=1e324b4ffd7be805484317642e989bbb',
    //     action: false,
    //     onChange(info) {
    //         const { status } = info.file;
    //         if (status !== 'uploading') {
    //             console.log(info.file, info.fileList);
    //         }
    //         if (status === 'done') {
    //             message.success(`${info.file.name} file uploaded successfully.`);
    //         } else if (status === 'error') {
    //             message.error(`${info.file.name} file upload failed.`);
    //         }
    //     },
    //     onDrop(e) {
    //         console.log('Dropped files', e.dataTransfer.files);
    //     },
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.student_branch === '' || form.student_rollno === '' || form.list.length === 0) {
            alert("Please fill all the fields");
            return;
        }

        console.log(form);

        setLoading(true);

        const token = localStorage.getItem("token") || sessionStorage.getItem("token");

        axios.post(`https://tutorswan-backend.onrender.com/paper-pattern/check`, form,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "accept": "application/json",
                }
            }).then(function (response) {
                console.log(response);
                if (response.data) {
                    navigate(`/dashboard/subject/${name}`);
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

        const token = localStorage.getItem("token") || sessionStorage.getItem("token");

        axios.get(`https://tutorswan-backend.onrender.com/paper-pattern/get/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }

            }).then(function (response) {
                console.log(response);
                if (response.data) {
                    console.log(response.data);
                    setQuestionData(response.data);
                }
            }).catch(function (error) {
                console.log(error, "error");

                navigate.push("/register");
                // }
                try {
                    if (error.response.data.detail) {
                        // navigate.push("/register");
                    }
                }
                catch { /* empty */ }
            });

        setLoading(false);

    }, []);

    return (
        <>
            <Spin spinning={loading}>
                <div className='w-full flex flex-col justify-between items-center'>
                    <form className='w-full flex flex-col justify-between items-center gap-5' onSubmit={handleSubmit}>
                        <h1 className='text-4xl font-bold text-start text-gray-800 mt-24 mx-5'>
                            Upload Student&apos;s paper
                        </h1>
                        <div className='w-full flex gap-5 items-center justify-between flex-wrap mt-10 px-10'>
                            <div className='flex'>
                                <label htmlFor="student-branch" className='text-xl text-start text-gray-800 mx-5'>Student&apos;s branch</label>
                                <input type="text" id="student-branch" className="bg-gray-50 border max-w-[400px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Core" value={form.student_branch} onChange={(e) => setForm({ ...form, student_branch: e.target.value })} />
                            </div>
                            <div className='flex'>
                                <label htmlFor="student-rollno" className='text-xl text-start text-gray-800 mx-5'>Student&apos;s roll no</label>
                                <input type="text" id="student-rollno" className="bg-gray-50 border max-w-[400px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="01" value={form.student_rollno} onChange={(e) => setForm({ ...form, student_rollno: e.target.value })} />
                            </div>
                        </div>
                        {/* <div className='w-full flex flex-wrap items-center justify-between gap-2 mt-8 py-5 px-10 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
                        <div className="flex gap-10 flex-wrap">
                            <h2 className='text-xl text-start text-gray-800'>
                                Question: 1
                            </h2>
                            <h3 className='text-xl text-start text-gray-800'>
                                Sub-question: A
                            </h3>
                        </div>
                        <Dragger {...props} className='mx-5'>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined className='text-6xl text-gray-400' />
                            </p>
                            <p className="ant-upload-text px-8">Click or drag file to upload</p>
                            <p className="ant-upload-hint px-8">
                                Upload the student&apos;s paper here.
                            </p>
                        </Dragger>
                        <div className="flex gap-10 flex-wrap">
                            <span className='text-xl text-start text-gray-800'>
                                Minimum marks: 0
                            </span>
                            <span className='text-xl text-start text-gray-800'>
                                Total marks: 5
                            </span>
                        </div>
                    </div> */}
                        {
                            questionData.question_list ?
                                questionData.question_list.map((item, index) => {
                                    return (
                                        <div key={index} className='w-full flex flex-wrap items-center justify-between gap-2 mt-8 py-5 px-10 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
                                            <div className="flex gap-10 flex-wrap">
                                                <h2 className='text-xl text-start text-gray-800'>
                                                    Question: {item.main_question}
                                                </h2>
                                                <h3 className='text-xl text-start text-gray-800'>
                                                    Sub-question: {item.sub_question}
                                                </h3>
                                            </div>
                                            <div>
                                                <Dragger className='mx-5' action='https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188' multiple onChange={async (e) => {
                                                    const body = new FormData();
                                                    const rf = new FileReader();

                                                    rf.readAsDataURL(e.file.originFileObj);
                                                    rf.onload = async function (event) {
                                                        console.log(rf.result);

                                                        body.set('key', '1e324b4ffd7be805484317642e989bbb');
                                                        body.append('image', event.target.result.split(",").pop());

                                                        await axios.post('https://api.imgbb.com/1/upload', body)
                                                            .then(function (response) {
                                                                console.log(response.data.data.display_url);

                                                                setForm({ ...form, list: [...form.list, { answer_url_list: [...form.list.answer_url, response.data.data.display_url], ...item }] });
                                                            })
                                                            .catch(function (error) {
                                                                console.log(error);
                                                                alert(error);
                                                            });
                                                    }
                                                }}
                                                >
                                                    <p className="ant-upload-drag-icon">
                                                        <InboxOutlined className='text-6xl text-gray-400' />
                                                    </p>
                                                    <p className="ant-upload-text px-8">Click or drag file to upload</p>
                                                    <p className="ant-upload-hint px-8">
                                                        Upload the student&apos;s paper here.
                                                    </p>
                                                </Dragger>
                                                {/* <button
                                                className='w-full flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                                            >
                                                Upload
                                            </button> */}
                                            </div>
                                            <div className="flex gap-10 flex-wrap">
                                                <span className='text-xl text-start text-gray-800'>
                                                    Minimum marks: {item.min_marks}
                                                </span>
                                                <span className='text-xl text-start text-gray-800'>
                                                    Total marks: {item.max_marks}
                                                </span>
                                            </div>
                                        </div>
                                    )
                                }
                                )
                                :
                                <span className='text-xl text-start text-gray-800'> Loading... </span>
                        }
                        <div className='w-full max-w-[400px] flex gap-5 items-center justify-center my-10'>
                            <button
                                type='submit'
                                className="w-full flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500"
                            >
                                Finish
                            </button>
                        </div>
                    </form>
                </div>
            </Spin>
        </>
    )
}

export { PaperUpload };



