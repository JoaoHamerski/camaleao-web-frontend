import dotenv from 'dotenv'
import fetch from 'node-fetch'
import fs from 'fs'

const FILE_PATH = './src/fragmentTypes.json'

dotenv.config()

fetch(process.env.VITE_APP_GRAPHQL_HTTP, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    variables: {},
    query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `
  })
}).then(result => result.json())
  .then(result => {
    const possibleTypes = {}

    result.data.__schema.types.forEach(supertype => {
      if (supertype.possibleTypes) {
        possibleTypes[supertype.name]
          = supertype.possibleTypes.map(subtype => subtype.name)
      }
    })

    fs.writeFile(FILE_PATH, JSON.stringify(possibleTypes), err => {
      if (err) {
        console.error('Error writing fragmentTypes.json', err)
      } else {
        console.log('Fragment types successfully extracted!')
      }
    })
  })
