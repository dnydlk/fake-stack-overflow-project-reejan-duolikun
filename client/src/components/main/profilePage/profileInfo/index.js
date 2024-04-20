const ProfileInfo = ({ handleEditProfile }) => {
    return (
        <div className="profile-info">
            <h3>Profile Information</h3>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="displayName">Display Name:</label>
                        <div id="displayName">John Doe</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <div id="title">Software Engineer</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="aboutMe">About me:</label>
                        <div id="aboutMe">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Location:</label>
                        <div id="location">New York, USA</div>
                    </div>
                    <button className="fso-blue-btn" onClick={handleEditProfile}>
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;
