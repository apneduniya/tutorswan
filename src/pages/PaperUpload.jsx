import { InboxOutlined } from '@mui/icons-material';
import { message, Upload } from 'antd';
const { Dragger } = Upload;


function PaperUpload() {

    const props = {
        name: 'file',
        multiple: true,
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    return (
        <>
            <div className='w-full flex flex-col justify-between items-center h-[calc(100vh-56px)]'>
                <div className='w-full flex flex-col justify-between items-center gap-5'>
                    <h1 className='text-4xl font-bold text-start text-gray-800 mt-24 mx-5'>
                        Upload Student&apos;s paper
                    </h1>
                    <div className='w-full flex items-center justify-between gap-2 mt-8 py-5 px-10 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
                        <div className="flex gap-10">
                            <h2 className='text-xl text-start text-gray-800'>
                                Question: 1
                            </h2>
                            <h3 className='text-xl text-start text-gray-800'>
                                Sub-question: A
                            </h3>
                        </div>
                        <div className="flex gap-10">
                            <span className='text-xl text-start text-gray-800'>
                                Minimum marks: 0
                            </span>
                            <span className='text-xl text-start text-gray-800'>
                                Total marks: 5
                            </span>
                        </div>
                    </div>
                </div>
                <Dragger {...props} className='mx-5' style={{ width: '90%' }} >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined className='text-6xl text-gray-400' />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                        banned files.
                    </p>
                </Dragger>
                <div className='w-full flex gap-5 items-center justify-between'>
                    <button type="button" className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">Previous</button>
                    <button type="button" className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">Next</button>
                    <button
                        className="flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500"
                    >
                        Finish
                    </button>
                </div>
            </div>
        </>
    )
}

export { PaperUpload };



