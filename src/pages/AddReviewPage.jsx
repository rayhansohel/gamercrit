import { useState, useContext } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading.json";

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
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        "https://gamercrit-server.vercel.app/add-review",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <Helmet>
        <title>Add Review - Gamer Crit</title>
      </Helmet>

      {loading ? (
        <div className="flex justify-center mb-4">
          <Lottie animationData={loadingAnimation} className="w-32" />
        </div>
      ) : (
        <div className="max-w-xl mx-auto my-6 md:my-12 bg-base-200 rounded-box p-8">
          <h1 className="text-2xl mb-6 text-center">Add a New Review</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none border-none bg-base-300"
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
                className="w-full px-4 py-2 border rounded-md focus:outline-none border-none bg-base-300"
                placeholder="Enter image URL"
                required
              />
            </div>
            <div className="mb-4">
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none border-none bg-base-300"
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
                  className="w-full px-4 py-2 border rounded-md focus:outline-none border-none bg-base-300"
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
                  className="w-full px-4 py-2 border rounded-md focus:outline-none border-none bg-base-300"
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
                className="w-full px-4 py-2 border rounded-md focus:outline-none border-none bg-base-300"
                required
              >
                <option value="">Select a Genre</option>
                <option value="Action">Action</option>
                <option value="RPG">RPG</option>
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
                className="w-full px-4 py-2 border rounded-md focus:outline-none border-none bg-base-300"
              />
            </div>
            <div className="w-full mb-6">
              <label className="block font-medium mb-2">User Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                readOnly
                className="w-full px-4 py-2 border rounded-md focus:outline-none border-none bg-base-300"
              />
            </div>

            <button
              type="submit"
              className="btn btn-sm text-white btn-accent  py-2 px-4"
            >
              Submit Review
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddReviewPage;
