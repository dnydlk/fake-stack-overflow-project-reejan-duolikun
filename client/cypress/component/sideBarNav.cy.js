// function getDataCyTest(selector) defined in cypress/support/commands.js

import SideBarNav from "../../src/components/main/sideBarNav";

describe("<SideBarNav />", () => {
    it("SideBarNav shows Questions, Tags and user profile buttons", () => {
        const selected = "q";
        const handleQuestionsSpy = cy.spy().as("handleQuestionsSpy");
        const handleTagsSpy = cy.spy().as("handleTagsSpy");
        cy.mount(<SideBarNav selected={selected} handleQuestions={handleQuestionsSpy} handleTags={handleTagsSpy} />);
        cy.getDataCyTest("nav-profile").should("exist");
        cy.getDataCyTest("nav-question").should("exist");
        cy.getDataCyTest("nav-tag").should("exist");
    });

    it("SideBarNav shows Questions button selected", () => {
        const selected = "q";
        const handleQuestionsSpy = cy.spy().as("handleQuestionsSpy");
        const handleTagsSpy = cy.spy().as("handleTagsSpy");
        cy.mount(<SideBarNav selected={selected} handleQuestions={handleQuestionsSpy} handleTags={handleTagsSpy} />);
        cy.getDataCyTest("nav-question").should("have.class", "fso-menu-selected");
    });

    it("SideBarNav shows Tag button selected", () => {
        const selected = "t";
        const handleQuestionsSpy = cy.spy().as("handleQuestionsSpy");
        const handleTagsSpy = cy.spy().as("handleTagsSpy");
        cy.mount(<SideBarNav selected={selected} handleQuestions={handleQuestionsSpy} handleTags={handleTagsSpy} />);
        cy.getDataCyTest("nav-tag").should("have.class", "fso-menu-selected");
    });

    it("SideBarNav shows Profile button selected", () => {
        const selected = "p";
        const handleQuestionsSpy = cy.spy().as("handleQuestionsSpy");
        const handleTagsSpy = cy.spy().as("handleTagsSpy");
        cy.mount(<SideBarNav selected={selected} handleQuestions={handleQuestionsSpy} handleTags={handleTagsSpy} />);
        cy.getDataCyTest("nav-profile").should("have.class", "fso-menu-selected");
    });

    it("handleQuestions called when Questions button is clicked", () => {
        const selected = "";
        const handleQuestionsSpy = cy.spy().as("handleQuestionsSpy");
        const handleTagsSpy = cy.spy().as("handleTagsSpy");
        cy.mount(<SideBarNav selected={selected} handleQuestions={handleQuestionsSpy} handleTags={handleTagsSpy} />);
        cy.getDataCyTest("nav-question").click();
        cy.get("@handleQuestionsSpy").should("have.been.called");
    });

    it("handleTags called when Tags button is clicked", () => {
        const selected = "";
        const handleQuestionsSpy = cy.spy().as("handleQuestionsSpy");
        const handleTagsSpy = cy.spy().as("handleTagsSpy");
        cy.mount(<SideBarNav selected={selected} handleQuestions={handleQuestionsSpy} handleTags={handleTagsSpy} />);
        cy.getDataCyTest("nav-tag").click();
        cy.get("@handleTagsSpy").should("have.been.called");
    });
	
	it("handleProfile called when Profile button is clicked", () => {
        const selected = "";
        const handleQuestionsSpy = cy.spy().as("handleQuestionsSpy");
        const handleTagsSpy = cy.spy().as("handleTagsSpy");
        const handleProfileSpy = cy.spy().as("handleProfileSpy");
        cy.mount(
            <SideBarNav
                selected={selected}
                handleQuestions={handleQuestionsSpy}
                handleTags={handleTagsSpy}
                handleProfile={handleProfileSpy}
            />
        );
        cy.getDataCyTest("nav-profile").click();
        cy.get("@handleProfileSpy").should("have.been.called");
    });
});
