-- эти запросы необходимы для заполнения в таблицу пользователей данными
INSERT INTO users(email, password_hash, first_name, last_name, avatar) VALUES
('ivanov@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Иван', 'Иванов', 'avatar1.jpg'),
('petrov@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Пётр', 'Петров', 'avatar2.jpg');

-- эти запросы необходимы для заполнения в таблицу с категориями данными
INSERT INTO categories(name) VALUES
('Животные'),
('Игры'),
('Разное');

-- эти запросы необходимы для заполнения в таблицу с объявлениями данными
-- временно отключим проверку всех ограничений в таблице
ALTER TABLE offers DISABLE TRIGGER ALL;
INSERT INTO offers(title, description, type, sum, picture, user_id) VALUES
('Куплю гараж', 'Куплю гараж, чтобы держать там крокодила', 'OFFER', 10000, 'image1.jpg', 1),
('Продам гараж', 'Продам гараж, где можно держать крокодила', 'SALE', 10000, 'image2.jpg', 2),
('Куплю крокодила', 'Куплю крокодила, чтобы держать в гараже', 'OFFER', 1000, 'image3.jpg', 2),
('Продам крокодила', 'Продам крокодила, которого можно держать в гараже', 'SALE', 1000, 'image4.jpg', 1),
('Продам крокодиловую сумку', 'Продам сумку из крокодиловой кожи, изготовление а заказ', 'SALE', 2000, 'image5.jpg', 1);
-- после завершения операции вставки, включим обратно
ALTER TABLE offers ENABLE TRIGGER ALL;
