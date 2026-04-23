# Muminkopedia

## 1. Modele Mongoose

### Character
- name: string (required)
- description: string
- species: string (enum: Muminek | Miukk | Paszczak)
- isHibernating: boolean
- bestFriend: ObjectId (ref: Character)

### Artifact
- name: string (required)
- description: string
- power: string
- owner: ObjectId (ref: Character)

---

## 2. Plan relacji

- Jeden Character moze posiadac wiele Artifactow
- Kazdy Artifact nalezy do jednego Character (pole: owner)
- Pole owner w Artifact jest typu ObjectId i wskazuje na Character
- Pole bestFriend w Character jest typu ObjectId i wskazuje na inny dokument Character
- Relacje realizowane sa za pomoca ObjectId
- Gdy Character zostaje usuniety, jego Artifacty sa usuwane kaskadowo w warstwie service

---

## 3. Lista endpointow

### Character
- GET /api/characters
- GET /api/characters/:id
- POST /api/characters
- PATCH /api/characters/:id
- DELETE /api/characters/:id

### Artifact
- GET /api/artifacts
- GET /api/artifacts/:id
- POST /api/artifacts
- PATCH /api/artifacts/:id
- DELETE /api/artifacts/:id

---

## 4. Statusy odpowiedzi

- 200 OK: poprawne pobranie, aktualizacja lub usuniecie danych
- 201 Created: poprawne utworzenie zasobu
- 400 Bad Request: bledne dane wejsciowe lub niepoprawne Mongo ObjectId
- 404 Not Found: zasob nie istnieje
- 500 Internal Server Error: nieoczekiwany blad serwera
