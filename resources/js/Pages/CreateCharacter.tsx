import React from "react";
// Function to the page that creates characters calling the form to create the character
import FormCreate from "../Components/FormCreate";

const CreateCharacter = () => {
    return (
        <div>
            <FormCreate /> {/* Render FormCreate as a JSX component */}
        </div>
    );
};

export default CreateCharacter;
