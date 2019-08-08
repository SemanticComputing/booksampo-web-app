import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import { withRouter } from 'react-router-dom';
import compose from 'recompose/compose';
import { Route } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import TopBar from '../components/main_layout/TopBar';
import Main from '../components/main_layout/Main';
import Footer from '../components/main_layout/Footer';
import Message from '../components/main_layout/Message';
import FacetBar from '../components/facet_bar/FacetBar';
import Manuscripts from '../components/perspectives/Manuscripts';
import Works from '../components/perspectives/Works';
import Events from '../components/perspectives/Events';
import Places from '../components//perspectives/Places';
import Actors from '../components//perspectives/Actors';
import All from '../components/perspectives/All';
import InstanceHomePage from '../components/main_layout/InstanceHomePage';
import {
  fetchResultCount,
  fetchPaginatedResults,
  fetchResults,
  fetchResultsClientSide,
  clearResults,
  fetchByURI,
  fetchFacet,
  sortResults,
  updateFacetOption,
  updatePage,
  updateRowsPerPage,
  showError
} from '../actions';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 'auto',
    [theme.breakpoints.up('md')]: {
      height: '100%',
    }
  },
  flex: {
    flexGrow: 1,
  },
  appFrame: {
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
    minWidth: 300,
    //minHeight: 700
  },
  mainContainer: {
    height: 'auto',
    backgroundColor: '#bdbdbd',
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      marginTop: 56,
      height: 'calc(100% - 56px)',
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)',
    },
  },
  // main container is divided into two columns:
  facetBarContainer: {
    height: '100%',
    overflow: 'auto',
    paddingTop: '0px !important',
    paddingBottom: '0px !important'
  },
  resultsContainer: {
    height: '100%',
    overflow: 'auto',
    paddingTop: '0px !important',
    paddingBottom: '0px !important',
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(1)
    },
  },
});

