import express from 'express';
import Ortchanc from './routes/Ortchanc';

export default () => {
    const app = express();
    Ortchanc(app);

    return app
}