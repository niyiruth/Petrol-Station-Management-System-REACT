import "../styles/home-page.scss";
import useAuthRedirect from "../utils/useAuthRedirect";

const HomePage = () => {
  useAuthRedirect();
  const language = "en";
  return (
    <div className="home-page">
      {/* Hero Background */}
      <div className="hero-background"></div>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img
              src="https://pbs.twimg.com/profile_images/1788231088302653440/5xKfAdI8_200x200.jpg"
              width="50"
              height="50"
              alt="RPL"
            />
            RWANDA PREMIER LEAGUE
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="/register">
                  Register
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  Login
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="languageDropdown"
                  data-bs-toggle="dropdown"
                >
                  <i className="fas fa-globe me-1"></i>
                  {language === "en"
                    ? "English"
                    : language === "rw"
                    ? "Kinyarwanda"
                    : "Français"}
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <a className="dropdown-item" href="?lang=en">
                      English
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="?lang=rw">
                      Kinyarwanda
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="?lang=fr">
                      Français
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Floating Soccer Elements */}
      <div className="soccer-element element-1"></div>
      <div className="soccer-element element-2"></div>
      <div className="soccer-element element-3"></div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 hero-content">
              <h1 className="mb-4">Welcome to Fantasy Rwanda Premier League</h1>
              <p className="lead">
                Experience the thrill of Rwanda Premier League - Where Passion
                Meets Performance. Follow live games, fixtures, and stay updated
                with the latest transfers.
              </p>
              <div className="mt-5 d-flex gap-3 justify-content-center">
                <a href="/register" className="btn btn-primary">
                  <i className="fas fa-user-plus me-2"></i> Register
                </a>
                <a href="/login" className="btn btn-secondary">
                  <i className="fas fa-sign-in-alt me-2"></i> Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container text-center">
          <p className="m-0">
            © 2024 Rwanda Premier League. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
