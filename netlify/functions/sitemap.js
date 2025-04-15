const axios = require('axios');

exports.handler = async (event, context) => {
  try {
    // URL de base du site (domaine principal)
    const baseUrl = 'https://agence-orbit.com';

    // Tableau des pages statiques à inclure dans le sitemap
    const staticPages = [
      { path: '/', changefreq: 'daily', priority: '1.0' },
      { path: '/devenir-partenaire', changefreq: 'monthly', priority: '0.9' },
      { path: '/mentions-legales', changefreq: 'monthly', priority: '0.8' },
      { path: '/politique-de-confidentialite', changefreq: 'monthly', priority: '0.8' },
      { path: '/blog', changefreq: 'weekly', priority: '0.9' },
      { path: '/contact', changefreq: 'weekly', priority: '0.9' },
      { path: '/success', changefreq: 'monthly', priority: '0.9' }
    ];

    // Récupération des articles du blog via l'API de Strapi
    const blogResponse = await axios.get('https://siteorbit-cms-production.up.railway.app/api/articles?populate=*');
    console.log("Réponse API:", JSON.stringify(blogResponse.data, null, 2));

    if (!blogResponse.data || !blogResponse.data.data || !Array.isArray(blogResponse.data.data)) {
      throw new Error("La réponse de l'API ne contient pas de données d'articles attendues.");
    }

    const blogArticles = blogResponse.data.data;
    console.log("Nombre d'articles récupérés:", blogArticles.length);

    // Construction du sitemap XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Ajout des pages statiques
    staticPages.forEach(page => {
      xml += `  <url>\n    <loc>${baseUrl}${page.path}</loc>\n    <changefreq>${page.changefreq}</changefreq>\n    <priority>${page.priority}</priority>\n  </url>\n`;
    });

    // Ajout des articles du blog
    blogArticles.forEach(article => {
      // Ici, vos articles renvoient directement le champ 'slug' (sans l'objet "attributes")
      if (article.slug) {
        const slug = article.slug;
        xml += `  <url>\n    <loc>${baseUrl}/blog/${slug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
      } else {
        console.warn("Article sans slug:", article);
      }
    });

    xml += '</urlset>';

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/xml',
      },
      body: xml,
    };
  } catch (error) {
    console.error("Erreur lors de la génération du sitemap:", error.message);
    return {
      statusCode: 500,
      body: "Erreur lors de la génération du sitemap: " + error.message,
    };
  }
};