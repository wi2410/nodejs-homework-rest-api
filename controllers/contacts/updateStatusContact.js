const { Contact } = require("../../models");

const updateStatusContact = async (req, res) => {
    const { contactId } = req.params;
    const {favorite} = req.body;
    const result = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });
    if (!result) {
        const error = new Error(`missing field favorite`);
        error.status = 400;
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

module.exports = updateStatusContact;