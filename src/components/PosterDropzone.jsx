import React, { useRef } from "react";

const PosterDropzone = ({ image, setImage }) => {
  const inputRef = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImage(ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImage(ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="relative border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary-500 transition"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={() => inputRef.current.click()}
      style={{ minHeight: 180 }}
    >
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleChange}
      />
      {image ? (
        <div className="space-y-4">
          <img
            src={image}
            alt="Uploaded Poster"
            className="w-full max-h-96 object-contain rounded-lg shadow-lg mx-auto"
          />
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-900">Uploaded Poster</p>
            <p className="text-xs text-gray-600">Drag & drop or click to replace</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mx-auto">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 17l4-4 4 4"/><path d="M12 13V7"/></svg>
          </div>
          <div className="space-y-2">
            <p className="text-gray-500">Drag & drop or click to upload poster image</p>
            <p className="text-xs text-gray-400">PNG, JPG, JPEG supported</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PosterDropzone;