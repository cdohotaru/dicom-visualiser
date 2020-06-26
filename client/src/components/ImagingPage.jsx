import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { withStyles } from "@material-ui/core/styles";

import Carousel from "./Carousel";

import * as instancesActions from "../actions/instancesActions";

const styles = () => ({
    root: {
        display: "flex",
        flexDirection: "row",
    },
    imageViewerContainer: {
        minWidth: "500px",
        minHeight: "500px",
        marginLeft: "20px",
        backgroundColor: "red"
    },
    carouselContainer: {
        minWidth: "300px",
        height: "1000px",
        // backgroundColor: "green",
        overflow: "auto"
    },
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

    renderCarousel = () => {
        console.log("Instances: ", this.props.instances.images);

        return <Carousel instances={this.props.instances.images}></Carousel>
    }

    renderImagesViewer = () => {
        return <div>Image viewer</div>
    }

    render() {
        const { classes } = this.props;

        return <div className={classes.root}>
            <div className={classes.carouselContainer}>
                {this.renderNoStudy()}
                {this.renderCarousel()}
            </div>
            <div className={classes.imageViewerContainer}>
                {this.renderImagesViewer()}
            </div>
        </div>
    }
}

function mapStateToProps(state) {
    return {
        patients: state.patients,
        studies: state.studies,
        instances: state.instances
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