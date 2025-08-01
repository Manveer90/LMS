import React from "react";
import { assets, dummyTestimonial } from "../../assets/assets";

const TesttimonialsSection = () => {
  return (
    <div className="pb-14 px-8 md:px-0">
      <h2 className="text-3xl font-medium text-gray-800">Testimonials</h2>
      <p className="md:text-base text-gray-500 mt-3">
        Hear from our learners as they share their journeys of transformations,
        success, and how our <br /> platform has made a difference in their
        lives
      </p>

      <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] px-4 md:px-0 md:my-16 my-10 gap-4">
        {dummyTestimonial.map((testimonial, index) => (
          <div
            className="text-sm text-left border border-gray-500 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5 overflow-hidden"
            key={index}
          >
            <div className="flex items-center gap-4 px-5 py-4 bg-gray-300">
              <img
                className="h-12 w-12 rounded-full"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <h1 className="text-lg font-medium text-gray-800">
                  {testimonial.name}
                </h1>
                <p className="text-gray-800">{testimonial.role}</p>
              </div>
            </div>

            <div className="px-5 pt-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <img
                    className="h-5"
                    key={i}
                    src={
                      i < Math.floor(testimonial.rating)
                        ? assets.star
                        : assets.star_blank
                    }
                    alt="star"
                  />
                ))}
              </div>
              <p className="text-gray-500 mt-5">{testimonial.feedback}</p>
            </div>
            <a href="#" className="text-blue-500 underline px-5"> Read more</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TesttimonialsSection;
