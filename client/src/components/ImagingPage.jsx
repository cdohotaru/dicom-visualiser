import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { withStyles } from "@material-ui/core/styles";

import Carousel from "./Carousel";
import ImageViewer from "./ImageViewer";

import * as instancesActions from "../actions/instancesActions";
import { Paper } from '@material-ui/core';

const styles = () => ({
    bottomContainer: {
        display: "flex",
        flexDirection: "row",
        marginTop: "15px"
    },
    imageViewerContainer: {
        minWidth: "600px",
        minHeight: "600px",
        marginLeft: "15px",
    },
    carouselContainer: {
        minWidth: "300px",
        height: "1200px",
        overflow: "auto"
    },
    patientDetailsContainer: {
        margin: "0 10px 10px 10px",
        padding: "10px",
        lineHeight: "1"
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

    onTileClickHandler = (id) => {
        console.log("IP: ", id);
        this.props.actions.selectInstance(id);
    }

    renderNoStudy = () => {
        if (this.props.studies.selected === null) {
            return <p>No study selected. Please select a study first.</p>
        }
        return null;
    }

    renderCarousel = () => {
        if (this.props.studies.selected === null) {
            return null;
        }
        console.log("Instances: ", this.props.instances.images);

        return <Carousel
            instances={this.props.instances.images}
            onClickHandler={this.onTileClickHandler}
        ></Carousel>
    }

    renderImagesViewer = () => {
        if (this.props.studies.selected === null) {
            return null;
        }

        let selectedInstance = this.props.instances.selected ? this.props.instances.selected : this.props.instances.images[0];
        return <ImageViewer instance={selectedInstance}></ImageViewer>
    }

    renderPatient = () => {
        if (this.props.studies.selected === null) {
            return null;
        }

        const { classes } = this.props;
        const patient = this.props.patients.filter(patient => patient.id === this.props.studies.selected)[0];


        return <div>
            <p><b>Patient details</b></p>
            <Paper
                elevation={3}>
                <div className={classes.patientDetailsContainer}>
                    <p>Name: {patient.name}</p>
                    <p>ID: {patient.id}</p>
                    <p>Last update: {patient.lastUpdate}</p>
                    <p>Sex: {patient.sex ? patient.sex : "not set"}</p>
                    <p>Birth date: {patient.birthDate ? patient.birthDate : "not set"}</p>
                    <p>Study id: {patient.studyId}</p>
                </div>
            </Paper>
        </div>
    }

    render() {
        const { classes } = this.props;

        return <div >
            <div>
                {this.renderPatient()}
            </div>
            <div className={classes.bottomContainer}>
                <div className={classes.carouselContainer}>
                    {this.renderNoStudy()}
                    {this.renderCarousel()}
                </div>
                <div className={classes.imageViewerContainer}>
                    {this.renderImagesViewer()}
                </div>
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