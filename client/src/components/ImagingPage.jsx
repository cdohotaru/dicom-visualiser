import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { withStyles } from "@material-ui/core/styles";

import CornerstoneTile from "./CornerstoneTile";

import * as instancesActions from "../actions/instancesActions";

const styles = () => ({
    runButton: {
        minWidth: "140px",
    },
    marginLeft: {
        marginLeft: "20px"
    }
});

export class ImagingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            patients: null
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            patients: nextProps.patients
        }
    }

    componentDidMount() {
        if (this.props.studies && this.props.studies.selected) {
            this.props.actions.getInstancesForPatientId(this.props.studies.selected);
        }
    }

    renderNoStudy = () => {
        if (this.props.studies.selected === null) {
            return <p>No study selected. Please select a study first.</p>
        }
        return null;
    }

    render() {
        return <div>
            <div>
                {this.renderNoStudy()}
                <CornerstoneTile imageId={"7969c8f3-1ce35009-2ad17439-ba1e5e65-45b53bfb"} />
            </div>
        </div>
    }
}

function mapStateToProps(state) {
    return {
        patients: state.patients,
        studies: state.studies
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign(
            {},
            instancesActions
        ), dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ImagingPage));