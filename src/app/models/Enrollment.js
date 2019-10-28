import Sequelize, { Model } from 'sequelize';
import { addMonths } from 'date-fns';

class Enrollment extends Model {
  static init(sequelize) {
    super.init(
      {
        start_date: Sequelize.DATE,
        admin_id: Sequelize.INTEGER,
        end_date: {
          type: Sequelize.VIRTUAL,
          get() {
            console.log('end_date', this.plan);
            return this.plan && addMonths(this.start_date, this.plan.duration);
          }
        },
        price: {
          type: Sequelize.VIRTUAL,
          get() {
            console.log(this.plan);

            return this.plan && this.plan.duration * this.plan.price;
          }
        }
      },
      {
        sequelize
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
    this.belongsTo(models.Plan, { foreignKey: 'plan_id', as: 'plan' });
  }
}

export default Enrollment;
