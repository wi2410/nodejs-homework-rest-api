const { Contact } = require("../../models");

const removeById = async (req, res) => {
    const { contactId  } = req.params;
    const result = await Contact.findByIdAndRemove(contactId );
    if (!result) {
        const error = new Error(`Contact with id=${contactId} not found`);
        error.status = 404;
        throw error;
    }
    res.json({
        status: "success",
        code: 200,
        message: "product deleted",
        data: {
            result
        }
    })
}

module.exports = removeById;