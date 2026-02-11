const Hero = () => {
  return (
    <>
      <div className="min-h-150 bg-blue-200 flex items-center justify-center shadow-xl">
        <div className="max-w-200 mr-50">
          <h1 className="font-bold text-6xl mb-6">
            DISCOVER OUR LATESET BOOK COLLECTIONS
          </h1>
          <p className="text-2xl">
            Unveiling Ancient Narratives and Forgotten Tales: Rediscover
            History's Rich Tapestry through the Lens of world and Wonder.
          </p>

          <button className="shadow-2xl mt-10 bg-orange-500 px-20 py-5 rounded-lg text-white font-bold text-xl hover:bg-orange-400 transition-colors">Explore All</button>
        </div>

        <div className="max-w-100">
          <img
            src="/public/book2.jpg"
            alt="Book cover"
            className="max-h-[500px] object-contain rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          />
        </div>
      </div>
    </>
  );
};

export default Hero;
