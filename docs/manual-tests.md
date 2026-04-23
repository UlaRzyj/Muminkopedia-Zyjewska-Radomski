# Manual API Tests

Przyklady do sprawdzenia w Postmanie, Insomnii albo VS Code REST Client.

Zakladany adres lokalny:

```text
http://localhost:5001
```

## 1. Create character

`POST /api/characters`

```json
{
  "name": "Muminek",
  "description": "Glowny bohater Doliny Muminkow",
  "species": "Muminek",
  "isHibernating": false
}
```

## 2. Create second character

`POST /api/characters`

```json
{
  "name": "Wloczykij",
  "description": "Najlepszy przyjaciel Muminka",
  "species": "Paszczak",
  "isHibernating": false
}
```

## 3. Update character with bestFriend

`PATCH /api/characters/:id`

Podmien `:id` na id pierwszej postaci, a `bestFriend` na id drugiej.

```json
{
  "bestFriend": "PUT_CHARACTER_ID_HERE"
}
```

## 4. Get all characters

`GET /api/characters`

## 5. Get character by id

`GET /api/characters/:id`

## 6. Create artifact

`POST /api/artifacts`

Podmien `owner` na prawidlowe id postaci.

```json
{
  "name": "Kapelusz",
  "description": "Magiczny kapelusz zmieniajacy rzeczy",
  "power": "Zmienia rzeczy w chmury",
  "owner": "PUT_CHARACTER_ID_HERE"
}
```

## 7. Get all artifacts

`GET /api/artifacts`

## 8. Get artifact by id

`GET /api/artifacts/:id`

## 9. Update artifact

`PATCH /api/artifacts/:id`

```json
{
  "power": "Zmienia rzeczy w inne ksztalty"
}
```

## 10. Delete artifact

`DELETE /api/artifacts/:id`

## 11. Delete character

`DELETE /api/characters/:id`

Po usunieciu Character jego Artifacty tez powinny zostac usuniete.

## 12. Negative tests

### Invalid character id

`GET /api/characters/123`

Oczekiwany wynik:

```json
{
  "message": "Niepoprawne id"
}
```

Status: `400`

### Invalid artifact owner id

`POST /api/artifacts`

```json
{
  "name": "Harmonijka",
  "description": "Instrument Wloczykija",
  "power": "Gra piekne melodie",
  "owner": "123"
}
```

Status: `400`

### Missing required character field

`POST /api/characters`

```json
{
  "species": "Muminek",
  "isHibernating": false
}
```

Status: `400`
