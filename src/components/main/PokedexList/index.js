import "./index.css";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { CardBox, Modal, PageLoader, PokedexDetails } from "../../";
import { getSiblingPokemonBasicDetails } from "../../../utils";
import { getPokemonList } from "../../../redux/actions";


const mapStateToProps = (state) => {
  return {
    filteredPokemons: state.filteredPokemons,
    allPokemons: state.allPokemons,
    pokemonListOffset: state.pokemonListOffset,
    IS_POKEMON_LIST_PROCESSING: state.IS_POKEMON_LIST_PROCESSING,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPokemonList: () => dispatch(getPokemonList())
  };
};

const PokedexListComp = (props) => {
  const [isMountModal, setIsMountModal] = useState(false);
  const [selectedPokemonId, setSelectedPokemonId] = useState(null);

  const toggleModal = (flag = false, pokemonId = null) => {
    setIsMountModal(flag);
    setSelectedPokemonId(pokemonId);
  };

  const changePokemon = (flag = null) => {
    const siblingPokemon = getSiblingPokemonBasicDetails(
      props?.allPokemons,
      selectedPokemonId,
      flag
    );
    setSelectedPokemonId(siblingPokemon?.id);
  };

  const handleScrollEvent = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >
      document.documentElement.offsetHeight - 1
    ) {
      if (!props?.IS_POKEMON_LIST_PROCESSING) {
        props?.getPokemonList()
      }
    }
  };

  useEffect(() => {
    props?.getPokemonList();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollEvent);
    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, [props?.pokemonListOffset, props?.IS_POKEMON_LIST_PROCESSING]);

  return (
    <>
      <div className="pokedex-list-wrap">
        <h4>
          Showing {props?.filteredPokemons?.length} of {props?.allPokemons?.length} results
        </h4>

        {props?.filteredPokemons?.length > 0 ? (
          <>
            <div className="pokedex-list" data-testid="test-pokedex-list">
              {props?.filteredPokemons?.map((item, indx) => {
                return (
                  <CardBox
                    key={indx}
                    size={"md"}
                    withCaption={true}
                    compData={{
                      id: item?.id,
                      formattedId: item?.formattedId,
                      name: item?.name,
                      img: item?.img,
                      types: item?.types,
                    }}
                    handleClickEvent={toggleModal}
                    {...{ "data-testid": "test-cardbox-" + indx }}
                  />
                );
              })}
            </div>

            {props?.IS_POKEMON_LIST_PROCESSING && <PageLoader color="grey" text="Loading more items..." />}
          </>
        ) : (
          <h4>No result item found!!</h4>
        )}
      </div>

      {isMountModal && (
        <Modal
          size="md"
          childComp={
            <PokedexDetails
              closeModalEvent={toggleModal}
              changePokemonEvent={changePokemon}
              pokemonId={selectedPokemonId}
            />
          }
        />
      )}
    </>
  );
};

export const PokedexList = connect(mapStateToProps, mapDispatchToProps)(PokedexListComp);
