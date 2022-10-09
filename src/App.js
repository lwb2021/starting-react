import "./App.css";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import PokemonInfo from "./components/PokemonInfo";
import PokemonFilter from "./components/PokemonFilter";
import PokemonTable from "./components/PokemonTable";
import PokemonContext from "./PokemonContext";

const Title = styled.h1`
  text-aligh: center;
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  grid-column-gap: 1rem;
`;

const Container = styled.div`
  margin: auto;
  width: 800px;
  padding-top: 1rem;
`;

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       filter: "",
//       pokemon: [],
//       selectedItem: null,
//     };
//   }

//   componentDidMount() {
//     fetch("http://localhost:3000/starting-react/pokemon.json")
//       .then((resp) => resp.json())
//       .then((data) => this.setState({ ...this.state, pokemon: data }));
//   }

//   render() {
//     return (
//       <Container>
//         <Title>Pokemon Search</Title>
//         <Input
//           value={this.state.filter}
//           onChange={(evt) => {
//             this.setState({ ...this.state, filter: evt.target.value });
//           }}
//         />
//         <TwoColumnLayout>
//           <div>
//             <table width="100%">
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Type</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {this.state.pokemon
//                   .filter((pokemon) =>
//                     pokemon.name.english
//                       .toLocaleLowerCase()
//                       .includes(this.state.filter.toLocaleLowerCase())
//                   )
//                   .slice(0, 20)
//                   .map((pokemon) => (
//                     <PokemonRow
//                       pokemon={pokemon}
//                       key={pokemon.id}
//                       onSelect={(pokemon) =>
//                         this.setState({
//                           ...this.state,
//                           selectedItem: pokemon,
//                         })
//                       }
//                     />
//                   ))}
//               </tbody>
//             </table>
//           </div>
//           {this.state.selectedItem && (
//             <PokemonInfo {...this.state.selectedItem} />
//           )}
//         </TwoColumnLayout>
//       </Container>
//     );
//   }
// }

function App() {
  const [filter, filterSet] = useState("");
  const [pokemon, pokemonSet] = useState([]);
  const [selectedPokemon, selectedPokemonSet] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/starting-react/pokemon.json")
      .then((resp) => resp.json())
      .then((data) => pokemonSet(data));
  }, [filter]);

  return (
    <PokemonContext.Provider
      value={{
        filter,
        filterSet,
        pokemon,
        pokemonSet,
        selectedPokemon,
        selectedPokemonSet,
      }}
    >
      <Container>
        <Title>Pokemon Search</Title>
        <TwoColumnLayout>
          <div>
            <PokemonFilter />
            <PokemonTable />
          </div>
          <PokemonInfo />
        </TwoColumnLayout>
      </Container>
    </PokemonContext.Provider>
  );
}

export default App;
