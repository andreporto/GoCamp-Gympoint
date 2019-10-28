import * as Yup from 'yup';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Plan from '../models/Plan';
import Enrollment from '../models/Enrollment';
import Student from '../models/Student';

class EnrollmentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().default(() => new Date()),
      admin_id: Yup.number().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.json({ error: 'Validation fails.' });
    }

    const { student_id, plan_id, start_date } = req.body;

    const enrollmentExists = await Enrollment.findOne({
      where: {
        student_id,
        plan_id,
        start_date: parseISO(start_date, {
          locale: pt
        })
      }
    });

    if (enrollmentExists) {
      return res.json({ error: 'Enrollment already exists.' });
    }

    const enrollmentCreated = await Enrollment.create(req.body);
    return res.json(enrollmentCreated);
  }

  async update(req, res) {
    // const schema = Yup.object().shape({
    //   title: Yup.string().required(),
    //   duration: Yup.number().required(),
    //   price: Yup.number().required(),
    //   admin_id: Yup.number().required()
    // });
    // if (!(await schema.isValid(req.body))) {
    //   return res.json({ error: 'Validation fails.' });
    // }
    // const { title, id } = req.body;
    // const plan = await Plan.findByPk(id);
    // if (!plan) {
    //   return res.json({ error: 'Plan not found.' });
    // }
    // if (title !== plan.title) {
    //   const planExists = await Plan.findOne({ where: { title } });
    //   if (planExists) {
    //     return res.status(400).json({ error: 'Plan already exists.' });
    //   }
    // }
    // const { duration, price, admin_id } = await plan.update(req.body);
    // return res.json({ id, title, duration, price, admin_id });
  }

  async index(req, res) {
    const enrollments = await Enrollment.findAll({
      attributes: ['id', 'start_date', 'end_date', 'price'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email']
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'duration', 'price']
        }
      ],
      order: ['start_date']
    });

    return res.json(enrollments);
  }

  async delete(req, res) {
    const id = req.body.planId;
    const plan = await Plan.findByPk(id);

    if (!plan) {
      return res.status(401).json({ error: 'Plan not found.' });
    }

    const deletedEnrollment = await Enrollment.destroy({
      where: {
        id
      }
    });

    return res.json(deletedEnrollment);
  }
}

export default new EnrollmentController();
