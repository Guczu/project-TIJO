# README #

###Nazwa kursu
Testowanie i Jakość Oprogramowania (Projekt)

###Autorzy
Jakub Goch

###Temat projektu
Aplikacja do zakupów artykułów spożywczych - testy koszyka

###Opis projektu
Aplikacja do zakupów artykułów spożywczych. Użytkownik może się zarejestrować, zalogować, przeglądać produkty, dodać je do koszyka, dokonać płatności, dodać swój email do newslettera, użyć kodów rabatowych.

###Uruchomienie projektu
W katalogu client -> npm install
W katalogu server -> npm install oraz utworzyć plik .env w folderze głównym "server" i uzupełnić:
PORT=3001
MONGODB_URI=link do bazy mongodb
JWT_SECRET=klucz do jwt
STRIPE_SECRET_KEY=klucz do stripe

###Uruchomienie testów jednostkowych i integracyjnych

###Dokumentacja API
Wstępna dokumentacja jest zrobiona z użyciem swaggera pod localhost:3001/docs

###Scenariusze testowe dla testera manualnego

###Technologie użyte w projekcie
Projekt utworzony z użyciem stosu MERN.
Do testów: JEST, React Testing Library

