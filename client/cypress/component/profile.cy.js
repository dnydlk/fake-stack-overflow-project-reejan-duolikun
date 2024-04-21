// function getDataCyTest(selector) defined in cypress/support/commands.js
import Profile from "../../src/components/main/profilePage/profile";

describe("<Profile />", () => {
    const currentUser = {
        username: "test username",
        location: "test location",
        title: "test title",
        aboutMe: "test aboutMe",
        link: "test link",
    };

    it("Profile loads currently", () => {
        const setCurrentUserSpy = cy.spy().as("setCurrentUserSpy");
        cy.mount(<Profile currentUser={currentUser} setCurrentUser={setCurrentUserSpy} />);
        cy.getDataCyTest("displayname").should("have.value", currentUser.username);
        cy.getDataCyTest("location").should("have.value", currentUser.location);
        cy.getDataCyTest("title").should("have.value", currentUser.title);
        cy.getDataCyTest("about-me").should("have.value", currentUser.aboutMe);
        cy.getDataCyTest("link").should("have.value", currentUser.link);
        cy.getDataCyTest("update-profile-button").should("have.text", "Update Profile");
    });

    it("Profile updates correctly", () => {
        const setCurrentUserSpy = cy.spy().as("setCurrentUserSpy");
        cy.mount(<Profile currentUser={currentUser} setCurrentUser={setCurrentUserSpy} />);
        cy.getDataCyTest("displayname").type(" edited");
        cy.getDataCyTest("location").type(" edited");
        cy.getDataCyTest("title").type(" edited");
        cy.getDataCyTest("about-me").type(" edited");
        cy.getDataCyTest("link").type(" edited");
        cy.getDataCyTest("displayname").should("have.value", currentUser.username + " edited");
        cy.getDataCyTest("location").should("have.value", currentUser.location + " edited");
        cy.getDataCyTest("title").should("have.value", currentUser.title + " edited");
        cy.getDataCyTest("about-me").should("have.value", currentUser.aboutMe + " edited");
        cy.getDataCyTest("link").should("have.value", currentUser.link + " edited");
    });

    it.only("setCurrentUser is called after update", () => {
        const setCurrentUserSpy = cy.spy().as("setCurrentUserSpy");
        cy.mount(<Profile currentUser={currentUser} setCurrentUser={setCurrentUserSpy} />);
        cy.getDataCyTest("update-profile-button").click();
        cy.get("@setCurrentUserSpy").should("have.been.called");
    });
});
