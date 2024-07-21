import { useEffect, useState } from "react";

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

export default function MainPage() {
    const [characters, setCharacters] = useState<Characters[]>([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/characters")
            .then((response) => response.json())
            .then((data) => setCharacters(data));
    });

    return (
        <div>
            <h1>Home</h1>
            <p>Welcome to the home page!</p>
            <p>{JSON.stringify(characters)}</p>
        </div>
    );
}
