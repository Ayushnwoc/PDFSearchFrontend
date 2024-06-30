import Chat from './components/Chat';
import Navbar from './components/Navbar';
import { useState } from 'react';



const App = () => {
  const [file, setFile] = useState(null);

  const handleFileUpload = (name) => {
    setFile(name);
    console.log(name);
  };


  return (
    <div >
      <Navbar onFileUpload={handleFileUpload} />
      <Chat file={file}  />
    </div>
  );
}

export default App;
