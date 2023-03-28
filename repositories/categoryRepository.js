const Category = require('../models/Category');
const createOrUpdateCategory = async (req) => {
    try {
        const { title, parentId, slug, description } = req.body;
        if (req.params.id){
            const updatedCategory = await Category.update({ title: title, parentId: parentId, slug: slug, description: description },{
                where: { id: req.params.id }
            })
            const category = await Category.findOne({
                where: {
                    'id': req.params.id
                }
            });
            return category
        }else{
            const category = await Category.create({ title, parentId, slug, description })
            return category
        }
    } catch (error) {
        console.log('error',error)
        return error
    }
   
   
};

module.exports = { createOrUpdateCategory }
   