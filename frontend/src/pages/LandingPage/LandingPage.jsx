
import './LandingPage.css'

function LandingPage() {
  return (
    <div className="hero">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Apna Video Call</div>

        <div className="nav-links">
          <a href="#">Join as Guest</a>
          <a href="#">Register</a>
          <button className="login-btn">Login</button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-content">

        {/* Left side text */}
        <div className="hero-text">
          <h1>
            Connect with your <br />
            <span>Loved Ones</span>
          </h1>

          <p>
            Cover a distance by apna video call
          </p>

          <button className="cta-btn">Get Started</button>
        </div>

        {/* Right side images */}
        <div className="hero-images">
          <div className="card card1"></div>
          <div className="card card2"></div>
        </div>

      </div>
    </div>
  )
}

export default LandingPage