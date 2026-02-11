const Categories = () => {
  return (
    <>
      <section className="text-center mt-15">
        <div>
          <h1 className="font-bold text-5xl text-orange-500">
            OUR CATEGORIES
          </h1>
        </div>

        <div className="m-30">
          <ul className="flex">
            <li className="w-lg text-black p-10 flex flex-col items-start mr-3 hover:shadow-lg shadow-2xl">
              <h3 className="font-bold text-3xl">Text Books</h3>
              <p className="text-xl">Learning Resources</p>
            </li>
            <li className="w-lg bg-blue-300 text-white p-10 flex flex-col items-start mr-3 hover:shadow-lg shadow-2xl">
              <h3 className="font-bold text-3xl">Thriller</h3>
              <p className="text-xl">Intriguing Suspense</p>
            </li>
            <li className="w-lg text-black p-10 flex flex-col items-start mr-3 hover:shadow-lg shadow-2xl">
              <h3 className="font-bold text-3xl">Romance</h3>
              <p className="text-xl">Heartfelt Passion</p>
            </li>
            <li className="w-lg bg-blue-300 text-white p-10 flex flex-col items-start hover:shadow-lg shadow-2xl">
              <h3 className="font-bold text-3xl">Kids Books</h3>
              <p className="text-xl">Imaginative Journeys</p>
            </li>
            
          </ul>
        </div>
      </section>
    </>
  );
};

export default Categories;
