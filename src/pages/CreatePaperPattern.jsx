import { Add, Check } from "@mui/icons-material";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Spin } from 'antd';

function CreatePaperPattern() {
    const { name } = useParams();

    const [disabled, setDisabled] = useState(false);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        class_no: '',
        title: '',
        question_list: []
    });
    const [question, setQuestion] = useState({
        main_question: '',
        sub_question: '',
        answer: '',
        min_marks: '',
        max_marks: ''
    });

    const handleAddQuestion = async (e) => {
        e.preventDefault();

        if (question.main_question === '' || question.sub_question === '' || question.answer === '' || question.max_marks <= 0) {
            alert("Please fill all the fields");
            return;
        }

        setForm({
            ...form,
            question_list: [...form.question_list, {
                ...question,
                question_index: questionIndex
            }]
        });

        setQuestionIndex(questionIndex + 1);

        setQuestion({
            main_question: '',
            sub_question: '',
            answer: '',
            min_marks: '',
            max_marks: ''
        });

        setDisabled(true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const paperPattern = {
            class_no: form.class_no,
            subject: name,
            title: form.title,
            question_list: form.question_list
        };

        if (question.main_question !== '' || question.sub_question !== '' || question.answer !== '' || question.max_marks > 0) {
            console.log(question);
            // setForm({
            //     ...form,
            //     question_list: [...form.question_list, {
            //         ...question,
            //         question_index: questionIndex
            //     }]
            // });
            
            // alert("Works perfect here!!");

            // setForm((prev) => {
            //     return {
            //         ...prev,
            //         question_list: [...prev.question_list, {
            //             ...question,
            //             question_index: questionIndex
            //         }]
            //     }
            // });

            paperPattern.question_list.push({
                ...question,
                question_index: questionIndex
            });

            setQuestionIndex(questionIndex + 1);

            setQuestion({
                main_question: '',
                sub_question: '',
                answer: '',
                min_marks: '',
                max_marks: ''
            });
        }

        if (form.class_no === '' || form.title === '' || form.question_list.length === 0) {
            console.log(form);
            alert("Please fill all the fields");
            return;
        }

        setLoading(true);

        const token = localStorage.getItem("token") || sessionStorage.getItem("token");

        await axios.post("https://tutorswan-backend.onrender.com/paper-pattern/create",
            // {
            //     class_no: form.class_no,
            //     subject: name,
            //     title: form.title,
            //     question_list: form.question_list
            // },
            paperPattern,
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

        setLoading(false);

    }

    return (
        <>
            <h1 className='text-4xl font-bold text-center text-gray-800 mt-24'>
                Create Paper Pattern
            </h1>
            <Spin spinning={loading}>
                <div className="w-full flex flex-col gap-5 items-center py-12 px-10">
                    <div className="w-full max-w-[400px]">
                        <label htmlFor="class" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Class</label>
                        <input type="number" id="class" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${disabled ? "cursor-not-allowed" : null}`} placeholder="9" value={form.class_no} onChange={(e) => setForm({ ...form, class_no: e.target.value })} disabled={disabled ? true : false} />
                    </div>
                    <div className="w-full max-w-[400px]">
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                        <input type="text" id="title" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${disabled ? "cursor-not-allowed" : null}`} placeholder="" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} disabled={disabled ? true : false} />
                    </div>
                </div>
                <form className="w-full flex flex-col gap-5 items-center py-1 px-10 lg:hidden" onSubmit={handleSubmit}>
                    <div className="w-full max-w-[400px] flex justify-between">
                        <div className="w-full max-w-[38%]">
                            <label htmlFor="main-question" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Main question number</label>
                            <input type="number" id="main-question" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1" value={question.main_question} onChange={(e) => setQuestion({ ...question, main_question: e.target.value })} />
                        </div>
                        <div className="w-full max-w-[38%]">
                            <label htmlFor="sub-question" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sub question number</label>
                            <input type="number" id="sub-question" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="2" value={question.sub_question} onChange={(e) => setQuestion({ ...question, sub_question: e.target.value })} />
                        </div>
                    </div>
                    <div className="w-full max-w-[400px]">
                        <label htmlFor="answer" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Answer</label>
                        <textarea id="answer" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your answer here..." value={question.answer} onChange={(e) => setQuestion({ ...question, answer: e.target.value })} ></textarea>
                    </div>
                    <div className="w-full max-w-[400px] flex justify-between">
                        <div className="w-full max-w-[38%]">
                            <label htmlFor="min-marks" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Minimum marks</label>
                            <input type="number" id="min-marks" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={question.min_marks} onChange={(e) => setQuestion({ ...question, min_marks: e.target.value })} placeholder="0" />
                        </div>
                        <div className="w-full max-w-[38%]">
                            <label htmlFor="max-marks" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Maximum marks</label>
                            <input type="number" id="max-marks" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={question.max_marks} onChange={(e) => setQuestion({ ...question, max_marks: e.target.value })} placeholder="0" />
                        </div>
                    </div>
                    <div className="w-full max-w-[400px] flex gap-5 items-center justify-between py-5">
                        <button
                            type="button"
                            onClick={handleAddQuestion}
                            className="flex items-center justify-center w-full max-w-[50%] px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        >
                            <Add />
                            Add Question
                        </button>
                        <button
                            type="submit"
                            className="flex items-center justify-center w-full max-w-[50%] px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500"
                        >
                            <Check />
                            Finish
                        </button>
                    </div>
                </form>
                <form className="hidden lg:block" onSubmit={handleSubmit}>
                    <div className="w-full flex flex-wrap items-center justify-between gap-2 py-5 px-10 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                        <div className="w-full max-w-[400px] flex justify-between">
                            <div className="w-full max-w-[38%]">
                                <label htmlFor="main-question" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Main question number</label>
                                <input type="number" id="main-question" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1" value={question.main_question} onChange={(e) => setQuestion({ ...question, main_question: e.target.value })} />
                            </div>
                            <div className="w-full max-w-[38%]">
                                <label htmlFor="sub-question" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sub question number</label>
                                <input type="number" id="sub-question" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="2" value={question.sub_question} onChange={(e) => setQuestion({ ...question, sub_question: e.target.value })} />
                            </div>
                        </div>
                        <div className="w-full max-w-[400px]">
                            <label htmlFor="answer" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Answer</label>
                            <textarea id="answer" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your answer here..." value={question.answer} onChange={(e) => setQuestion({ ...question, answer: e.target.value })} ></textarea>
                        </div>
                        <div className="w-full max-w-[400px] flex justify-between">
                            <div className="w-full max-w-[38%]">
                                <label htmlFor="min-marks" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Minimum marks</label>
                                <input type="number" id="min-marks" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={question.min_marks} onChange={(e) => setQuestion({ ...question, min_marks: e.target.value })} placeholder="0" />
                            </div>
                            <div className="w-full max-w-[38%]">
                                <label htmlFor="max-marks" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Maximum marks</label>
                                <input type="number" id="max-marks" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={question.max_marks} onChange={(e) => setQuestion({ ...question, max_marks: e.target.value })} placeholder="0" />
                            </div>
                        </div>
                        <div className="mt-5 w-full flex justify-center">
                            <button
                                type="button"
                                onClick={handleAddQuestion}
                                className="flex items-center justify-center w-full max-w-[20%] px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                            >
                                <Add />
                                Add Question
                            </button>
                        </div>
                    </div>
                    <div className="mt-10 w-full flex gap-5 items-center justify-center py-5">
                        <button
                            type="submit"
                            className="flex items-center justify-center w-full max-w-[30%] px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500"
                        >
                            <Check />
                            Finish
                        </button>
                    </div>
                </form>
            </Spin>
        </>
    )
}


export { CreatePaperPattern };




