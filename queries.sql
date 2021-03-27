-- запрос для получения списка всех категорий
SELECT * FROM categories

-- запрос для получения списка непустых категорий
SELECT id, name FROM categories
  JOIN offer_categories
  ON id = category_id
  GROUP BY id

-- запрос для получения категорий с количеством объявлений
SELECT id, name, count(offer_id) FROM categories
  LEFT JOIN offer_categories
  ON id = category_id
  GROUP BY id
