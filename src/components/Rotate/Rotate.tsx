import { useState, useRef } from "react";
import "./Rotate.css";

const Rotate = () => {
  const [placeholder, setPlaceholder] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [rotation, setRotation] = useState(0); // in degrees
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaceholder(e.target.value);
  };

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
  };

  return (
    <div className="rotate-container">
      <h2>Let's Rotate Text</h2>

      <div>
        <label>Placeholder :</label>
        <input
          type="text"
          placeholder="Enter Placeholder..."
          onChange={handleInputChange}
          value={placeholder}
        />
      </div>

      <div>
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
        width={300}
        height={200}
        style={{ display: "none" }}
      />

      <div>
        {imageUrl && (
          <div className="rotate-img-sec">
            <div>
              <img
                src={imageUrl}
                alt="Generated from canvas"
                style={{ border: "1px solid #ccc", marginTop: "1rem" }}
              />
            </div>
            <div>
              <button
                className="rotate-btn"
                type="button"
                onClick={handleRotate}
                disabled={!placeholder}
              >
                Rotate
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rotate;
