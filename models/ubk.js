module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM("admin", "user"),
            allowNull: false,
            defaultValue: 'user',
        },
        profilePic: {
            type: DataTypes.STRING,
        },
        deletedAt: {
            type: DataTypes.DATE,
        },
    }, {});
    User.associate = function (models) {
        User.hasOne(models.UserVerify, { foreignKey: 'userId', as: 'userVerify' })
    };
    return User;
};