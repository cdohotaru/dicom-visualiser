import React from 'react';

import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';

import CornerstoneTile from "./CornerstoneTile";

const styles = () => ({
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

export class Carousel extends React.Component {

    renderOneTile = (instance) => {
        const { classes } = this.props;

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
                        onClickHandler={this.props.onClickHandler}
                    ></CornerstoneTile>
                </div>
            </Paper>
        </li>
    }

    renderTiles = () => {
        const { classes } = this.props;

        if (!this.props.instances || this.props.instances.length === 0) {
            return null
        }

        return <div>
            <ul className={classes.list}>
                {this.props.instances.map(instance => this.renderOneTile(instance))}
            </ul>
        </div>
    }

    render() {

        return <div >
            <p><b>Study images</b></p>
            {this.renderTiles()}
        </div>
    }
}

export default withStyles(styles)(Carousel);