import React from "react";

const Footer = () => {
  return (
    <footer className="text-white shadow-2xl font-bold bottom-0 w-full "> 
      <div className="container bg-gray-500 mx-auto flex flex-wrap justify-between items-center px-4">
        <div className="w-full sm:w-auto mb-3 sm:mb-0 sm:mr-4">
          <p className="text-sm">
            &copy; 2023 GinaCompany. All rights reserved.
          </p>
        </div>
        <div className="w-full sm:w-auto">
          <a href="#" className="mr-4">
            Privacy & Policy
          </a>
          <a href="#">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

