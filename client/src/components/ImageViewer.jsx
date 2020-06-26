import React from 'react';

import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';

import CornerstoneViewer from "./CornerstoneViewer";


import * as patientActions from "../actions/patientActions";
import * as utils from "../utils/utils";

const styles = (theme) => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        "& > *": {
            padding: "20px",
            margin: "20px"
        },
    },
    instancesViewer: {
        margin: "20px",
        padding: "10px"
    },
    viewContainer: {
        display: "flex",
        flexDirection: "row"
    },
    detailsContainer: {
        marginLeft: "40px",
    },
    detailsInnerContainer: {
        margin: "10px",
        padding: "10px"
    }
});

export class ImageViewer extends React.Component {
    constructor(props) {
        super(props);
    }

    renderInstance = () => {
        const { classes } = this.props;

        const instance = this.props.instance;

        if (!instance) {
            return <p>No image</p>;
        }

        return <div
            key={instance.ID}>
            <Paper
                elevation={3}
            >
                <div className={classes.instancesViewer}>
                    <CornerstoneViewer
                        imageId={instance.ID}
                    ></CornerstoneViewer>
                </div>
            </Paper>
        </div>
    }

    renderDetails = () => {
        const instance = this.props.instance;

        if (!instance) {
            return null;
        }

        const { classes } = this.props;

        return <div className={classes.detailsContainer}>
            <p><b>Image details</b></p>
            <Paper
                elevation={3}
            >
                <div className={classes.detailsInnerContainer}>
                    <p>Creation date: {instance.MainDicomTags.InstanceCreationDate}</p>
                    <p>Creation time: {instance.MainDicomTags.InstanceCreationTime}</p>
                    <p>Image orientation patient: {instance.MainDicomTags.ImageOrientationPatient}</p>
                    <p>Image position patient: {instance.MainDicomTags.ImagePositionPatient}</p>
                    <p>Instance number: {instance.MainDicomTags.InstanceNumber}</p>
                    <p>SOP instance UID: {instance.MainDicomTags.SOPInstanceUID}</p>
                    <p>Instance ID: {instance.ID}</p>
                </div>
            </Paper>
        </div >
    }

    render() {
        const { classes } = this.props;
        console.log("ImageViewer: ", this.props.instances);

        return <div>
            <p><b>Selected image</b></p>
            <div className={classes.viewContainer}>
                <div>
                    {this.renderInstance()}
                </div>
                <div>
                    {this.renderDetails()}
                </div>
            </div>
        </div>
    }
}

export default withStyles(styles)(ImageViewer);