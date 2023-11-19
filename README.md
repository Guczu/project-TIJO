# README #

###Nazwa kursu<br />
Testowanie i Jakość Oprogramowania (Projekt)

###Autorzy<br />
Jakub Goch

###Temat projektu<br />
Aplikacja do zakupów artykułów spożywczych - testy koszyka

###Opis projektu<br />
Aplikacja do zakupów artykułów spożywczych. Użytkownik może się zarejestrować, zalogować, przeglądać produkty, dodać je do koszyka, dokonać płatności, dodać swój email do newslettera, użyć kodów rabatowych.

###Uruchomienie projektu<br />
W katalogu client -> npm install<br />
W katalogu server -> npm install oraz utworzyć plik .env w folderze głównym "server" i uzupełnić:<br />
PORT=3001<br />
MONGODB_URI=link do bazy mongodb<br />
JWT_SECRET=klucz do jwt<br />
STRIPE_SECRET_KEY=klucz do stripe<br />

###Uruchomienie testów jednostkowych i integracyjnych<br />

###Dokumentacja API<br />
Wstępna dokumentacja jest zrobiona z użyciem swaggera pod localhost:3001/docs

###Scenariusze testowe dla testera manualnego<br />

###Technologie użyte w projekcie<br />
Projekt utworzony z użyciem stosu MERN.<br />
Do testów: JEST, React Testing Library

