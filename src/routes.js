import { Router } from 'express';

import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';
import PlanController from './app/controllers/PlanController';
import EnrollmentController from './app/controllers/EnrollmentController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/students', StudentController.store);
routes.put('/students', StudentController.update);

routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.put('/plans', PlanController.update);
routes.delete('/plans', PlanController.delete);

routes.get('/Enrollments', EnrollmentController.index);
routes.post('/Enrollments', EnrollmentController.store);
routes.put('/Enrollments', EnrollmentController.update);
routes.delete('/Enrollments', EnrollmentController.delete);

export default routes;
