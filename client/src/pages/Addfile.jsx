import React, { useState, useRef } from 'react'; 

// Component: Addfile
const Addfile = () => {
  // 1. State Variables
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  //  Event Handlers
  const handleFileSelect = (files) => {
    const newFiles = [...files];
    setSelectedFiles((prevFiles) => {
      const uniqueNewFiles = newFiles.filter(
        (newFile) => !prevFiles.some((existingFile) => existingFile.name === newFile.name)
      );
      return [...prevFiles, ...uniqueNewFiles];
    });
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const handleRemoveFile = (fileNameToRemove) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileNameToRemove));
  };

  const handleUploadFiles = () => {
    if (selectedFiles.length > 0) {
      alert(`Uploading ${selectedFiles.length} file(s): ${selectedFiles.map(f => f.name).join(', ')}`);
      setSelectedFiles([]);
    } else {
      alert('No files selected to upload.');
    }
  };

  // JSX (UI Rendering)
  return (
    <section className="p-6 bg-gray-50 min-h-screen-calc(100vh-20px)">
      <div className="max-w-full  p-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Add New File</h1>

        {/* File Upload Zone */}
        <div
          className={`
            w-full min-h-60 rounded-xl
            border-2 transition-all duration-200 ease-in-out
            flex flex-col justify-center items-center text-center p-6 mb-6
            ${isDragging
              ? 'border-purple-600 bg-purple-50 text-purple-700 shadow-inner'
              : 'border-gray-300 bg-gray-100 text-gray-500 hover:border-purple-400 hover:bg-gray-50'
            }
          `}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleBrowseClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-16 h-16 mb-3 transition-colors duration-200 ${
              isDragging ? 'text-purple-600' : 'text-gray-400'
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 0115.904 4.5H18a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2v-1a1 1 0 011-1h1zm2.828-6.172l3-3m0 0l3 3m-3-3v12"
            />
          </svg>
          <span className="text-xl font-semibold mb-2">Browse or Drag & Drop Files Here</span>
          <p className="text-sm">Supports PDF, DOCX, TXT, CSV, JPG, PNG (Max 50MB)</p>
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
          multiple
        />

        {/* Display Selected Files */}
        {selectedFiles.length > 0 && (
          <div className="mb-6 border-t border-gray-200 pt-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">
              Selected Files ({selectedFiles.length})
            </h2>
            <ul className="space-y-2">
              {selectedFiles.map((file, index) => (
                <li
                  key={file.name + index}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200 text-gray-800 text-sm"
                >
                  <span className="font-medium truncate mr-2">{file.name}</span>
                  <span className="text-gray-500 text-xs">({(file.size / (1024 * 1024)).toFixed(2)} MB)</span>
                  <button
                    onClick={() => handleRemoveFile(file.name)}
                    className="ml-4 text-red-500 hover:text-red-700 transition-colors"
                    title="Remove file"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUploadFiles}
          disabled={selectedFiles.length === 0}
          className={`
            w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 shadow-md
            ${selectedFiles.length > 0
              ? 'bg-gradient-to-tr from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 hover:shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          Upload Files
        </button>
      </div>
    </section>
  );
};

export default Addfile;
