async function getProducts(db, { page, limit, category, sort, order }) {
  const filter = category ? { category } : {};

  const sortOrder = order === "asc" ? 1 : -1;
  const sortSpec = { [sort]: sortOrder };
  const skip = (page - 1) * limit;

  const collection = db.collection("products");

  const [data, total] = await Promise.all([
    collection.find(filter).sort(sortSpec).skip(skip).limit(limit).toArray(),
    collection.countDocuments(filter),
  ]);

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: total === 0 ? 0 : Math.ceil(total / limit),
    },
  };
}

module.exports = { getProducts };
