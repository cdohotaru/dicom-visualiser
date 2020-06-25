import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(100),
            height: theme.spacing(100),
        },
    },
}));

export default function StudyDetails(params) {
    const classes = useStyles();

    const handleClick = () => {
        if (params.onClick) {
            params.onClick(params.data.ParentPatient);
        }
    };

    if (params.data && params.data.ParentPatient) {
        return <div className={classes.root}>
            <div>
                <div>
                    <p><b>Study Details</b></p>
                    <p>Patient id: {params.data.ParentPatient}</p>
                    <p>Main Dicom Tags:</p>
                    <p>Accession Number: {params.data.MainDicomTags.AccessionNumber ? params.data.MainDicomTags.AccessionNumber : "mising"}</p>
                    <p>Institution Name: {params.data.MainDicomTags.InstitutionName ? params.data.MainDicomTags.InstitutionName : "mising"}</p>
                    <p>Study date: {params.data.MainDicomTags.StudyDate ? params.data.MainDicomTags.StudyDate : "missing"}</p>
                    <p>Study description: {params.data.MainDicomTags.StudyDescription ? params.data.MainDicomTags.StudyDescription : "missing"}</p>
                    <p>Study ID: {params.data.MainDicomTags.StudyID ? params.data.MainDicomTags.StudyID : "missing"}</p>
                </div>
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleClick}
                    >
                        Select study
                    </Button>
                </div>
            </div>
        </div>
    } else {
        return <div>
            <p>Loading ...</p>
        </div>
    }
}