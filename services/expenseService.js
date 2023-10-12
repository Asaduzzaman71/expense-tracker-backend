const { createOrUpdateExpense,} = require('../repositories/ExpenseRepository');
const { createSlug } = require('../utils')
const Expense = require('../models/Expense');
const show = async (id) => {
    try {
        const expense = await Expense.findOne({
            where: {
                'id': id
            }
        });
        if (expense){
            return { status: 200, message: 'Expense found', data: expense }
        }else{
            return { status: 204, message: 'Expense not found', data: expense }
        }
    } catch (error) {
        return error
    }
};
const list = async () => {
    try {
        const expenses = await Expense.findAll();
        return { status: 200, message: 'expenses found', data: expenses }
    } catch (error) {
        return error
    }
};
const create = async (req) => {
    try {
        const { title, amount } = req.body;
        const expense = await Expense.create({ title, amount })
        return { status: 200, message: 'Expense created successfully', data: response }

    } catch (error) {
        return { status: 400, message: error}
    }
};
const update = async (req) => {
    try {
        const { title, amount } = req.body;
        const updatedExpense = await Expense.update(
            { title, amount },
            { where: { id: req.params.id }}
        )
        const expense = await Expense.findOne({
            where: {
                'id': req.params.id
            }
        });
        return { status: 200, message: 'Expense updated successfully', data: expense }

    } catch (error) {
        return {
            status: 400, message: error
        }
    }
};



module.exports = { create, update, list, show }