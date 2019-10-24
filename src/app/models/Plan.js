import Sequelize, { Model } from 'sequelize';

class Plan extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        duration: Sequelize.INTEGER,
        price: Sequelize.REAL,
        admin_id: Sequelize.INTEGER
      },
      {
        sequelize
      }
    );

    return this;
  }
}

export default Plan;
