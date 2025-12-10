# NORBIT Marketplace

Маркетплейс с Django (бекенд) и Next.js (фронтенд). Использует PostgreSQL как основную базу данных. Один человек держит базу, остальные работают с фикстурами.

---

## Требования

- Python 3.12 и выше
- Node.js и npm
- PostgreSQL
- Виртуальное окружение для Python

---

## Настройка Backend

1. Клонируем проект и создаём виртуальное окружение:

```bash
git clone <URL_репозитория>
cd Backend
py -m venv .venv
.venv\Scripts\activate      # Windows
# source .venv/bin/activate # Linux / Mac
```

2. Устанавливаем зависимости:

```bash
pip install django
pip install Pillow
```

3. Применяем миграции (только один человек на бекенд!):

```bash
cd Backend
py manage.py makemigrations
python manage.py migrate
```

4. Запуск сервера:

```bash
python manage.py runserver
```
- Админ-панель доступна на [http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin)

5. Для данных используется фикстура `initial_data.json`. Чтобы загрузить данные:

```bash
python manage.py loaddata initial_data.json
```

---

## Настройка Frontend

1. Открываем новый терминал
2. Переходим в папку Frontend:

```bash
cd Frontend
```

3. Устанавливаем зависимости:

```bash
npm install
```

4. Запускаем фронтенд:

```bash
npm run dev
```
- Фронтенд будет доступен на [http://localhost:3000](http://localhost:3000)

---

## Разделение ролей

| Роль       | Действия |
|------------|----------|
| **Бекенд** | Настраивает PostgreSQL, применяет миграции, создаёт суперпользователя, обновляет фикстуру с данными (`initial_data.json`) и коммитит её. |
| **Фронтенд** | Настраивает Next.js, подключается к API бекенда, работает с интерфейсом, делает запросы к серверу. |

> Важно: миграции и фикстуры обновляет **только один человек**, чтобы избежать конфликтов.

---

## Работа с Git

1. **База PostgreSQL не коммитится напрямую**. Используем дампы (`pg_dump`) для резервного копирования.

2. После клонирования проекта участники делают:

```bash
python manage.py loaddata Backend/initial_data.json  # загрузка данных
npm run dev                                        # запуск фронтенда
```

---

