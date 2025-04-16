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

    // Récupération des articles "destin" et des articles SEO en parallèle
    const [blogResponse, seoResponse] = await Promise.all([
      axios.get('https://siteorbit-cms-production.up.railway.app/api/articles?populate=*'),
      axios.get('https://siteorbit-cms-production.up.railway.app/api/seos?populate=*')
    ]);

    if (!blogResponse.data || !blogResponse.data.data || !Array.isArray(blogResponse.data.data)) {
      throw new Error("La réponse de l'API ne contient pas de données d'articles destin attendues.");
    }
    if (!seoResponse.data || !seoResponse.data.data || !Array.isArray(seoResponse.data.data)) {
      throw new Error("La réponse de l'API ne contient pas de données d'articles SEO attendues.");
    }

    const blogArticles = blogResponse.data.data;
    const seoArticles = seoResponse.data.data;

    console.log("Nombre d'articles destin récupérés:", blogArticles.length);
    console.log("Nombre d'articles SEO récupérés:", seoArticles.length);

    // Construction du sitemap XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Ajout des pages statiques
    staticPages.forEach(page => {
      xml += `  <url>\n    <loc>${baseUrl}${page.path}</loc>\n    <changefreq>${page.changefreq}</changefreq>\n    <priority>${page.priority}</priority>\n  </url>\n`;
    });

    // Ajout des articles destin
    blogArticles.forEach(article => {
      // Dans votre configuration actuelle, les articles destin renvoient directement le champ 'slug'
      if (article.slug) {
        const slug = article.slug;
        xml += `  <url>\n    <loc>${baseUrl}/blog/${slug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
      } else {
        console.warn("Article destin sans slug :", article);
      }
    });

    // Ajout des articles SEO
    seoArticles.forEach(item => {
      // Supposons que la réponse de Strapi pour les articles SEO est sous forme d'objet avec propriété 'attributes'
      const article = item.attributes;
      if (article && article.slug) {
        const slug = article.slug;
        xml += `  <url>\n    <loc>${baseUrl}/seo-blog/${slug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
      } else {
        console.warn("Article SEO sans slug :", item);
      }
    });

    xml += '</urlset>';

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/xml' },
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