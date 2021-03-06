import { AppError } from './../errors/AppError';
import { getCustomRepository } from "typeorm";
import { resolve } from "path";
import { Response, Request } from "express";
import { UserRepository } from "../repositories/UserRepository";
import { SurveyRepository } from "../repositories/SurveyRepository";
import { SurveyUserRepository } from "../repositories/SurveyUserRepository";
import SendMailService from "../services/SendMailService";

class SendMailController {
  async execute(req: Request, res: Response) {
    const { email, survey_id } = req.body;

    const userRepository = getCustomRepository(UserRepository);
    const surveyRepository = getCustomRepository(SurveyRepository);
    const surveyUserRepository = getCustomRepository(SurveyUserRepository);

    const userAlreadyExists = await userRepository.findOne({
      email,
    });

    if (!userAlreadyExists) {
      throw new AppError("User does not exists!");
    }

    const surveyAlreadyExists = await surveyRepository.findOne({
      id: survey_id,
    });

    if (!surveyAlreadyExists) {
      throw new AppError("Survey does not exists!");
    }

    const surveyUser = surveyUserRepository.create({
      user_id: userAlreadyExists.id,
      survey_id,
    });

    const surveyUserAlreadyExists = await surveyUserRepository.findOne({
      where: {
        user_id: userAlreadyExists.id,
        value: null,
      },
      relations: ["user", "survey"],
    });

    const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");
    const variables = {
      name: userAlreadyExists.name,
      title: surveyAlreadyExists.title,
      description: surveyAlreadyExists.description,
      id: "",
      link: process.env.URL_MAIL,
    };

    if (surveyUserAlreadyExists) {
      variables.id = surveyUserAlreadyExists.id;
      await SendMailService.execute(
        email,
        surveyAlreadyExists.title,
        variables,
        npsPath
      );
      return res.json(surveyUserAlreadyExists);
    }

    // Salvar avaliacao da pesquisa no banco de dados
    await surveyUserRepository.save(surveyUser);

    variables.id = surveyUser.id;
    // Enviar e-mail
    await SendMailService.execute(
      email,
      surveyAlreadyExists.title,
      variables,
      npsPath
    );

    return res.json(surveyUser);
  }
}

export { SendMailController };
