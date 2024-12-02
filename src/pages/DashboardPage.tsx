import { useState } from "react";
import "../styles/dashboard-page.scss";
import { API_URL, logout } from "../utils/constants";
import useAuthRedirect from "../utils/useAuthRedirect";

const DashboardPage = () => {
  const { user } = useAuthRedirect(true);

  const [uploading, setUploading] = useState(false);

  if (!user) return null;
  return (
    <div className="dashboard-page">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              src="https://pbs.twimg.com/profile_images/1788231088302653440/5xKfAdI8_200x200.jpg"
              width="40"
              height="40"
              alt="rpl"
            />
            RWANDA PREMIER LEAGUE
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="/users">
                  <i className="fas fa-users me-2"></i>Players
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/logout" onClick={logout}>
                  <i className="fas fa-sign-out-alt me-2"></i>Logout
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="languageDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  <i className="fas fa-globe me-2"></i> English
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

      <div className="container mt-4">
        <div className="row gy-4">
          <div className="col-md-4">
            <div className="stats-card">
              <div className="d-flex align-items-center">
                <div className="stats-icon">
                  <i className="fas fa-futbol"></i>
                </div>
                <div>
                  <h6>Total Matches</h6>
                  <h3>240</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="stats-card">
              <div className="d-flex align-items-center">
                <div className="stats-icon">
                  <i className="fas fa-users"></i>
                </div>
                <div>
                  <h6>Total Players</h6>
                  <h3>450</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="stats-card">
              <div className="d-flex align-items-center">
                <div className="stats-icon">
                  <i className="fas fa-trophy"></i>
                </div>
                <div>
                  <h6>League Position</h6>
                  <h3>3rd</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 mt-4">
            <div className="player-card">
              <div className="card-header">
                <h3>
                  <i className="fas fa-user-circle me-2"></i>Player Information
                </h3>
              </div>
              <div className="card-body">
                <div className="info-item">
                  <div className="info-icon">
                    <i className="fas fa-user"></i>
                  </div>
                  <div>
                    <small>Name</small>
                    <div>
                      {user.firstName} {user.lastName}
                    </div>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <small>Email</small>
                    <div>{user.email}</div>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon">
                    <i className="fas fa-user-shield"></i>
                  </div>
                  <div>
                    <small>Role</small>
                    <div>{user.roles[0].name}</div>
                  </div>
                </div>

                {user.profilePicture ? (
                  <div className="profile-picture-card mx-auto">
                    <img
                      src={
                        API_URL +
                        "/download-profile?fileName=" +
                        user.profilePicture.replace(/\\/g, '/')
                      }
                      className="card-img-top"
                      alt="Profile Picture"
                    />
                    <div className="card-body text-center">
                      <a
                        href={
                          API_URL +
                          "/download-profile?fileName=" +
                          user.profilePicture.replace(/\\/g, '/')
                        }
                        className="btn btn-primary"
                        download={user.firstName + " " + user.lastName}
                      >
                        <i className="fas fa-download me-2"></i>Download
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="profile-picture-card mx-auto">
                    <img
                      src="https://via.placeholder.com/250"
                      className="card-img-top"
                      alt="Profile Picture"
                    />
                  </div>
                )}

                <div className="upload-form">
                  <form
                    method="post"
                    encType="multipart/form-data"
                    onSubmit={(e: any) => {
                      e.preventDefault();
                      if (uploading) return;

                      const formData: any = new FormData();
                      const profilePicture = e.target.profilePicture.files[0];
                      if (!profilePicture) return;
                      formData.append("profilePicture", profilePicture);
                      formData.append("userId", user.id);

                      setUploading(true);

                      fetch(API_URL + "/uploadProfilePicture", {
                        method: "POST",
                        body: formData,
                      })
                        .then((res) => res.json())
                        .then((data) => {
                          if (data.success) {
                            // Get user from localStorage and update profilePic
                            const localUSer = localStorage.getItem("user");
                            if (!localUSer) {
                              window.location.reload();
                              return;
                            }

                            const user = JSON.parse(localUSer);
                            user.profilePicture = data.profilePicture;
                            localStorage.setItem("user", JSON.stringify(user));

                            //
                            alert("Profile picture uploaded successfully");
                            window.location.reload();
                          } else {
                            alert("Failed to upload profile picture");
                          }
                        })
                        .catch((err) => {
                          console.error(err);
                          alert("Failed to upload profile picture");
                        })
                        .finally(() => {
                          setUploading(false);
                        });
                    }}
                  >
                    <div className="mb-3">
                      <label htmlFor="profilePicture" className="form-label">
                        <i className="fas fa-upload me-2"></i>Upload New Profile
                        Picture
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        id="profilePicture"
                        name="profilePicture"
                        accept="image/*"
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      <i className="fas fa-cloud-upload-alt me-2"></i>
                      {uploading ? "Uploading..." : "Upload"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
