import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { withStyles } from "@material-ui/core/styles";

import PatientsTable from "./PatientsTable";

import * as patientActions from "../actions/patientActions";
import * as studiesActions from "../actions/studiesActions";

import StudyDetails from './StudyDetails';

const styles = () => ({
    runButton: {
        minWidth: "140px",
    },
    marginLeft: {
        marginLeft: "20px"
    }
});

export class PatientsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            patients: null,
            currentStudy: null,
            currentPatient: null
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            patients: nextProps.patients
        }
    }

    componentDidMount() {
        this.props.actions.getPatientIds();
    }

    onPatientSelect = (patientId) => {
        let filtered = this.state.patients.filter(patient => patient.id === patientId);
        if (filtered && filtered.length > 0) {
            this.setState({
                currentPatient: filtered[0],
                currentStudy: null
            });

            this.props.actions.getStudyWithId(filtered[0].studyId);
        }
    }

    onStudySelect = (studyId) => {
        this.setState({
            currentStudy: studyId
        });
        this.props.actions.selectStudy(studyId);
    }

    renderStudySelected = () => {
        if (this.state.currentStudy) {
            return <p>You have selected this study. Click on the Imaging tab to see the instances.</p>
        }
        return null;
    }

    renderStudyDetails = () => {
        if (!this.state.currentPatient || this.props.studies.length === 0) {
            return <p>Please select a patient</p>
        } else {
            let currentPatientStudy = this.props.studies.filter(study => study.ParentPatient === this.state.currentPatient.id)[0];
            return <StudyDetails data={currentPatientStudy} onClick={this.onStudySelect}></StudyDetails>
        }
    }

    render() {
        return <div>
            <div>
                <PatientsTable
                    data={this.state.patients}
                    onSelect={this.onPatientSelect}
                >
                </PatientsTable>
            </div>
            <div>
                {this.renderStudySelected()}
                {this.renderStudyDetails()}
            </div>
        </div>
    }
}

function mapStateToProps(state) {
    return {
        patients: state.patients,
        studies: state.studies.studies
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign(
            {},
            patientActions,
            studiesActions
        ), dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PatientsPage));