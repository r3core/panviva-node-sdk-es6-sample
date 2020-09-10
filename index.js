import config from "./config.js"
import panvivaUtils from "@panviva/node-sdk"

const { panvivaBase, instanceName, apiKey, documentId} = config
const { PanvivaClient, ResourceApiKeys } = panvivaUtils

const client = new PanvivaClient(instanceName, panvivaBase)
client.setApiKey(ResourceApiKeys.apiKeyHeader, apiKey)

const getDocumentWithContainers = async (id) => {
    const document = await client.getDocumentById(id)
    const documentContainers = await client.getDocumentByIdContainers(id)

    return { ...document.body, ...documentContainers.body}
}

// Top-Level async/await only works with Node ^14.8.0
const documentWithContainers = await getDocumentWithContainers(documentId)
console.log(documentWithContainers)

// getDocumentWithContainers(documentId).then(console.log)