let SemanticPortal = (props) => {
  const { classes, /* browser */ error } = props;
  const perspectives = [
    {
      id: 'manuscripts',
      label: 'Manuscripts',
      desc: 'Physical manuscript objects.'
    },
    {
      id: 'works',
      label: 'Works',
      desc: 'Intellectual content carried out by manuscripts.'
    },
    {
      id: 'events',
      label: 'Events',
      desc: 'Events related to manuscripts.'
    },
    {
      id: 'actors',
      label: 'Actors',
      desc: 'People and institutions related to manuscripts and works.'
    },
    {
      id: 'places',
      label: 'Places',
      desc: 'Places related to manuscripts and works.'
    },
  ];

  const renderPerspective = (perspective, routeProps) => {
    switch(perspective) {
      case 'manuscripts':
        return(
          <Manuscripts
            manuscripts={props.manuscripts}
            places={props.places}
            facetData={props.manuscriptsFacets}
            fetchPaginatedResults={props.fetchPaginatedResults}
            fetchResults={props.fetchResults}
            fetchByURI={props.fetchByURI}
            updatePage={props.updatePage}
            updateRowsPerPage={props.updateRowsPerPage}
            updateFacetOption={props.updateFacetOption}
            sortResults={props.sortResults}
            routeProps={routeProps}
          />
        );
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.appFrame}>
        <Message error={error} />
        <React.Fragment>
          <TopBar
            search={props.clientSideFacetedSearch}
            fetchResultsClientSide={props.fetchResultsClientSide}
            clearResults={props.clearResults}
          />
          <Grid container spacing={1} className={classes.mainContainer}>
            <Route
              exact path="/"
              render={() =>
                <React.Fragment>
                  <Main />
                  <Footer />
                </React.Fragment>
              }
            />
            {perspectives.map(perspective =>
              <React.Fragment key={perspective}>
                <Route
                  path={`/${perspective}/faceted-search`}
                  render={routeProps => {
                    return (
                      <React.Fragment>
                        <Grid item xs={12} md={3} className={classes.facetBarContainer}>
                          <FacetBar
                            facetData={props.manuscriptsFacets}
                            facetClass={perspective}
                            resultClass={perspective}
                            fetchingResultCount={props[perspective].fetchingResultCount}
                            resultCount={props[perspective].resultCount}
                            fetchFacet={props.fetchFacet}
                            fetchResultCount={props.fetchResultCount}
                            updateFacetOption={props.updateFacetOption}
                          />
                        </Grid>
                        <Grid item xs={12} md={9} className={classes.resultsContainer}>
                          {renderPerspective(perspective, routeProps)}
                        </Grid>
                      </React.Fragment>
                    );
                  }}
                />
                <Route
                  path={`/${perspective}/:id`}
                  render={() => {
                    return (
                      <InstanceHomePage />
                    );
                  }}
                />

              </React.Fragment>

            )}


            <Route
              path="/works/faceted-search"
              render={routeProps => {
                return (
                  <React.Fragment>
                    <Grid item xs={12} md={3} className={classes.facetBarContainer}>
                      <FacetBar
                        facetData={props.worksFacets}
                        facetClass='works'
                        resultClass='works'
                        fetchingResultCount={props.works.fetchingResultCount}
                        resultCount={props.works.resultCount}
                        fetchFacet={props.fetchFacet}
                        fetchResultCount={props.fetchResultCount}
                        updateFacetOption={props.updateFacetOption}
                      />
                    </Grid>
                    <Grid item xs={12} md={9} className={classes.resultsContainer}>
                      <Works
                        works={props.works}
                        places={props.places}
                        facetData={props.worksFacets}
                        fetchPaginatedResults={props.fetchPaginatedResults}
                        fetchResults={props.fetchResults}
                        fetchByURI={props.fetchByURI}
                        updatePage={props.updatePage}
                        updateRowsPerPage={props.updateRowsPerPage}
                        sortResults={props.sortResults}
                        routeProps={routeProps}
                      />
                    </Grid>
                  </React.Fragment>
                );
              }}
            />
            <Route
              path="/events/faceted-search"
              render={routeProps => {
                return(
                  <React.Fragment>
                    <Grid item xs={12} md={3} className={classes.facetBarContainer}>
                      <FacetBar
                        facetData={props.eventsFacets}
                        facetClass='events'
                        resultClass='events'
                        fetchingResultCount={props.events.fetchingResultCount}
                        resultCount={props.events.resultCount}
                        fetchFacet={props.fetchFacet}
                        fetchResultCount={props.fetchResultCount}
                        updateFacetOption={props.updateFacetOption}
                      />
                    </Grid>
                    <Grid item xs={12} md={9} className={classes.resultsContainer}>
                      <Events
                        events={props.events}
                        facetData={props.eventsFacets}
                        fetchPaginatedResults={props.fetchPaginatedResults}
                        fetchResults={props.fetchResults}
                        fetchByURI={props.fetchByURI}
                        updatePage={props.updatePage}
                        updateRowsPerPage={props.updateRowsPerPage}
                        sortResults={props.sortResults}
                        routeProps={routeProps}
                      />
                    </Grid>
                  </React.Fragment>
                );
              }}
            />
            <Route
              path="/actors/faceted-search"
              render={routeProps => {
                return(
                  <React.Fragment>
                    <Grid item xs={12} md={3} className={classes.facetBarContainer}>
                      <FacetBar
                        facetData={props.actorsFacets}
                        facetClass='actors'
                        resultClass='actors'
                        fetchingResultCount={props.actors.fetchingResultCount}
                        resultCount={props.actors.resultCount}
                        fetchFacet={props.fetchFacet}
                        fetchResultCount={props.fetchResultCount}
                        updateFacetOption={props.updateFacetOption}
                      />
                    </Grid>
                    <Grid item xs={12} md={9} className={classes.resultsContainer}>
                      <Actors
                        actors={props.actors}
                        places={props.places}
                        facetData={props.actorsFacets}
                        fetchResults={props.fetchResults}
                        fetchPaginatedResults={props.fetchPaginatedResults}
                        fetchByURI={props.fetchByURI}
                        filters={props.manuscriptsFacets.filters}
                        updatePage={props.updatePage}
                        updateRowsPerPage={props.updateRowsPerPage}
                        updateFacetOption={props.updateFacetOption}
                        sortResults={props.sortResults}
                        routeProps={routeProps}
                      />
                    </Grid>
                  </React.Fragment>
                );
              }}
            />
            <Route
              path="/places"
              render={routeProps => {
                return(
                  <React.Fragment>
                    <Grid item xs={12} md={3} className={classes.facetBarContainer}>
                      <FacetBar
                        facetData={props.placesFacets}
                        facetClass='places'
                        resultClass='places'
                        fetchingResultCount={props.places.fetchingResultCount}
                        resultCount={props.places.resultCount}
                        fetchFacet={props.fetchFacet}
                        fetchResultCount={props.fetchResultCount}
                        updateFacetOption={props.updateFacetOption}
                      />
                    </Grid>
                    <Grid item xs={12} md={9} className={classes.resultsContainer}>
                      <Places
                        places={props.places}
                        facetData={props.placesFacets}
                        fetchResults={props.fetchResults}
                        fetchPaginatedResults={props.fetchPaginatedResults}
                        fetchByURI={props.fetchByURI}
                        filters={props.manuscriptsFacets.filters}
                        updatePage={props.updatePage}
                        updateRowsPerPage={props.updateRowsPerPage}
                        sortResults={props.sortResults}
                        routeProps={routeProps}
                      />
                    </Grid>
                  </React.Fragment>
                );
              }

              }
            />
            <Route
              path="/all"
              render={routeProps =>
                <React.Fragment>
                  <Grid item xs={12} md={3} className={classes.facetBarContainer}>

                  </Grid>
                  <Grid item xs={12} md={9} className={classes.resultsContainer}>
                    <All
                      clientSideFacetedSearch={props.clientSideFacetedSearch}
                      routeProps={routeProps}
                    />
                  </Grid>
                </React.Fragment>
              }
            />
          </Grid>
        </React.Fragment>
      </div>
    </div>
  );
};
// <img className={classes.secoLogo} src='img/logos/seco-logo-white-no-background-small.png' alt='SeCo logo'/>
// <img className={classes.heldigLogo} src='img/logos/heldig-logo-small.png' alt='HELDIG logo'/>
// <img className={classes.uhLogo} src='img/logos/university-of-helsinki-logo-white-no-background-small.png' alt='University of Helsinki logo'/>

