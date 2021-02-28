import { AppError } from "./../errors/AppError";
import { getCustomRepository } from "typeorm";
import { Response } from "express";
import { Request } from "express";
import { SurveyUserRepository } from "../repositories/SurveyUserRepository";

class AnswerController {
  async execute(req: Request, res: Response) {
    const { value } = req.params;
    const { u: id } = req.query;

    const surveyUserRepository = getCustomRepository(SurveyUserRepository);
    const surveyUser = await surveyUserRepository.findOne({
      id: String(id),
    });

    if (!surveyUser) {
      throw new AppError("Survey User does not exists!");
    }

    surveyUser.value = Number(value);

    await surveyUserRepository.save(surveyUser);
    return res.json(surveyUser);
  }
}

export { AnswerController };
