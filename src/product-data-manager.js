export class ProductDataManager {
  constructor(apiData) {
    this.apiData = apiData;
  }

  async getProducts() {
    try {
      // get data in JSON format from Contentful
      let rawData = await this.apiData.getEntries();

      /* Select only the 'items. field in the JSON file, which is an array...
         each item corresponds to an individual product */
      let productsArray = rawData.items;

      /* parse only the relevant product data fields,
         and map these new array items onto the onload, unparsed array */
      productsArray = productsArray.map(item => {
        const { title, description, price } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;
        return { title, description, price, id, image };
      });
      // returns the array of products to the main script file
      return productsArray;
    } catch (error) {
      console.log("Cannot get/parse product info");
    }
  }
}