const mapStateToProps = state => {
  return {
    manuscripts: state.manuscripts,
    manuscriptsFacets: state.manuscriptsFacets,
    works: state.works,
    worksFacets: state.worksFacets,
    events: state.events,
    eventsFacets: state.eventsFacets,
    actors: state.actors,
    actorsFacets: state.actorsFacets,
    places: state.places,
    placesFacets: state.placesFacets,
    clientSideFacetedSearch: state.clientSideFacetedSearch,
    error: state.error
    //browser: state.browser,
  };
};

const mapDispatchToProps = ({
  fetchResultCount,
  fetchPaginatedResults,
  fetchResults,
  fetchResultsClientSide,
  fetchByURI,
  fetchFacet,
  sortResults,
  clearResults,
  updateFacetOption,
  updatePage,
  updateRowsPerPage,
  showError
});

SemanticPortal.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  // browser: PropTypes.object.isRequired,
  manuscripts: PropTypes.object.isRequired,
  manuscriptsFacets: PropTypes.object.isRequired,
  works: PropTypes.object.isRequired,
  worksFacets: PropTypes.object.isRequired,
  events: PropTypes.object.isRequired,
  eventsFacets: PropTypes.object.isRequired,
  actors: PropTypes.object.isRequired,
  actorsFacets: PropTypes.object.isRequired,
  places: PropTypes.object.isRequired,
  placesFacets: PropTypes.object.isRequired,
  clientSideFacetedSearch: PropTypes.object.isRequired,
  fetchResults: PropTypes.func.isRequired,
  fetchResultCount: PropTypes.func.isRequired,
  fetchResultsClientSide: PropTypes.func.isRequired,
  fetchPaginatedResults: PropTypes.func.isRequired,
  fetchByURI: PropTypes.func.isRequired,
  sortResults: PropTypes.func.isRequired,
  clearResults: PropTypes.func.isRequired,
  updatePage: PropTypes.func.isRequired,
  updateRowsPerPage: PropTypes.func.isRequired,
  updateFacetOption: PropTypes.func.isRequired,
  fetchFacet: PropTypes.func.isRequired,
  showError: PropTypes.func.isRequired
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withWidth(),
  withStyles(styles, {withTheme: true}),
)(SemanticPortal);
