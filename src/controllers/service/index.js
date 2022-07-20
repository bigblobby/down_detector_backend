import serviceHelper from '../../helpers/service/index.js';
import { User } from "../../entities/User.js";
import { AppDataSource} from "../../db/index.js";

async function checkService(req, res){
    const {
        url,
        getScreenshot = false,
        getHeaders = false
    } = req.body;

    const options = {
        getHeaders: getHeaders,
        getScreenshot: getScreenshot
    }

    const result = await serviceHelper.checkUrl(url, options);
    const data = {
        ...result,
    }

    res.json(data);
}

async function getUsers(req, res){
    const userRepository = AppDataSource.getRepository(User);
    const result = await userRepository.find();
    console.log(result);
    res.json({})
}

export default {
    checkService,
    getUsers
}