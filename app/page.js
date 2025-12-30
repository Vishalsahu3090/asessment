import PokemonTable from "../app/poke/PokemonTable";

export default function PokePage() {
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-semibold mb-4">Pokémon List</h1>
      <PokemonTable />
    </div>
  );
}
