import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import InstancePageTable from './InstancePageTable'
import withStyles from '@mui/styles/withStyles'
import { Box, Chip, Divider } from '@mui/material'

const styles = theme => ({})

/**
 * A component for generating a list of tables based on data about an entity.
 */
class InstancePageTableList extends React.Component {
  constructor (props) {
    super(props)
    this.state = { }
  }

  componentDidMount = () => {
    if (this.props.fetchResultsWhenMounted) {
      this.props.fetchResults({
        perspectiveID: this.props.perspectiveConfig.id,
        resultClass: this.props.resultClass,
        facetClass: this.props.facetClass,
        uri: this.props.uri
      })
    }
  }

  render = () => {
    const { data, perspectiveConfig, resultClass } = this.props
    const perspectiveID = perspectiveConfig.id
    return (
      <>
        {data && (Array.isArray(data.object)
          ? data.object.map(o => {
              return (
                <Box
                  key={o.id}
                  sx={theme => ({
                    marginTop: theme.spacing(0.5),
                    marginBottom: theme.spacing(2.5),
                    marginLeft: theme.spacing(0.5),
                    marginRight: theme.spacing(0.5),
                    maxWidth: 1200,
                    width: '100%'
                  })}
                >
                  <Divider
                    sx={theme => ({
                      marginTop: theme.spacing(1),
                      marginBottom: theme.spacing(1)
                    })}
                  >
                    <Chip label={intl.get(`perspectives.${perspectiveID}.${resultClass}.item.label`).toUpperCase()} />
                  </Divider>
                  <InstancePageTable {...this.props} data={o} />
                </Box>
              )
            })
          : (
            <Box
              sx={theme => ({
                marginTop: theme.spacing(0.5),
                marginBottom: theme.spacing(5.0),
                marginLeft: theme.spacing(0.5),
                marginRight: theme.spacing(0.5),
                maxWidth: 1200,
                width: '100%'
              })}
            >
              <Divider
                sx={theme => ({
                  marginTop: theme.spacing(1),
                  marginBottom: theme.spacing(1)
                })}
              >
                <Chip label={intl.get(`perspectives.${perspectiveID}.${resultClass}.item.label`).toUpperCase()} />
              </Divider>
              <InstancePageTable {...this.props} data={data.object} />
            </Box>
            )
        )}
      </>
    )
  }
}

InstancePageTableList.propTypes = {
  classes: PropTypes.object.isRequired,
  resultClass: PropTypes.string.isRequired,
  data: PropTypes.object,
  properties: PropTypes.array.isRequired
}

export const InstanceHomePageTableListComponent = InstancePageTableList

export default withStyles(styles)(InstancePageTableList)
