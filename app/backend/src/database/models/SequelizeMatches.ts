import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import SequelizeTeam from './SequelizeTeam';

class SequelizeMatches extends Model<InferAttributes<SequelizeMatches>,
InferCreationAttributes<SequelizeMatches>> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

SequelizeMatches.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  homeTeamId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'home_team_id',
  },
  homeTeamGoals: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'home_team_goals',
  },
  awayTeamId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'away_team_id',
  },
  awayTeamGoals: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'away_team_goals',
  },
  inProgress: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    field: 'in_progress',
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
});

SequelizeMatches.belongsTo(SequelizeTeam, {
  foreignKey: 'homeTeamId',
  targetKey: 'id',
  as: 'homeTeam',
});

SequelizeTeam.hasOne(SequelizeMatches, {
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});

SequelizeMatches.belongsTo(SequelizeTeam, {
  foreignKey: 'awayTeamId',
  targetKey: 'id',
  as: 'awayTeam',
});

SequelizeTeam.hasOne(SequelizeMatches, {
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});

export default SequelizeMatches;
