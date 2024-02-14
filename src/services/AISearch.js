const { SearchClient, AzureKeyCredential } = require('@azure/search-documents');

const endpoint = process.env.SEARCH_SERVICE_NAME; // e.g., https://your-service.search.windows.net
const apiKey = process.env.SEARCH_API_KEY;
const indexName = process.env.INDEX_NAME;

const client = new SearchClient(endpoint, indexName, new AzureKeyCredential(apiKey));

async function PerformSearch(searchText) {
    const options = {
      includeTotalCount: true,
    //   filter: "<Your Filter Expression>", // optional
    //   orderBy: ["<Field Name> desc"], // optional
    //    select: ["url", "@search.score"], // optional
    //   searchMode: "all"
    };
  
    const searchResults = await client.search(searchText, options);
    let result = [];
    for await (const item of searchResults.results) {
        result.push(item.document);
       // console.log(`Found document with ID: ${result.document.id}`);
    }



    return result;
  }
  
module.exports = { PerformSearch };  