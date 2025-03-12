# Guide de déploiement Strapi sur Railway

Ce document explique comment déployer Strapi sur Railway et l'intégrer avec votre application React.

## 1. Créer un projet Strapi sur Railway

1. Créez un compte sur [Railway](https://railway.app) si vous n'en avez pas déjà un.
2. Dans le dashboard Railway, cliquez sur "New Project".
3. Sélectionnez "Deploy from GitHub repo".
4. Créez un dépôt GitHub pour votre Strapi CMS.
5. Utilisez le template Strapi officiel ou créez un projet Strapi vide :

```bash
npx create-strapi-app@latest my-strapi-project
```

6. Configurez SQLite comme base de données (plus simple pour commencer).
7. Poussez le code sur GitHub.
8. Dans Railway, connectez votre dépôt GitHub et déployez-le.

## 2. Configuration de Strapi

Une fois Strapi déployé sur Railway, vous devez configurer:

1. **Collections de contenu**:
   - Accédez à votre Strapi Admin (via l'URL fournie par Railway)
   - Créez une collection "Articles" avec les champs:
     - `title` (Texte, obligatoire)
     - `slug` (UID basé sur title)
     - `content` (Rich Text)
     - `excerpt` (Texte, résumé de l'article)
     - `image` (Media, optionnel)
     - `publishedAt` (Date)

2. **Collection Authors** (optionnelle):
   - `name` (Texte)
   - `bio` (Texte long)
   - `avatar` (Image)
   - `role` (Texte)

3. **Permissions API**:
   - Allez dans Settings > Roles > Public
   - Accordez les autorisations de "find" et "findOne" pour Articles et Authors
   - Cela permettra à votre application React d'accéder à ces données publiquement

## 3. Intégration avec React

1. **Récupérer l'URL de l'API Strapi**:
   - Notez l'URL fournie par Railway (par exemple: `https://your-strapi-app.railway.app/api`)
   - Mettez à jour la variable `STRAPI_API_URL` dans `src/lib/strapi.ts` avec votre URL réelle

2. **Pages déjà implémentées**:
   - `StrapiBlog.tsx`: Page principale du blog qui affiche tous les articles
   - `StrapiArticle.tsx`: Page de détail d'un article
   - Routes configurées dans `App.tsx`

3. **Utilisation**:
   - Accédez à `/strapi-blog` pour voir la liste des articles
   - Cliquez sur un article pour voir sa page détaillée à `/strapi-blog/:slug`

## 4. Ajout de contenu dans Strapi

1. Connectez-vous à votre dashboard Strapi
2. Allez dans Content Manager > Articles
3. Créez de nouveaux articles avec:
   - Titre
   - Contenu (supporte Markdown)
   - Image (téléchargez des images)
   - Extrait (résumé court)
4. Publiez l'article

Les articles publiés apparaîtront automatiquement sur votre site React, sans besoin de redéployer l'application !

## 5. Mise à jour du site après modification

Aucune mise à jour manuelle n'est nécessaire! Le site React récupère dynamiquement les données du CMS Strapi à chaque chargement de page.

Pour modifier l'apparence ou le comportement des pages blog:

- Modifiez `src/pages/StrapiBlog.tsx` pour la page principale
- Modifiez `src/pages/StrapiArticle.tsx` pour la page article

## 6. Améliorations futures

- Ajouter des catégories d'articles
- Intégrer des commentaires
- Filtrer les articles par tag ou catégorie
- Ajouter une pagination
- Améliorer le SEO avec des méta-descriptions dynamiques

## En cas de problème

1. Vérifiez les logs Railway
2. Assurez-vous que les permissions API sont correctement configurées dans Strapi
3. Vérifiez la console de votre navigateur pour les erreurs