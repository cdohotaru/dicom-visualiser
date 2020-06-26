import React from 'react';

import { withStyles } from "@material-ui/core/styles";

import CornerstoneTile from "./CornerstoneTile";

import * as patientActions from "../actions/patientActions";

const styles = () => ({
    runButton: {
        minWidth: "140px",
    },
    marginLeft: {
        marginLeft: "20px"
    }
});

export class Carousel extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    renderOneTile = (instanceId) => {
        return <CornerstoneTile imageId={instanceId}></CornerstoneTile>
    }

    renderTiles = () => {
        if (!this.props.instances) {
            return <p>No images in this study</p>
        }

        return this.props.instances.map(instance => this.renderOneTile(instance));
    }

    render() {
        return <div>
            {this.renderTiles()}
        </div>
    }
}

export default withStyles(styles)(Carousel);