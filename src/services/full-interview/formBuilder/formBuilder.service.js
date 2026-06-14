/** 
*SQL

CREATE TABLE form_submissions (
  id UUID PRIMARY KEY,
  created_at TIMESTAMP NOT NULL,
  data JSONB NOT NULL
);
**/

const formBuilderRepository = require('../../../repository/full-interview/formBuilder/formBuilder.repository')
const crypto = require('crypto')

async function save(data) {
    const submission = {
        id: crypto.randomUUID(),
        createdAt: new Date(),
        data 
    }

    return formBuilderRepository.create(submission)
}

module.exports = { save } 