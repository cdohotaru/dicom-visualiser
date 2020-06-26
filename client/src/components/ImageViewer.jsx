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
        // {
        //     "FileSize": 242822,
        //     "FileUuid": "131b106f-1bd7-459b-8caa-6b718729490c",
        //     "ID": "9cc915b5-45f10448-362710fd-a5c094d9-629b2643",
        //     "IndexInSeries": 2,
        //     "MainDicomTags": {
        //        "AcquisitionNumber": "1",
        //        "ImageOrientationPatient": "0.999841\\0.000366209\\0.0178227\\-0.000427244\\0.999995\\0.00326545",
        //        "ImagePositionPatient": "-149.113\\-118.513\\-56.5472",
        //        "InstanceCreationDate": "20070101",
        //        "InstanceCreationTime": "120000.000000",
        //        "InstanceNumber": "2",
        //        "SOPInstanceUID": "1.2.826.0.1.3680043.8.1055.1.20111103111148859.85977088.56107499"
        //     },
        //     "ParentSeries": "955c729e-c9eb72b5-9f54451d-e21321c2-bd1c5f5e",
        //     "Type": "Instance"
        //  },
        return <div className={classes.detailsContainer}>
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