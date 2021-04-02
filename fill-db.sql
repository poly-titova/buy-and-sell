
    INSERT INTO users(email, password_hash, first_name, last_name, avatar) VALUES
    ('ivanov@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Иван', 'Иванов', 'avatar1.jpg'),
('petrov@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Пётр', 'Петров', 'avatar2.jpg');
    INSERT INTO categories(name) VALUES
    ('Книги'),
('Разное'),
('Посуда'),
('Игры'),
('Животные'),
('Журналы'),
('Музыка'),
('Спорт');
    ALTER TABLE offers DISABLE TRIGGER ALL;
    INSERT INTO offers(title, description, type, sum, picture, user_id) VALUES
    ('Продам советскую посуду. Почти не разбита.', 'Если найдёте дешевле — сброшу цену. Не пытайтесь торговаться. Цену вещам я знаю. Если товар не понравится — верну всё до последней копейки. Бонусом отдам все аксессуары.', 'sale', NaN, 'itemNaN.jpg', 1);
    ALTER TABLE offers ENABLE TRIGGER ALL;
    ALTER TABLE offer_categories DISABLE TRIGGER ALL;
    INSERT INTO offer_categories(offer_id, category_id) VALUES
    (1, 8);
    ALTER TABLE offer_categories ENABLE TRIGGER ALL;
    ALTER TABLE comments DISABLE TRIGGER ALL;
    INSERT INTO COMMENTS(text, user_id, offer_id) VALUES
    ('Совсем немного... Вы что?! В магазине дешевле.', 1, 1);
    ALTER TABLE comments ENABLE TRIGGER ALL;