"use client";

import { useEffect, useState } from "react";

export default function PokemonDetails({ url }) {
    const [data, setData] = useState(null);
    const [activeTab, setActiveTab] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!url) return;
        fetchDetails();
    }, [url]);

    async function fetchDetails() {
        setLoading(true);
        setError("");
        setData(null);

        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error();

            const result = await res.json();
            setData(result);
            setActiveTab(result.types[0]?.type.name || "");
        } catch {
            setError("Unable to load Pokémon details.");
        } finally {
            setLoading(false);
        }
    }


    if (!url) {
        return (
            <div className="h-full flex items-center justify-center text-gray-500 p-6">
                Select a Pokémon to view details
            </div>
        );
    }


    if (loading) {
        return (
            <div className="p-6 text-center text-gray-500">
                Loading Pokémon details...
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 text-red-600 bg-red-50 rounded">
                {error}
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="p-6">

            <h2 className="text-2xl font-semibold capitalize mb-4">
                {data.name}
            </h2>


            <div className="flex flex-wrap gap-2 mb-6">
                {data.types.map((item) => {
                    const isActive = activeTab === item.type.name;
                    return (
                        <button
                            key={item.type.name}
                            onClick={() => setActiveTab(item.type.name)}
                            className={`px-4 py-1 rounded-full text-sm capitalize border transition ${isActive
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-gray-100 hover:bg-gray-200"
                                }`}
                        >
                            {item.type.name}
                        </button>
                    );
                })}
            </div>


            <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-50 p-4 rounded">
                    <p className="text-gray-500 mb-1">Game Indices</p>
                    <p className="text-xl font-semibold">
                        {data.game_indices.length}
                    </p>
                </div>

                <div className="bg-gray-50 p-4 rounded">
                    <p className="text-gray-500 mb-1">Total Moves</p>
                    <p className="text-xl font-semibold">
                        {data.moves.length}
                    </p>
                </div>
            </div>
        </div>
    );
}