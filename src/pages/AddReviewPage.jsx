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
      <div className="max-w-2xl mx-auto my-12 bg-base-200 border border-base-100 rounded-box p-8">
        <h1 className="text-2xl mb-6 text-center">Add a New Review</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium mb-2">
              Game Title
            </label>
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
            <label className="block font-medium mb-2">
              Game Cover Image URL
            </label>
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
            <label className="block font-medium mb-2">
              Review Description
            </label>
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
          <div className="mb-4">
            <label className="block font-medium mb-2">Rating</label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none border-none"
              placeholder="Rate the game (1-10)"
              min="1"
              max="10"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">
              Publishing Year
            </label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none border-none"
              placeholder="e.g. 2023"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Genres</label>
            <select
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none border-none"
              required
            >
              <option value="">Select a Genre</option>
              <option value="Action">Action</option>
              <option value="RPG">RPG</option>
              <option value="Adventure">Adventure</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">User Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              className="w-full px-4 py-2 border rounded-md focus:outline-none border-none"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">User Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
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
