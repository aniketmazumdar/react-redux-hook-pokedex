import "./index.css";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  PokedexDetailsBasicInfo,
  PokedexDetailsCharacteristics,
  PokedexDetailsStrategies,
  PokedexDetailsEvolutionChain,
  PokedexDetailsButtonGroup,
} from "../../";
import { getPokemonBasicDetailsInfo } from "../../../redux/actions";


const mapStateToProps = (state) => {
  return {
    IS_POKEMON_BASIC_DETAILS_PROCESSING: state.IS_POKEMON_BASIC_DETAILS_PROCESSING,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPokemonBasicDetailsInfo: (pokemonId) => dispatch(getPokemonBasicDetailsInfo(pokemonId)),
  };
};

const PokedexDetailsComp = (props) => {
  const {
    pokemonId = null,
    closeModalEvent = null,
    changePokemonEvent = null,
  } = props;
  const [pokemonDetails, setPokemonDetails] = useState({
    id: '',
    formattedId: '',
    name: '',
    img: '',
    gender: '',
    types: [],
    stats: {},
    pokemonDesc: "",
    height: "",
    weight: "",
    eggGroups: "",
    abilities: "",
    weakAgainsts: [],
    firstEvolutionBasicDetails: {},
    secondEvolutionBasicDetails: {},
    thirdEvolutionBasicDetails: {},
    prevPokemonName: "",
    nextPokemonName: "",
  });


  const fetchPokemonDetails = async () => {
    const {
      id,
      formattedId,
      name,
      img,
      gender,
      types,
      stats,
      pokemonDesc,
      height,
      weight,
      eggGroups,
      abilities,
      weakAgainsts,
      firstEvolutionBasicDetails,
      secondEvolutionBasicDetails,
      thirdEvolutionBasicDetails,
      prevPokemonName,
      nextPokemonName,
    } = await props?.getPokemonBasicDetailsInfo(pokemonId).then(res => res);

    await setPokemonDetails({
      id,
      formattedId,
      name,
      img,
      gender,
      types,
      stats,
      pokemonDesc,
      height,
      weight,
      eggGroups,
      abilities,
      weakAgainsts,
      firstEvolutionBasicDetails,
      secondEvolutionBasicDetails,
      thirdEvolutionBasicDetails,
      prevPokemonName,
      nextPokemonName,
    });
  };

  useEffect(() => {
    fetchPokemonDetails();
  }, [pokemonId]);


  return (
    <div className="pokemon-details">
      {pokemonDetails?.pokemonDesc ? (
        <>
          <PokedexDetailsBasicInfo
            compData={{
              id: pokemonDetails?.id,
              formattedId: pokemonDetails?.formattedId,
              name: pokemonDetails?.name,
              img: pokemonDetails?.img,
              types: pokemonDetails?.types,
              pokemonDesc: pokemonDetails?.pokemonDesc,
            }}
            isLoading={props?.IS_POKEMON_BASIC_DETAILS_PROCESSING}
            closeModalEvent={closeModalEvent}
            changePokemonEvent={changePokemonEvent}
          />

          <PokedexDetailsCharacteristics
            compData={{
              height: pokemonDetails?.height,
              weight: pokemonDetails?.weight,
              gender: pokemonDetails?.gender,
              eggGroups: pokemonDetails?.eggGroups,
              abilities: pokemonDetails?.abilities,
              types: pokemonDetails?.types,
              weakAgainsts: pokemonDetails?.weakAgainsts,
            }}
            isLoading={props?.IS_POKEMON_BASIC_DETAILS_PROCESSING}
          />

          <PokedexDetailsStrategies stats={pokemonDetails?.stats} isLoading={props?.IS_POKEMON_BASIC_DETAILS_PROCESSING} />

          <PokedexDetailsEvolutionChain
            compData={{
              firstPokemonBasicDetails: pokemonDetails?.firstEvolutionBasicDetails,
              secondPokemonBasicDetails: pokemonDetails?.secondEvolutionBasicDetails,
              thirdPokemonBasicDetails: pokemonDetails?.thirdEvolutionBasicDetails,
            }}
            isLoading={props?.IS_POKEMON_BASIC_DETAILS_PROCESSING}
          />

          <PokedexDetailsButtonGroup
            compData={{
              prevPokemonName: pokemonDetails?.prevPokemonName,
              nextPokemonName: pokemonDetails?.nextPokemonName,
            }}
            isLoading={props?.IS_POKEMON_BASIC_DETAILS_PROCESSING}
            changePokemonEvent={changePokemonEvent}
          />
        </>
      ) : (
        <h3>Loading</h3>
      )}
    </div>
  );
};

export const PokedexDetails = connect(mapStateToProps, mapDispatchToProps)(PokedexDetailsComp);
