import "./index.css";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Grid from "@mui/material/Grid";
import TuneIcon from "@mui/icons-material/Tune";
import {
  Input,
  Dropdown,
  Modal,
  FilterDropdownsMobile,
  FilterStatRanges,
} from "../../";
import { getDropdownPlaceholder } from "../../../utils";
import {
  fetchTypeListFromApi,
  getGenderNameList,
  fetchStatListFromApi,
  filterAttrUpdate,
  filterDataUpdate,
} from "../../../redux/actions";


const mapStateToProps = (state) => {
  return {
    allPokemons: state.allPokemons,
    searchStr: state.searchStr,
    selectedTypes: state.selectedTypes,
    selectedGenders: state.selectedGenders,
    statList: state.statList,
    statRangeMinLevel: state.statRangeMinLevel,
    statRangeMaxLevel: state.statRangeMaxLevel,
    allTypes: state.allTypes
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTypeListFromApi: () => dispatch(fetchTypeListFromApi()),
    getGenderNameList: () => dispatch(getGenderNameList()),
    fetchStatListFromApi: () => dispatch(fetchStatListFromApi()),
    filterAttrUpdate: ({ type, data }) => dispatch(filterAttrUpdate({ type, data })),
    filterDataUpdate: () => dispatch(filterDataUpdate()),
  };
};

const FilterComp = (props) => {
  const [genders, setGenders] = useState([]);
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const [showStatDiv, setShowStatDiv] = useState(false);

  const loadDropdownsData = async () => {
    await props?.fetchTypeListFromApi();

    const genderApiRes = await props?.getGenderNameList();
    setGenders(genderApiRes);

    await props?.fetchStatListFromApi();
  };

  const onChangeFilter = (type, data) => {
    props?.filterAttrUpdate({ type, data });
  };

  const onSubmitFilter = (filterData = {}) => {
    Object.keys(filterData).forEach((name) => {
      onChangeFilter(name, filterData[name]);
    });
  };

  useEffect(() => {
    loadDropdownsData();
  }, []);

  useEffect(() => {
    props?.filterDataUpdate();
  }, [
    props?.searchStr,
    props?.selectedTypes,
    props?.selectedGenders,
    JSON.stringify(props?.statList),
    props?.allPokemons,
  ]);

  return (
    <>
      <Grid container spacing={4}>
        <Grid item md={6} xs={10}>
          <Input
            name="name"
            id="name"
            classes="filter-input"
            label="Search by"
            placeholder="Name or Number"
            onChangeHandler={(e) => onChangeFilter("searchStr", e.target.value)}
            isSearch={true}
          />
        </Grid>

        <Grid item md={6} className="filter-dropdowns-lg">
          <Grid container spacing={4}>
            <Grid item md={4} xs={12}>
              <Dropdown
                name="type"
                id="type"
                classes="filter-dropdown"
                label="Type"
                dataList={props?.allTypes}
                callback={(val) => onChangeFilter("selectedTypes", val)}
                selected={props?.selectedTypes}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <Dropdown
                name="gender"
                id="gender"
                classes="filter-dropdown"
                label="Gender"
                dataList={genders}
                callback={(val) => onChangeFilter("selectedGenders", val)}
                selected={props?.selectedGenders}
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
              onClick={() => setShowStatDiv((prev) => !prev)}
              data-testid="test-stat-wrapper"
            >
              <Input
                name="stat"
                id="stat"
                classes="filter-input"
                label="Stats"
                placeholder={getDropdownPlaceholder(props?.statList)}
                readOnly={true}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={2} xs={2} className="filter-dropdowns-drawer-wrapper">
          <a
            href="#"
            onClick={() => setIsOpenedModal(true)}
            data-testid="test-btn-open-modal"
          >
            <TuneIcon />
          </a>
        </Grid>
      </Grid>

      {showStatDiv && (
        <Grid
          container
          className="stat-ranges-wrap-lg"
          justifyContent="flex-end"
        >
          <Grid item md={6} xs={12}>
            <FilterStatRanges
              dataList={props?.statList}
              minLevel={props?.statRangeMinLevel}
              maxLevel={props?.statRangeMaxLevel}
              closeModalEvent={setShowStatDiv}
              onSubmitEvent={(val) => onChangeFilter("statList", val)}
            />
          </Grid>
        </Grid>
      )}

      {
        /* Filter Dropdowns for only Mobile Screen  */
        <Modal
          size="sm"
          isOpen={isOpenedModal}
          childComp={
            <FilterDropdownsMobile
              types={props?.allTypes}
              checkedTypes={props?.selectedTypes}
              genders={genders}
              checkedGenders={props?.selectedGenders}
              stats={props?.statList}
              minStatLevel={props?.statRangeMinLevel}
              maxStatLevel={props?.statRangeMaxLevel}
              showStatDiv={showStatDiv}
              setShowStatDiv={setShowStatDiv}
              submitFilterValues={onSubmitFilter}
              closeModalEvent={setIsOpenedModal}
            />
          }
        />
      }
    </>
  );
};

export const Filter = connect(mapStateToProps, mapDispatchToProps)(FilterComp);
