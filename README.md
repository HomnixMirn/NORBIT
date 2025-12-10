Запуск бека
py -m venv .venv
.venv\Scripts\activate
pip install django
cd Backend
py manage.py runserver

Запуск фронта
cd Frontend
npm i
npm run dev