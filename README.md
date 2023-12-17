# README #

## Nazwa kursu<br />
Testowanie i Jakość Oprogramowania (Projekt)

## Autorzy<br />
Jakub Goch

## Temat projektu<br />
Aplikacja do zakupów artykułów spożywczych - testy koszyka

## Opis projektu<br />
Aplikacja do zakupów artykułów spożywczych. Użytkownik może się zarejestrować, zalogować, przeglądać produkty, dodać je do koszyka, dokonać płatności, dodać swój email do newslettera, użyć kodów rabatowych.

## Uruchomienie projektu<br />
W katalogu client -> npm install<br />
W katalogu server -> npm install oraz utworzyć plik .env w folderze głównym "server" i uzupełnić:<br />
PORT=3001<br />
MONGODB_URI=link do bazy mongodb<br />
JWT_SECRET=klucz do jwt<br />
STRIPE_SECRET_KEY=klucz do stripe<br />

## Uruchomienie testów jednostkowych i integracyjnych<br />
W folderze /client i /server -> npm test
Niektóre testy wymagają podanego aktualnego ważnego tokena JWT

## Dokumentacja API<br />
Wstępna dokumentacja jest zrobiona z użyciem swaggera pod localhost:3001/docs

## Scenariusze testowe dla testera manualnego<br />
| Test Case ID | Opis | Kroki testowe | Oczekiwany wynik |
|------------|------------|------------|------------|
| TC_01 | Sprawdzenie czy przycisk “Zapłać” jest zablokowany, gdy koszyk jest pusty | 1. Pozostaw pusty koszyk  <br/> 2. Naciśnij na przycisk “Zapłać”  | Przycisk powinien być zablokowany  |
| TC_02 | Sprawdzenie czy przycisk “Zastosuj” dotyczący kodu rabatowego jest zablokowany, gdy koszyk jest pusty | 1. Pozostaw koszyk pusty  <br/> 2. Naciśnij na przycisk “Zastosuj” | Przycisk powinien być zablokowany  |
| TC_03 | Wpisanie złego kodu rabatowego | 1. Wpisz nieistniejący kod rabatowy <br/> 2. Naciśnij przycisk “Zastosuj”  | Powinien wyświetlić się błąd kodu rabatowego  |
| TC_04 | Sprawdzenie finalnej ceny zamówienia | 1. Dodaj do koszyka kilka produktów  <br/> 2. Sprawdź sumę zamówienia | Suma zamówienia powinna być równa sumie cen wszystkich produktów z koszyka  |
| TC_05 | Sprawdzenie usuwania produktów z koszyka | 1. Dodaj produkt do koszyka  <br/> 2. Usuń produkt z koszyka  | Produkt powinien zostać usunięty z koszyka  |
| TC_06 | Sprawdzenie opróżnienia koszyka  | 1. Dodaj produkt do koszyka <br/> 2. Usuń produkt z koszyka  | W koszyku powinna pojawić się informacja “Brak produktów w koszyku”  |
| TC_07 | Sprawdzenie zwiększenia ilości produktu w koszyku | 1. Dodaj produkt do koszyka  <br/> 2. Naciśnij przycisk “+” przy ilości tego produktu w koszyku  | Ilość produktu w koszyku powinna zwiększyć się o 1  |
| TC_08 | Sprawdzenie przekierowania na stronę z produktami  | 1. Opróżnij koszyk  <br/> 2.  Naciśnij na przycisk z ikoną torby zakupowej  | Strona powinna zostać przekierowana na ścieżkę /categories  |
| TC_09 | Sprawdzenie przekierowania na stronę płatności  | 1. Dodaj produkty do koszyka  <br/> 2.  Naciśnij przycisk “Zapłać”  | Strona powinna zostać przekierowana na witrynę płatności Stripe  |
| TC_10 | Sprawdzenie blokady przejścia do płatności gdy użytkownik jest niezalogowany | 1. Wyloguj się z konta <br/> 2. Dodaj produkt do koszyka <br/> 3. Naciśnij na przycisk “Zapłać”  | Użytkownik powinien zostać przekierowany na stronę logowania  |


## Technologie użyte w projekcie<br />
Projekt utworzony z użyciem stosu MERN.<br />
Do testów: JEST, React Testing Library

