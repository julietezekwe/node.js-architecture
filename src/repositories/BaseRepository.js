import DocumentNotFound from './RepositoryErrors';
/**
 * @description BaseRepository
 * @class BaseRepository
 */
export default class BaseRepository {
  /**
   * constructor
   * @param {string} name
   * @param {string} schema
   */
  constructor(name, schema, db) {
    this.name = name;
    this.model = db.model(this.name, schema);
  }

  /**
   * @description Creates a new document
   * @param {object} options
   * @returns {document} Returns a newly created document
   */
  async create(options) {
    try {
      const document = await this.model.create(options);
      return document;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Paginate a model query
   * @param {Query} query
   * @param {PaginationOptions} options
   * @returns {document} Returns paginated documents
   */
  async paginate(query, options) {
    try {
      const { limit, page } = options;
      const perPage = Number(limit);
      const total = await this.model.count(query);
      const offset = perPage * (page - 1);
      const pages = Math.ceil(total / perPage);
      const docs = await query.skip(offset).limit(perPage).exec();
      return {
        docs, total, perPage, page, pages,
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Returns all documents
   * @param {object} query Query options
   * @param {object} options Query options
   * @returns {document} Returns an array of documents.
   */
  async findAll(query, options) {
    try {
      const {
        select, populate = 'amouny, bank', limit, page = 1,
      } = options;
      const queryExec = this.model.find(query).populate(populate);
      queryExec.select(select);
      return limit
        ? await this.paginate(queryExec, { limit, page })
        : await queryExec.exec();
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Fetch document by id
   * @param {string} id Document id
   * @returns {Document} Resolves to found document.
   */
  async findById(id) {
    try {
      const document = await this.model.findOne({ _id: id }).exec();
      if (!document) throw new DocumentNotFound(`${this.name} not found`);
      return document;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Update a document by id
   * @param {string} id
   * @param {any} options
   * @returns {Document} Updated document
   */
  async update(id, options) {
    try {
      const document = await this.model.findOneAndUpdate({ _id: id }, options, { new: true });
      if (!document) throw new DocumentNotFound(`${this.name} not found`);
      return document;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Adds a string to an array
   * @param {object} query
   * @param {string} fieldToPushTo
   * @param {string} value
   * @returns {Document} Updated document
   */
  async pushToArray(query, fieldToPushTo, value) {
    try {
      const document = await this.model
        .findOneAndUpdate(query, { $addToSet: { [fieldToPushTo]: value } }, { new: true });
      if (!document) throw new DocumentNotFound(`${this.name} not found`);
      return document;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Delete a document by id
   * @param {string} id
   * @returns {Document} Deleted document
   */
  async delete(id) {
    try {
      await this.model.deleteOne({ _id: id });
    } catch (error) {
      throw error;
    }
  }
}
