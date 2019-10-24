import * as Yup from 'yup';

import Plan from '../models/Plan';

class PlanController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
      admin_id: Yup.number().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.json({ error: 'Validation fails.' });
    }

    const planTitle = req.body.title;

    const planExists = await Plan.findOne({
      where: { title: planTitle }
    });

    if (planExists) {
      return res.status(400).json({ error: 'Plan already exists.' });
    }

    const { id, title, duration, price, admin_id } = await Plan.create(
      req.body
    );

    return res.json({
      id,
      title,
      duration,
      price,
      admin_id
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
      admin_id: Yup.number().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.json({ error: 'Validation fails.' });
    }

    const { title, id } = req.body;

    const plan = await Plan.findByPk(id);

    if (!plan) {
      return res.json({ error: 'Plan not found.' });
    }

    if (title !== plan.title) {
      const planExists = await Plan.findOne({ where: { title } });
      if (planExists) {
        return res.status(400).json({ error: 'Plan already exists.' });
      }
    }

    const { duration, price, admin_id } = await plan.update(req.body);
    return res.json({ id, title, duration, price, admin_id });
  }
}

export default new PlanController();
