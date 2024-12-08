import { useState, useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

const UpdateReviewPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams(); // Get the review ID from the URL
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

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!user) {
      toast.error("You must be logged in to update a review.");
      navigate("/auth/login");
      return;
    }

    const fetchReview = async () => {
      try {
        const response = await fetch(
          `https://gamercrit-server.vercel.app/reviews/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch review data");
        }
        const data = await response.json();
        setFormData({
          coverImage: data.coverImage || "",
          title: data.title || "",
          description: data.description || "",
          rating: data.rating || "",
          year: data.year || "",
          genre: data.genre || "",
          email: user?.email || "",
          name: user?.displayName || "",
        });
      } catch (error) {
        console.error("Failed to fetch review", error);
        setErrorMessage("Failed to fetch review data. Please try again.");
      }
    };

    fetchReview();
  }, [id, user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://gamercrit-server.vercel.app/reviews/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        toast.success("Review updated successfully!");
        navigate("/myReviews"); // Redirect to My Reviews page
      } else {
        throw new Error("Failed to update review");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="p-4">
      <Helmet>
        <title>Update Review - Gamer Crit</title>
      </Helmet>
      <div className="max-w-2xl mx-auto my-6 md:my-12 bg-base-200 border border-base-100 rounded-box p-8">
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <h1 className="text-2xl mb-6 text-center">Update Review</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
          <label className="block font-medium mb-2">Game Title</label>
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
          <label className="block font-medium mb-2">Cover Image URL</label>
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
          <label className="block font-medium mb-2">Review</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none border-none"
              rows="8"
              placeholder="Write your review"
              required
            ></textarea>
          </div>
          <div className="mb-4 md:flex md:space-x-4 space-y-5 md:space-y-0">
            <div className="w-full md:w-1/2">
            <label className="block font-medium mb-2">Rating</label>
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
            <label className="block font-medium mb-2">Published</label>
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
          <label className="block font-medium mb-2">Genre</label>
            <select
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none border-none"
              required
            >
              <option value="">Select a Genre</option>
              <option value="Action">Action</option>
              <option value="Sport">Sport</option>
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
            Update Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateReviewPage;

