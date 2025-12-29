import heroImage from "../assets/images/home/main-hero.png";

export default function HomePage() {
  return (
    <div className="home-container">
      <img
        src={heroImage}
        alt="Choose what you want to learn"
        className="home-hero-image"
      />
    </div>
  );
}
