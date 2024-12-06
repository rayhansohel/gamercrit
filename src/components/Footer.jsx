
const Footer = () => {


  return (
    <div className="w-11/12 m-auto bg-base-200 rounded-box py-2 px-4 h-16 flex justify-center items-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Gamer Crit. All rights reserved.
        </p>
    </div>
  );
};

export default Footer;
