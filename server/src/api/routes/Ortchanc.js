import { Router } from 'express';

import OrthancService from "../../services/OrthancService";

const route = Router();

export default (app) => {

    route.get('/studies/:id', async (req, res) => {
        try {
            const result = await OrthancService.getStudy(req.params.id);
            return res.json(result).status(200);
        } catch (error) {
            return res.json(error).status(500);
        }
    });

    route.get('/studies', async (req, res) => {
        try {
            const result = await OrthancService.getStudies();
            return res.json(result).status(200);
        } catch (error) {
            return res.json(error).status(500);
        }
    });

    route.get('/patients/:id/instances', async (req, res) => {
        try {
            const result = await OrthancService.getInstances(req.params.id);
            return res.json(result).status(200);
        } catch (error) {
            return res.json(error).status(500);
        }
    });

    route.get('/patients', async (req, res) => {
        try {
            const result = await OrthancService.getPatients();
            return res.json(result).status(200);
        } catch (error) {
            return res.json(error).status(500);
        }
    });

    route.get('/instances/:id/file', async (req, res) => {
        try {
            const result = await OrthancService.getInstanceFile(req.params.id);
            return res.json(result).status(200);
        } catch (error) {
            return res.json(error).status(500);
        }
    });

    app.use('/', route);
};