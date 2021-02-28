import { getCustomRepository, IsNull, Not } from "typeorm";
import { Response } from "express";
import { Request } from "express";
import { SurveyUserRepository } from "../repositories/SurveyUserRepository";

class NpsController {
  /**
   *  Detratores: 1 a 6
   *  Passivos: 7 e 8
   *  Promotores: 9 e 10
   *
   *  (nº promotores - nº detratores) / (nº respostas) x 100
   */
  async execute(req: Request, res: Response) {
    const { survey_id } = req.params;

    const surveyUserRepo = getCustomRepository(SurveyUserRepository);

    const surveyUser = await surveyUserRepo.find({
      survey_id,
      value: Not(IsNull()),
    });

    console.log(surveyUser);

    const detractors = surveyUser.filter((survey) => {
      survey.value >= 0 && survey.value <= 6;
    }).length;

    const promoters = surveyUser.filter((survey) => {
      survey.value >= 9 && survey.value <= 10;
    }).length;

    const passives = surveyUser.filter((survey) => {
      survey.value >= 7 && survey.value <= 8;
    }).length;

    const totalAnswers = surveyUser.length;

    const calculate = Number(
      (((promoters - detractors) / totalAnswers) * 100).toFixed(2)
    );

    return res.json({
      promoters,
      detractors,
      passives,
      totalAnswers,
      nps: calculate,
    });
  }
}

export { NpsController };
