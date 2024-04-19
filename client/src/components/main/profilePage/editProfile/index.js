import { useState } from "react";
import Form from "../../baseComponents/form";
import Input from "../../baseComponents/input";
import Textarea from "../../baseComponents/textarea";

const EditProfile = () => {
    const [displayName, setDisplayName] = useState("");
    const [aboutMe, setAboutMe] = useState("");
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");

    const updateProfileDetails = async () => {

        //const res = await updateProfile(user);
    };

    return (
        <div>
            <Form>
                <h3>Public Information</h3>
                <Input
                    title={"Display Name"}
                    mandatory = { false }
                    id={"displayNameInput"}
                    val={displayName}
                    setState={setDisplayName}
                />
                <Input
                    title={"Title"}
                    mandatory = { false }
                    id={"titleInput"}
                    val={title}
                    setState={setTitle}
                />
                <Textarea
                    title={"About me"}
                    id={"aboutMeInput"}
                    val={aboutMe}
                    setState={setAboutMe}
                />
                <Input
                    title={"Location"}
                    mandatory = { false }
                    id={"location"}
                    val={location}
                    setState={setLocation}
                />
                <div className="fso-btn-indicator-container">
                    <button
                        className="fso-form-post-button"
                        data-cy-test="answer-page-post-answer-button"
                        onClick={() => {
                            updateProfileDetails();
                        }}>
                        Save Profile
                    </button>
                </div>
            </Form>
        </div>
    );
}

export default EditProfile;