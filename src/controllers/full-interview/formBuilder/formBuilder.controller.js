const formBuilderService =  require('../../../services/full-interview/formBuilder/formBuilder.service')

async function createForm(req, res) {
    try {
        const form = await formBuilderService.save(req.body)
    
        return res.status(201).json(form)    
        
    } catch (error) {
        return res.status(500).json({error: 'Internal server error'})
    }
}

module.exports = {
    createForm
}