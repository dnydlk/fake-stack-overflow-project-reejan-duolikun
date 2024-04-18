// function getDataCyTest(selector) defined in cypress/support/commands.js
import Input from "../../src/components/main/baseComponents/input";

describe("<Input />", () => {
    it("Input shows title correctly", () => {
        const title = "Question Title";
        const hint = "Limit title to 100 characters or less";
        const id = "formTitleInput";
        const val = "Title of the question";
        const mandatory = true;
        const setState = cy.spy().as("setState");
        const err = "Title cannot be empty";

        cy.mount(
            <Input title={title} hint={hint} id={id} mandatory={mandatory} val={val} setState={setState} err={err} />
        );
        cy.getDataCyTest("fso-input-title").should("contain.text", title + "*");
    });

    it("Input shows hint correctly", () => {
        const title = "Question Title";
        const hint = "Title of the question";
        const id = "formTitleInput";
        const mandatory = true;
        const val = "Title of the question";
        const setState = cy.spy().as("setState");
        const err = "Title cannot be empty";

        cy.mount(
            <Input title={title} hint={hint} id={id} mandatory={mandatory} val={val} setState={setState} err={err} />
        );
        cy.getDataCyTest("fso-input-hint").should("contain.text", hint);
    });

    it("Input shows error correctly", () => {
        const title = "Question Title";
        const hint = "Title of the question";
        const id = "formTitleInput";
        const mandatory = true;
        const val = "Title of the question";
        const setState = cy.spy().as("setState");
        const err = "Title cannot be empty";

        cy.mount(
            <Input title={title} hint={hint} id={id} mandatory={mandatory} val={val} setState={setState} err={err} />
        );
        cy.getDataCyTest("fso-input-error").should("contain.text", err);
    });

    it("Input calls setState correctly", () => {
        const title = "Question Title";
        const hint = "Title of the question";
        const id = "formTitleInput";
        const mandatory = true;
        const val = "";
        const setState = cy.spy().as("setState");
        const err = "Title cannot be empty";

        cy.mount(
            <Input title={title} hint={hint} id={id} mandatory={mandatory} val={val} setState={setState} err={err} />
        );
        cy.get("#formTitleInput")
            .type("t")
            .then(() => {
                cy.wrap(setState).should("have.been.calledWith", "t");
            });
    });
});
