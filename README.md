# easyEmployer

Snel en eenvoudig een werkgever aanmaken in Loket.

## Doelgroep

Testers van de Loket applicatie. Loket is een Salaris- en HR-SaaS.

## Oplossing

Een formulier waarmee met slechts een paar kliks een complete werkgever kan worden opgebouwd. De applicatie is een single-page webapp (vanilla HTML/JS) die via serverless API-routes (Vercel) communiceert met de Loket API.

## Architectuur

```
public/index.html    → Frontend (single-page, vanilla HTML/CSS/JS)
api/*.js             → Vercel serverless proxy-functies (Node.js)
Loket API            → https://api.loket-ontw.nl/v2/
OAuth                → https://oauth.loket-ontw.nl/token/information
```

Hosting: **Vercel** — https://easy-employer.vercel.app

## Stappen (workflow)

Het formulier doorloopt de volgende stappen. Elke stap is onafhankelijk uitvoerbaar, mits de benodigde ID's beschikbaar zijn.

| Stap | Naam | Omschrijving |
|------|------|-------------|
| 0 | **Token & Provider** | Accesstoken valideren en provider bepalen. Dit zet de context voor alle volgende stappen. |
| 1 | **Werkgever aanmaken** | Maakt de werkgever aan. Dit is de basis voor alle verdere gegevens. Levert een `employerId` op. |
| 2 | **Team koppelen** | Door te koppelen aan een team kunnen alle gebruikers van dat team (salarisprofessionals en testers) de werkgever in de Loket applicatie openen. |
| 3 | **Producten activeren** | Door producten in te schakelen worden de bijbehorende functionaliteiten in de applicatie beschikbaar. 52 modules worden standaard geactiveerd. |
| 4 | **Administratie aanmaken** | De administratie bevat alle instellingen om een salarisadministratie te kunnen voeren. Een werkgever kan meerdere administraties hebben; easyEmployer ondersteunt er één. |
| 5 | **Werknemers** *(nog niet geïmplementeerd)* | Een werknemer wordt verloond op een administratie. Een werknemer bestaat uit een dienstverband + persoon. |

## API-endpoints (serverless proxies)

Alle endpoints zijn proxy-functies die de Loket API aanroepen met het meegegeven accesstoken. Tokens worden server-side opgeschoond via `cleanToken()`.

| Bestand | Methode | Loket API-pad | Doel |
|---------|---------|---------------|------|
| `api/test-token.js` | POST | `oauth.loket-ontw.nl/token/information` | Token valideren |
| `api/get-providers.js` | POST → GET | `/v2/providers/` | Provider ID ophalen |
| `api/create-employer.js` | POST | `/v2/providers/{providerId}/employers` | Werkgever aanmaken |
| `api/assign-team.js` | PATCH | `/v2/providers/{providerId}/employers/{employerId}/authorizationGroups` | Team toewijzen |
| `api/assign-modules.js` | PATCH | `/v2/providers/{providerId}/employers/{employerId}/modules` | Producten activeren |
| `api/create-administration.js` | POST | `/v2/providers/employers/{employerId}/payrolladministrations` | Administratie aanmaken |

## Sidebar (gedeelde context)

De sidebar bevat velden die over alle stappen worden gedeeld:

- **Accesstoken** — verplicht, wordt gevalideerd in stap 0
- **Provider ID** — wordt automatisch opgehaald na tokenvalidatie (readonly)
- **Werkgever ID** — wordt ingevuld na stap 1, of handmatig in te voeren
- **Administratie ID** — wordt ingevuld na stap 4 (readonly)

## Tech stack

- **Frontend**: Vanilla HTML/CSS/JS (single file: `public/index.html`)
- **Backend**: Node.js serverless functions op Vercel
- **Styling**: Loket.nl branding (logo, kleuren, Plus Jakarta Sans font)
- **Hosting**: Vercel (deploy via `npx vercel@28 --yes --prod`)
- **Node**: v16.14.0 (Vercel CLI v28 vereist i.v.m. compatibiliteit)

## Lokaal draaien

```bash
npx vercel@28 dev
```

## Deployen

```bash
npx vercel@28 --yes --prod
```
