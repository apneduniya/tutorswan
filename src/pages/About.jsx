import { Link } from "react-router-dom";


function About() {
    return (
        <>
            <section className="h-screen w-full flex items-center justify-center bg-white dark:bg-dark">
                <div className="w-full flex flex-col items-center py-10 px-4 max-w-[800px] text-justify">
                    <span className="block text-lg font-semibold text-[#08823F] mb-4">
                        About Us
                    </span>
                    <h2 className="mb-5 text-3xl font-bold text-body-color sm:text-[40px]/[48px]">
                        Explore the World of Tutor-Swan
                    </h2>
                    <p className="mb-5 text-base text-body-color dark:text-dark-6">
                        Welcome to Tutor-Swan, where education meets innovation! Our mission is to empower learners of all ages, making education accessible, enjoyable, and rewarding.
                    </p>
                    <p className="mb-8 text-base text-body-color dark:text-dark-6">
                        At Tutor-Swan, we believe in the transformative power of personalized learning. Our platform connects students with dedicated tutors, creating a unique and tailored educational experience. We strive to foster a love for learning and help individuals unlock their full academic potential.
                    </p>
                    <p className="mb-8 text-base text-body-color dark:text-dark-6">
                        What sets us apart is our commitment to excellence, innovation, and community. Our team of passionate educators is dedicated to providing high-quality, engaging content that caters to diverse learning styles.
                    </p>
                    <p className="mb-8 text-base text-body-color dark:text-dark-6">
                        Join us on this educational journey, where every question is a step toward knowledge, every challenge is an opportunity for growth, and every student is valued. Let&apos;s make learning an adventure!
                    </p>
                    <Link
                        to="/register"
                        className="inline-flex items-center justify-center py-3 text-base font-medium text-center text-white border border-transparent rounded-md px-7 bg-[#08823F] hover:bg-opacity-90"
                    >
                        Get Started
                    </Link>
                </div>
            </section>
        </>
    )
}


export { About };

