// function getDataCyTest(selector) defined in cypress/support/commands.js

import Form from "../../src/components/main/baseComponents/form";
import Input from "../../src/components/main/baseComponents/input";
import Textarea from "../../src/components/main/baseComponents/textarea";

describe("<Form />", () => {
    it("Form shows children correctly", () => {
        const setStateSpy = cy.spy().as("setState");
        const children = [
            <Input title="Title" hint="Add title" val="" setState={setStateSpy} err="Title cannot be empty" />,
            <Textarea
                title="Question Text"
                hint="Add details"
                val=""
                setState={setStateSpy}
                err="Text cannot be empty"
            />,
        ];
        cy.mount(<Form>{children}</Form>);
        cy.get(".fso-form").children().should("have.length", children.length);
    });
});
