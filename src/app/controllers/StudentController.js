import * as Yup from 'yup';

import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .min(5)
        .max(150)
        .required(),
      weight: Yup.number()
        .min(20)
        .max(300)
        .required(),
      height: Yup.number()
        .min(50)
        .max(300)
        .required(),
      admin_id: Yup.number().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.json({ error: 'Validation fails.' });
    }

    const studentEmail = req.body.email;

    const studentExists = await Student.findOne({
      where: { email: studentEmail }
    });

    if (studentExists) {
      return res.status(400).json({ error: 'Student already exists.' });
    }

    const {
      id,
      name,
      email,
      age,
      weight,
      height,
      admin_id
    } = await Student.create(req.body);

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
      admin_id
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .min(5)
        .max(150)
        .required(),
      weight: Yup.number()
        .min(20)
        .max(300)
        .required(),
      height: Yup.number()
        .min(50)
        .max(300)
        .required(),
      admin_id: Yup.number().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.json({ error: 'Validation fails.' });
    }

    const { email, studentId } = req.body;

    const student = await Student.findByPk(studentId);

    if (email !== student.email) {
      const userExists = await Student.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: 'Student already exists.' });
      }
    }

    const { id, name, age, weight, height } = await student.update(req.body);
    return res.json({ id, name, email, age, weight, height });
  }
}

export default new StudentController();
