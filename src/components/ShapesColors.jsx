import circle from "../assets/images/shapes/circle.png";
import square from "../assets/images/shapes/square.png";
import triangle from "../assets/images/shapes/triangles.png";

export default function ShapesColors() {
  return (
    <div>
      <img src={circle} alt="Circle" />
      <img src={square} alt="Square" />
      <img src={triangle} alt="Triangle" />
    </div>
  );
}
