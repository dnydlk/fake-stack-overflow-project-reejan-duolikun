import React, { useState } from 'react';
import './index.css';
import Nav from 'react-bootstrap/Nav';
import ProfileInfo from './profileInfo';
import EditProfile from './editProfile';

const ProfilePage = () => {
    const [activeLink, setActiveLink] = useState('profile');


    const handleNavClick = (eventKey) => {
        setActiveLink(eventKey);
    };

    const handleEditProfile = async () => {
        setActiveLink("edit-profile");
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1>User</h1>
                <div>
                    Member for <span title="2024-01-21 18:20:35Z">3 months</span>
                </div>
            </div>
            <div className="navDiv">
                <Nav variant="pills" activeKey={activeLink} onSelect={handleNavClick}>
                    <Nav.Item>
                        <Nav.Link eventKey="profile">Profile</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="activities">Activities</Nav.Link>
                    </Nav.Item>
                    
                </Nav>
            </div>
            <div className="editProfile">
                {activeLink === 'edit-profile' && <EditProfile />
                    
                }
                {activeLink === 'activities' && (
                    <div>
                        {/* Add content for activities here */}
                    </div>
                )}
                { activeLink === 'profile' && 
                    <ProfileInfo handleEditProfile={ handleEditProfile }/>
                }
            </div>
        </div>
    );
}

export default ProfilePage;
