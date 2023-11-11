import React from "react";
import loginBackground from "../../assets/img/login-background.jpg";

function Picks() {
  const imageUrl = "/img/login-background.jpg";
  const items = [
    {
      title: "Back to black",
      text: "Description for Item 1",
      imageUrl:
        "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
    },
    {
      title: "Carry the day",
      text: "Description for Item 2",
      imageUrl:
        "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
    },
    {
      title: "Look & feel great",
      text: "Description for Item 3",
      imageUrl:
        "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
    },
    {
      title: "Fashion meet function",
      text: "Description for Item 4",
      imageUrl:
        "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
    },
  ];

  return (
    <>
      <div className="w-ful flex justify-center align-middle ">
        <p className="font-bold">Curated Picks</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-8 ">
        {items.map((item, index) => (
          <div
            key={index}
            className="relative bg-cover bg-center h-40 md:h-60 lg:h-80 xl:h-96"
            style={{
              backgroundImage: `url(${item.imageUrl})`,
            }}
          >
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white text-center">
              <div>
                <h1 className="text-xl  xl:text-2xl font-bold mb-4">
                  {item.title}
                </h1>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Picks;
