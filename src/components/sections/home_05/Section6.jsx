import React from "react";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";

const dummyReviews = Array.from({ length: 6 }).map((_, i) => ({
  id: i,
  name: `User ${i + 1}`,
  photo: `https://i.pravatar.cc/150?img=${i + 5}`, // dummy images
  text: "This platform is a game-changer! I'm seeing real returns from solar investments.",
  facebook: "https://facebook.com",
  whatsapp: "https://wa.me/1234567890",
}));

const ReviewSection = () => {
  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-20">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-green-600 mb-10">
        What Our Users Say
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {dummyReviews.map((review) => (
          <div
            key={review.id}
            className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center"
          >
            <img
              src={review.photo}
              alt={review.name}
              className="w-20 h-20 rounded-full mb-4"
            />
            <p className="text-gray-700 mb-4">"{review.text}"</p>
            <div className="flex space-x-4">
              <a
                href={review.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                <FaFacebookF size={18} />
              </a>
              <a
                href={review.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 hover:text-green-600"
              >
                <FaWhatsapp size={20} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewSection;
