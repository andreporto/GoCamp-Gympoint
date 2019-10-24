module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'gympoint_db',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};
