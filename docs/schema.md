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
- Relacje realizowane sa za pomoca ObjectId

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
