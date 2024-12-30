import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const CloudinaryUpload = ({ initialImageUrl, onUploadSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [dragging, setDragging] = useState(false);

    const fileInputRef = useState(null);

    const handleFileUpload = async (file) => {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", import.meta.env.VITE_APP_CLOUDINARY_UPLOAD_PRESET);

        setLoading(true);

        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME}/image/upload?api_key=${import.meta.env.VITE_APP_CLOUDINARY_API_KEY}`,
                formData
            );
            const imageUrl = response.data.secure_url;
            setImageUrl(imageUrl);
            onUploadSuccess(imageUrl);

            toast.success("Image uploaded successfully!");
        } catch (error) {
            console.error("Error uploading image:", error);
            toast.error("Failed to upload image");
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        handleFileUpload(file);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragging(false);
        const file = event.dataTransfer.files[0];
        handleFileUpload(file);
    };

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="w-full max-w-sm mx-auto flex flex-col items-center space-y-4">
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleClick}
                className={`w-full p-4 border-2 rounded-lg text-center cursor-pointer ${
                    dragging ? "border-indigo-500 bg-indigo-50" : "border-gray-300"
                }`}
            >
                <p className="text-sm text-gray-500">
                    {dragging ? "Drop the file here" : "Drag and drop an image or click to upload"}
                </p>
                <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleImageUpload}
                    className="hidden"
                />
            </div>

            {loading && <p className="text-sm text-gray-500">Uploading...</p>}

            {imageUrl && (
                <div className="mt-4">
                    <img
                        src={imageUrl}
                        alt="Uploaded"
                        className="object-cover rounded-md shadow-md"
                    />
                </div>
            )}

            {initialImageUrl && !imageUrl && (
                <div className="mt-4">
                    <img
                        src={initialImageUrl}
                        alt="Initial"
                        className="object-cover rounded-md shadow-md"
                    />
                </div>
            )}
        </div>
    );
};

export default CloudinaryUpload;
