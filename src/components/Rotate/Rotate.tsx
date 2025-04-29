import { useState, useRef, useEffect, useImperativeHandle } from "react";
import "./Rotate.css";

const Rotate = () => {
  const [placeholder, setPlaceholder] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [rotation, setRotation] = useState(0); // in degrees
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploadImageUrl, setUploadImageUrl] = useState<string | null>(null);
  const [upload, setUpload] = useState<boolean>(false);
  const [rotationImage, setRotationImage] = useState<number>(0);
  const imgRef = useRef<HTMLImageElement | null>(null); // Initialize the ref
  const canvasImgRef = useRef<HTMLImageElement | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaceholder(e.target.value);
  };

  //   useEffect(() => {
  //     return () => {
  //       if (uploadImageUrl) {
  //         URL.revokeObjectURL(uploadImageUrl);
  //       }
  //     };
  //   }, [uploadImageUrl]);

  const drawCanvas = (angle: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Fill background
    ctx.fillStyle = "#e0e0e0";
    ctx.fillRect(0, 0, width, height);

    // Translate to center, rotate, draw text, then reset
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.rotate((angle * Math.PI) / 180);

    ctx.fillStyle = "#000";
    ctx.font = "24px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(placeholder || "Placeholder", 0, 0);

    ctx.restore();

    const url = canvas.toDataURL("image/png");
    setImageUrl(url);
  };

  const handleGenerateImage = () => {
    drawCanvas(rotation);
  };

  const handleRotate = () => {
    const newRotation = (rotation + 90) % 360;
    setRotation(newRotation);
    drawCanvas(newRotation);
    handleImageRotate();
  };

  const handleImageRotate = () => {
    setRotationImage((prevRotationImage) => prevRotationImage + 90);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Optionally check if the file is an image
      if (file.type.startsWith("image/")) {
        setSelectedImage(file);
      } else {
        console.error("The selected file is not an image");
      }
    }
  };

  const handleUploadImage = () => {
    if (selectedImage) {
      setUploadImageUrl(URL.createObjectURL(selectedImage));
      setUpload(true);
    } else {
      console.error("No image selected");
    }
  };

  const handleBlur = () => {
    if (imgRef.current) {
      imgRef.current.style.filter = "blur(2px)"; // Apply blur filter if the image is available
    }
  };

  // Download feature is having some bug will work on this after sometime
  const handleDownloadImage = (reference: string) => {
    if (canvasImgRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      let image: HTMLImageElement | HTMLCanvasElement | null = imgRef.current;

      // Choose the reference image based on the passed parameter
      if (reference === "img") {
        image = imgRef.current;
      } else if (reference === "canvas") {
        image = canvasImgRef.current;
      }

      if (
        image &&
        image.complete &&
        image.naturalWidth &&
        image.naturalHeight
      ) {
        const ctx = canvas.getContext("2d");

        if (ctx) {
          // Set canvas size to image size
          canvas.width = image.naturalWidth;
          canvas.height = image.naturalHeight;

          // Apply rotation and blur if any
          ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous content
          ctx.save();
          ctx.translate(canvas.width / 2, canvas.height / 2); // Translate to the center
          ctx.rotate((rotation * Math.PI) / 180); // Apply rotation
          ctx.translate(-canvas.width / 2, -canvas.height / 2); // Translate back to the original position

          // Apply blur filter (if any) directly to the canvas
          ctx.filter = image.style.filter || "none"; // Apply any existing filters (like blur) or set to 'none'

          // Draw the image with transformations (e.g., blur)
          ctx.drawImage(image, 0, 0);

          ctx.restore();

          // Trigger the download
          const link = document.createElement("a");
          link.download = "image.png"; // Set download filename
          link.href = canvas.toDataURL("image/png"); // Convert canvas to data URL (image)
          link.click(); // Trigger download
        }
      } else {
        console.error("Image is not loaded or invalid");
      }
    }
  };

  return (
    <div className="rotate-container">
      <h2>Let's Rotate Text</h2>

      <div className="rotate-upload-container">
        <div>
          <label>Upload Image :</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <div>
          <label>Placeholder :</label>
          <input
            type="text"
            placeholder="Enter Placeholder..."
            onChange={handleInputChange}
            value={placeholder}
          />
        </div>
      </div>

      <div className="rotate-btns-container">
        <button
          type="button"
          className="rotate-generate-btn"
          onClick={handleUploadImage}
        >
          Upload Image
        </button>
        <button
          type="button"
          className="rotate-generate-btn"
          onClick={handleGenerateImage}
        >
          Generate Image
        </button>
      </div>

      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        style={{ display: "none" }}
      />

      <div className="rotate-show-img-container">
        {upload && uploadImageUrl && (
          <div>
            <div>
              <img
                width={400}
                height={300}
                ref={imgRef}
                src={uploadImageUrl}
                alt="Image not available"
                // onClick={() => handleDownloadImage("img")}
                style={{
                  transform: `rotate(${rotationImage}deg)`, // Apply rotation
                  transition: "transform 0.3s ease", // Smooth transition
                  objectFit: "contain", // Ensures the image maintains its aspect ratio
                  width: "300px", // Ensure the width remains fixed
                  height: "300px", // Ensure the height remains fixed
                }}
              />
            </div>
            <div>
              {/* <button
                className="rotate-btn"
                type="button"
                onClick={handleImageRotate}
              >
                Rotate
              </button> */}
            </div>
          </div>
        )}
        {imageUrl && (
          <div className="rotate-img-sec">
            <div>
              <img
                src={imageUrl}
                ref={canvasImgRef}
                alt="Generated from canvas"
                // onClick={() => handleDownloadImage("canvas")}
                style={{ border: "1px solid #ccc", marginTop: "1rem" }}
              />
            </div>
          </div>
        )}
      </div>
      {upload && imageUrl && (
        <div className="rotate-btns-container">
          <button className="rotate-btn" type="button" onClick={handleRotate}>
            Rotate
          </button>
          <button type="button" className="rotate-btn" onClick={handleBlur}>
            Make it Blur
          </button>
        </div>
      )}
    </div>
  );
};

export default Rotate;
