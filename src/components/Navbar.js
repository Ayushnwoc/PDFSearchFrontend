import React, { useRef, useState } from 'react'
import logo from '../assets/images/logo.svg';
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiFileOn } from "react-icons/ci";
import axios from 'axios';
import LoadingCircle from './CircleLoader';


const Navbar = ({ onFileUpload }) => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    setLoading(true);
    const files = event.target.files;
    if (files.length > 0) {
      const name = files[0].name;
      const file = files[0];
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/uploadPDF/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        if (response.data.status === 200) {
          setFileName(name.length > 10 ? name.trim().substring(0, 2) + '..' + name.substring(name.length - 6, name.length) : name);
          console.log('File uploaded successfully:', response.data);
          alert('File uploaded successfully');
          onFileUpload(response.data.file_path);
        }
      } catch (error) {
        alert(error.response.data.detail);
        console.error('Error uploading file:', error);
      }
    }
    console.log(files, fileName);
    setLoading(false);
  };

  return (
    <div className='flex fixed justify-between items-center py-4 px-4 sm:px-8 shadow-md h-[10vh]'>
      <div>
        <img src={logo} alt="" />
      </div>
      <div className='flex'>
        {fileName &&
          <div className="py-2 px-2 sm:px-6 text-sm flex items-center gap-2 cursor-pointer">
            <div className='border border-green-500 px-1 py-1 rounded-md'>
              <CiFileOn className='text-xl text-green-500' />
            </div>
            <span className='text-green-500'>{fileName}</span>
          </div>
        }
        {loading ? <LoadingCircle /> : (
          <div className="border border-black rounded-lg py-2 px-2 sm:py-4 sm:px-6 text-sm flex items-center gap-2 cursor-pointer" onClick={handleButtonClick}>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="application/pdf"
              className="hidden"
              aria-label="File Input"
              multiple={false}
            />
            <IoIosAddCircleOutline className="text-xl" />
            <span className='font-bold hidden sm:inline'>Upload PDF</span>
          </div>
        )}
      </div>
    </div>
  )
}
export default Navbar;
