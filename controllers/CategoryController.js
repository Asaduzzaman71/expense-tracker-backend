
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { create, update , list, show} = require('../services/categoryService');
const { attachCookiesToResponse, createTokenUser } = require('../utils');

const getSingleCategory = async (req, res) => {
    const result = await show( req.params.id );
    if (result.status == 200) {
        res.status(StatusCodes.OK).json({ message: result.message, data: result.data });
    } else {
        res.status(StatusCodes.NOT_FOUND).json({ data: result.data });
    }
};
const getAllCategories = async (req, res) => {
    try {
        const result = await list();
        if (result.status == 200) {
            res.status(StatusCodes.OK).json({ message: result.message, data: result.data });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ data: result.data });
        }
    } catch (error) {
        return error
    }
};
const createCategory = async (req, res) => {
    try {
        const result = await create(req);
        if (result.status == 400 ) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: result.message });
        }else{
            res.status(StatusCodes.CREATED).json({ user: result.data });
        }
    } catch (error) {
        return error
    }

};
const updateCategory = async (req, res) => {
try{
    const result = await update(req);
    if(result.errors){
        throw new CustomError.BadRequestError(result.errors[0].message);
    }else{
        res.status(StatusCodes.OK).json({ user: result.data });

    }
} catch (error) {
    return error
}

};
// const deleteCategory = async (req, res) => {
//     if (result.status == 400) {
//         throw new CustomError.BadRequestError(result.message);
//     }
//     const tokenUser = createTokenUser(result.data);
//     attachCookiesToResponse({ res, user: tokenUser });
//     res.status(StatusCodes.CREATED).json({ user: result.data });
// };



module.exports = {
    createCategory,
    updateCategory,
    getAllCategories,
    getSingleCategory
};
