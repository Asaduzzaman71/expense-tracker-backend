
module.exports = (sequelize, DataTypes) => {
    const UserVerify = sequelize.define('UserVerify', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'id'
            }
        },
        emailVerificationToken: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isEmailVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    }, {
    });
    UserVerify.associate = function (models) {
        UserVerify.belongsTo(models.User, { as: 'user' })
    };
    return UserVerify;
};