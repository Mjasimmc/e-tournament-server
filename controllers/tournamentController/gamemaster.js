import { UploadBanner, getImageWithId } from '../../dbOperations/image.js';
import {
    GetAllTournamentsForGamemaster,
    UpdateTournamentData,
    createNewTournamentData,
    getTournamentDataWithId
} from '../../dbOperations/tournament.js';


export const createNewTournament = async (req, res) => {
    try {
        const { name, game } = req.body;
        if (!name || !game) {
            return res.status(404).send({ message: 'Data not found' });
        }

        const tournamentData = {
            name,
            game,
            user: req.user._id,
        };

        await createNewTournamentData(tournamentData).then((data) => {
            const { _id } = data;
            res.status(200).send({ message: 'connected', _id });
        });
    } catch (error) {
        console.log('error');
        res.status(500).send({ message: 'Internal server error' });
    }
};

export const getTournamentData = async (req, res) => {
    try {
        const _id = req.query._id ;
        await getTournamentDataWithId({ _id}).then((tournament) => {
            res.status(200).send({ message: 'Connected', tournament });
        });
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' });
    }
};

export const uploadBannerImages = async (req, res) => {
    try {
        const { user } = req;
        const { image, index, _id, tournamentId } = req.body;
        const uploadedDate = new Date().toDateString();
        const typeOfImage = 'poster';
        await UploadBanner(image, index, typeOfImage, _id, uploadedDate, _id, tournamentId).then((data) => {
            res.status(200).send({ image: data.image, _id: data._id });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'internal server error' });
    }
};

export const getBannerImagesWithId = async (req, res) => {
    try {
        const { _id } = req.query;
        if(_id){
            return await getImageWithId(_id).then((image) => {
                res.status(200).send({ image, message: 'Connected' });
            });
        }
        res.status(200).send({  message: 'Connected' });
    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
};

export const UpdateTournament = async (req, res) => {
    try {
        const {
            name,
            game,
            _id,
            deadline,
            minplayers,
            teams_no,
            images,
            description,
            rules,
            user
        } = req.body;
        await UpdateTournamentData({
            name, game, _id, deadline, minplayers, teams_no,
            images, description, rules, user
        });
        res.status(200).send({ message: 'connected' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' });
    }
};

export const getGamemasterTournaments = async (req, res) => {
    try {
        await GetAllTournamentsForGamemaster(req.user._id).then((list) => {
            res.status(200).send({ message: 'Connected', list });
        });
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' });
    }
};