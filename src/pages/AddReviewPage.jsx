import { useState, useContext } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";

const AddReviewPage = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    coverImage: "",
    title: "",
    description: "",
    rating: "",
    year: "",
    genre: "",
    email: user?.email || "",
    name: user?.displayName || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/add-review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success("Review submitted successfully!");
        setFormData({
          coverImage: "",
          title: "",
          description: "",
          rating: "",
          year: "",
          genre: "",
          email: user?.email || "",
          name: user?.displayName || "",
        });
      } else {
        throw new Error("Failed to submit review");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="p-4">
      <Helmet>
        <title>Add Review - Gamer Crit</title>
      </Helmet>
      <div className="max-w-xl mx-auto my-6 md:my-12 bg-base-200 border border-base-100 rounded-box p-8">
        <h1 className="text-2xl mb-6 text-center">Add a New Review</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none border-none"
              placeholder="Enter game title"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="url"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none border-none"
              placeholder="Enter image URL"
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none border-none"
              rows="4"
              placeholder="Write your review"
              required
            ></textarea>
          </div>
          <div className="mb-4 md:flex md:space-x-4 space-y-5 md:space-y-0">
            <div className="w-full md:w-1/2">
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none border-none"
                placeholder="Rate out of 5"
                min="1"
                max="5"
                required
              />
            </div>
            <div className="w-full md:w-1/2">
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none border-none"
                placeholder="Published year"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <select
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none border-none"
              required
            >
              <option value="">Select a Genre</option>
              <option value="Action">Action</option>
              <option value="RPG">Sport</option>
              <option value="Adventure">Adventure</option>
            </select>
          </div>

          <div className="w-full mb-4">
              <label className="block font-medium mb-2">User Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                readOnly
                className="w-full px-4 py-2 border rounded-md focus:outline-none border-none"
              />
            </div>
            <div className="w-full mb-6">
              <label className="block font-medium mb-2">User Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                readOnly
                className="w-full px-4 py-2 border rounded-md focus:outline-none border-none"
              />
            </div>

          <button
            type="submit"
            className="btn btn-sm text-white bg-pink-600 hover:bg-pink-700 py-2 px-4"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReviewPage;
