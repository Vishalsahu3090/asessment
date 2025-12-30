"use client";

import { useEffect, useState } from "react";
import PokemonDetails from "./PokemonDetails";


const LIMIT = 10;

export default function PokemonTable() {
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedUrl, setSelectedUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        loadPokemon();
    }, [page]);

    async function loadPokemon() {
        setLoading(true);
        setError("");

        try {
            const offset = (page - 1) * LIMIT;
            const res = await fetch(
                `https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`
            );

            if (!res.ok) throw new Error();

            const data = await res.json();
            setList(data.results);
            setTotalPages(Math.ceil(data.count / LIMIT));
        } catch {
            setError("Unable to load Pokémon list. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <div className="lg:col-span-2 bg-white shadow rounded-lg p-5">
                <h2 className="text-lg font-semibold mb-4">Pokémon Directory</h2>

                {loading && (
                    <div className="text-center py-6 text-gray-500">
                        Loading Pokémon...
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded mb-4">
                        {error}
                    </div>
                )}

                {!loading && !error && (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full border border-gray-200 rounded">
                                <thead className="bg-gray-100 sticky top-0">
                                    <tr>
                                        <th className="border px-3 py-2 text-left text-sm font-medium">
                                            #
                                        </th>
                                        <th className="border px-3 py-2 text-left text-sm font-medium">
                                            Pokémon Name
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {list.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan="2"
                                                className="text-center py-6 text-gray-500"
                                            >
                                                No Pokémon found
                                            </td>
                                        </tr>
                                    )}

                                    {list.map((item, index) => (
                                        <tr
                                            key={item.name}
                                            className={`hover:bg-blue-50 cursor-pointer ${selectedUrl === item.url ? "bg-blue-100" : ""
                                                }`}
                                            onClick={() => setSelectedUrl(item.url)}
                                        >
                                            <td className="border px-3 py-2 text-sm">
                                                {(page - 1) * LIMIT + index + 1}
                                            </td>
                                            <td className="border px-3 py-2 capitalize text-blue-600 font-medium">
                                                {item.name}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>


                        <div className="flex items-center justify-between mt-5">
                            <button
                                onClick={() => setPage(page - 1)}
                                disabled={page === 1 || loading}
                                className="px-4 py-2 border rounded-md text-sm disabled:opacity-40 hover:bg-gray-100"
                            >
                                Previous
                            </button>

                            <span className="text-sm text-gray-600">
                                Page <strong>{page}</strong> of {totalPages}
                            </span>

                            <button
                                onClick={() => setPage(page + 1)}
                                disabled={page === totalPages || loading}
                                className="px-4 py-2 border rounded-md text-sm disabled:opacity-40 hover:bg-gray-100"
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </div>
            <div className="bg-white shadow rounded-lg">
                <PokemonDetails url={selectedUrl} />
            </div>


        </div>
    );
}
