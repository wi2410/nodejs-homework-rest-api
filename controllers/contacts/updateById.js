const { Contact } = require("../../models");

const updateById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if (!result) {
        const error = new Error(`Contact with id=${contactId} not found`);
        error.status = 404;
        throw error;
    }
    res.json({
        status: "success",
        code: 200,
        data: {
            result
        }
    })
}

module.exports = updateById;