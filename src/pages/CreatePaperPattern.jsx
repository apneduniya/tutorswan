import { Add, Check } from "@mui/icons-material";


function CreatePaperPattern() {
    return (
        <>
            <h1 className='text-4xl font-bold text-center text-gray-800 mt-24'>
                Create Paper Pattern
            </h1>
            <div className="w-full flex flex-col gap-5 items-center py-12 px-10">
                <div className="w-full max-w-[400px]">
                    <label htmlFor="class" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Class</label>
                    <input type="number" id="class" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="9" />
                </div>
                <div className="w-full max-w-[400px]">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                    <input type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
                </div>
            </div>
            <div className="w-full flex flex-col gap-5 items-center py-1 px-10">
                <div className="w-full max-w-[400px]">
                    <label htmlFor="main-question" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Main question number</label>
                    <input type="number" id="main-question" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1" />
                </div>
                <div className="w-full max-w-[400px]">
                    <label htmlFor="sub-question" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sub question number</label>
                    <input type="number" id="sub-question" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="2" />
                </div>
                <div className="w-full max-w-[400px]">
                    <label htmlFor="answer" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Answer</label>
                    <textarea id="answer" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your answer here..."></textarea>
                </div>
                <div className="w-full max-w-[400px] flex justify-between">
                    <div className="w-full max-w-[38%]">
                        <label htmlFor="min-marks" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Minimum marks</label>
                        <input type="number" id="min-marks" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className="w-full max-w-[38%]">
                        <label htmlFor="max-marks" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Maximum marks</label>
                        <input type="number" id="max-marks" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                </div>
                <div className="w-full max-w-[400px] flex gap-5 items-center justify-between py-5">
                    <button
                        className="flex items-center justify-center w-full max-w-[50%] px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    >
                        <Add />
                        Add Question
                    </button>
                    <button
                        className="flex items-center justify-center w-full max-w-[50%] px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500"
                    >
                        <Check />
                        Finish
                    </button>
                </div>
            </div>
        </>
    )
}


export { CreatePaperPattern };




