import React from 'react';

import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';

import CornerstoneTile from "./CornerstoneTile";


import * as patientActions from "../actions/patientActions";
import * as utils from "../utils/utils";

const styles = (theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: "10px",
            width: "180px",
            height: "200px",
        },
    },
    instancesList: {
        listStyleType: "none",
        margin: "0 10px 10px 0",
        width: "220px"
    },
    tile: {
        padding: "10px",
    },
    list: {
        padding: "0"
    }
});

export class ImageViewer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    renderInstance = () => {
        const { classes } = this.props;

        const instance = this.props.instance;

        if (!instance) {
            return <p>No image</p>;
        }

        return <li
            className={classes.instancesList}
            key={instance.ID}>
            <Paper
                elevation={3}
            >
                <div className={classes.tile}>
                    <p>Date: {instance.MainDicomTags.InstanceCreationDate}</p>
                    <CornerstoneTile
                        imageId={instance.ID}
                    ></CornerstoneTile>
                </div>
            </Paper>
        </li>
    }

    render() {

        console.log("ImageViewer: ", this.props.instances);

        return <div >
            <p><b>Selected image</b></p>
            {this.renderInstance()}
        </div>
    }
}

export default withStyles(styles)(ImageViewer);