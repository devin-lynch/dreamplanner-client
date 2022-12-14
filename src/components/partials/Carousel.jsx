export default function Carousel({ isWide }) {
    return (
        <div>
            <br></br>
            <div className='flex justify-center'>
                <div id="carouselExampleCaptions" className={`carousel slide relative w-full max-w-[53rem] drop-shadow-lg ${isWide ? 'float-right' : ''}`}  data-bs-ride="carousel">
                    <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-2">
                        <button
                            type="button"
                            data-bs-target="#carouselExampleCaptions"
                            data-bs-slide-to="0"
                            className="active"
                            aria-current="true"
                            aria-label="Slide 1"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#carouselExampleCaptions"
                            data-bs-slide-to="1"
                            aria-label="Slide 2"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#carouselExampleCaptions"
                            data-bs-slide-to="2"
                            aria-label="Slide 3"
                        ></button>
                    </div>

                    <div className="carousel-inner relative w-full overflow-hidden">
                        <div className="carousel-item active relative float-left w-full">
                            <img
                                src="https://i.imgur.com/IqpIf8N.jpg"
                                // className="block w-full h-96 object-cover align-middle"
                                className="aspect-video block w-full object-cover align-middle"
                                alt="..."
                            />
                        </div>

                        <div className="carousel-item relative float-left w-full">
                            <img
                                src="https://i.imgur.com/pUY87ZV.png"
                                className="aspect-video block w-full object-cover align-middle"
                                alt="..."
                            />
                        </div>

                        <div className="carousel-item relative float-left w-full">
                            <img
                                src="https://i.imgur.com/4dHKOHA.png"
                                // className="block w-full h-96 object-cover align-middle"
                                className="aspect-video block w-full object-cover align-middle"
                                alt="..."
                            />
                        </div>
                    </div>

                    <button
                        className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
    )
}