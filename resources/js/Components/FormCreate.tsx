import React, { useState } from "react";
import axios from "axios";
type Characters = {
    name: string;
    lastName: string;
    age: number;
    gender: string;
    race: string;
    skinColor: string;
    bodyType: string;
    eyesColor: string;
    hairColor: string;
    height: number;
    weight: number;
    description: string;
    traits: string[];
    strengths: string[];
    imageUrl: string;
    status: string;
    birthPlace: string;
    occupation: string;
    class: string;
};

const FormCreate = () => {
    const [character, setCharacter] = useState<Partial<Characters>>({});
    const [imageFile, setImageFile] = useState<File | null>(null); // Separate state for file
    const [error, setErrors] = useState<Partial<Characters>>({});

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;
        setCharacter((prevCharacter) => ({
            ...prevCharacter,
            [name]: value,
        }));
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImageFile(file);
            // Optionally update the state with file preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setCharacter((prevCharacter) => ({
                    ...prevCharacter,
                    imageUrl: reader.result as string,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Function to handle form submission knowing that I would need to upload image
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("name", character.name || "");
        formData.append("lastName", character.lastName || "");
        formData.append("age", character.age?.toString() || "");
        formData.append("gender", character.gender || "");
        formData.append("race", character.race || "");
        formData.append("skinColor", character.skinColor || "");
        formData.append("bodyType", character.bodyType || "");
        formData.append("eyesColor", character.eyesColor || "");
        formData.append("hairColor", character.hairColor || "");
        formData.append("height", character.height?.toString() || "");
        formData.append("weight", character.weight?.toString() || "");
        formData.append("description", character.description || "");
        formData.append("traits", JSON.stringify(character.traits) || "");
        formData.append("strengths", JSON.stringify(character.strengths) || "");
        if (imageFile) formData.append("image", imageFile);
        formData.append("status", character.status || "");
        formData.append("birthPlace", character.birthPlace || "");
        formData.append("occupation", character.occupation || "");
        formData.append("class", character.class || "");

        try {
            const response = await fetch(
                "http://127.0.0.1:8000/characters/create",
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error(
                    `Network response was not ok: ${response.statusText}`
                );
            }

            const data = await response.json();
            console.log("Character created:", data);
            setCharacter(data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">
                Create a Character Form
            </h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={character.name || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Last Name
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={character.lastName || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label
                        htmlFor="age"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Age
                    </label>
                    <input
                        type="number"
                        name="age"
                        id="age"
                        value={character.age || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label
                        htmlFor="gender"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Gender
                    </label>
                    <input
                        type="text"
                        name="gender"
                        id="gender"
                        value={character.gender || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label
                        htmlFor="race"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Race
                    </label>
                    <input
                        type="text"
                        name="race"
                        id="race"
                        value={character.race || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label
                        htmlFor="skinColor"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Skin Color
                    </label>
                    <input
                        type="text"
                        name="skinColor"
                        id="skinColor"
                        value={character.skinColor || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label
                        htmlFor="bodyType"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Body Type
                    </label>
                    <input
                        type="text"
                        name="bodyType"
                        id="bodyType"
                        value={character.bodyType || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label
                        htmlFor="eyesColor"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Eyes Color
                    </label>
                    <input
                        type="text"
                        name="eyesColor"
                        id="eyesColor"
                        value={character.eyesColor || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label
                        htmlFor="hairColor"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Hair Color
                    </label>
                    <input
                        type="text"
                        name="hairColor"
                        id="hairColor"
                        value={character.hairColor || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label
                        htmlFor="height"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Height
                    </label>
                    <input
                        type="number"
                        name="height"
                        id="height"
                        value={character.height || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label
                        htmlFor="weight"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Weight
                    </label>
                    <input
                        type="number"
                        name="weight"
                        id="weight"
                        value={character.weight || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Description
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        value={character.description || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    ></textarea>
                </div>
                <div>
                    <label
                        htmlFor="traits"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Traits
                    </label>
                    <input
                        type="text"
                        name="traits"
                        id="traits"
                        value={character.traits?.join(", ") || ""}
                        onChange={(e) =>
                            setCharacter({
                                ...character,
                                traits: e.target.value.split(", "),
                            })
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label
                        htmlFor="strengths"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Strengths
                    </label>
                    <input
                        type="text"
                        name="strengths"
                        id="strengths"
                        value={character.strengths?.join(", ") || ""}
                        onChange={(e) =>
                            setCharacter({
                                ...character,
                                strengths: e.target.value.split(", "),
                            })
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label
                        htmlFor="imageUrl"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Image Url
                    </label>
                    <input
                        type="file"
                        name="imageUrl"
                        id="image_url"
                        onChange={handleFileChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label
                        htmlFor="status"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Status
                    </label>
                    <input
                        type="text"
                        name="status"
                        id="status"
                        value={character.status || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label
                        htmlFor="birthPlace"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Birth Place
                    </label>
                    <input
                        type="text"
                        name="birthPlace"
                        id="birth_place"
                        value={character.birthPlace || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label
                        htmlFor="occupation"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Occupation
                    </label>
                    <input
                        type="text"
                        name="occupation"
                        id="occupation"
                        value={character.occupation || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label
                        htmlFor="class"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Class
                    </label>
                    <input
                        type="text"
                        name="class"
                        id="class"
                        value={character.class || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <button
                    type="submit"
                    className="block w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default FormCreate;
