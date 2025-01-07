import { Helmet } from "react-helmet-async";
import { CiMail } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import SocialLinks from "../components/SocialLinks";

const ContactUsPage = () => {
  return (
    <div className="w-11/12 container mx-auto py-6 lg:py-20">
      <Helmet>
        <title>Contact Us- Rayhan Sohel</title>
      </Helmet>
      <div className="space-y-6 w-full container mx-auto ">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Contact Information Section */}
          <div className="space-y-6 col-span-1">
            <h3 className="mb-4 uppercase text-accent">Contact Info</h3>

            <div className="space-y-4">
              {/* Email */}
              <div className="flex gap-4 items-center">
                <div className="w-20 h-20 rounded-xl bg-base-200 flex items-center justify-center">
                  <CiMail className="text-3xl" />
                </div>
                <div className="flex flex-col">
                  <h3 className="uppercase">Mail Me</h3>
                  <p className="flex items-center">
                    <a
                      href="mailto:arayhanohel@gmail.com"
                      className="hover:text-accent opacity-70"
                    >
                      support@gamercrit.com
                    </a>
                  </p>
                </div>
              </div>
              {/* Phone */}
              <div className="flex gap-4 items-center">
                <div className="w-20 h-20 rounded-xl bg-base-200 flex items-center justify-center">
                  <FiPhone className="text-3xl" />
                </div>
                <div className="flex flex-col">
                  <h3 className="uppercase">Contact Me</h3>
                  <p className="flex items-center">
                    <a
                      href="tel:+8801719403406"
                      className="hover:text-accent opacity-70"
                    >
                      +123 445 6789
                    </a>
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex gap-4 items-center">
                <div className="w-20 h-20 rounded-xl bg-base-200 flex items-center justify-center">
                  <IoLocationOutline className="text-3xl" />
                </div>
                <div className="flex flex-col">
                  <h3 className="uppercase">Location</h3>
                  <p className="flex items-center opacity-70">
                    Dhaka, Bangladesh-1230
                  </p>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <SocialLinks />
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="col-span-1 md:col-span-2 bg-base-200 p-6 rounded-3xl">
            <h3 className="mb-4 uppercase">Send Message</h3>
            <form>
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="input input-sm w-full bg-base-300"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="input input-sm w-full bg-base-300"
                    placeholder="Your Email"
                    required
                  />
                </div>
                <div>
                  <textarea
                    id="message"
                    name="message"
                    className="textarea w-full bg-base-300"
                    placeholder="Type your message here..."
                    rows="5"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-sm btn-primary">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
