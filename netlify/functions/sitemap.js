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

    // On récupère en parallèle les articles destin et les articles SEO
    const [blogResp, seoResp] = await Promise.all([
      axios.get('https://siteorbit-cms-production.up.railway.app/api/articles?populate=*'),
      axios.get('https://siteorbit-cms-production.up.railway.app/api/seos?populate=*')
    ]);

    const blogArticles = blogResp.data?.data || [];
    const seoArticles = seoResp.data?.data || [];
    console.log("Articles destin récupérés:", blogArticles.length);
    console.log("Articles SEO récupérés:", seoArticles.length);

    // Début de la construction du sitemap XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Ajout des pages statiques
    staticPages.forEach(page => {
      xml += `  <url>\n    <loc>${baseUrl}${page.path}</loc>\n    <changefreq>${page.changefreq}</changefreq>\n    <priority>${page.priority}</priority>\n  </url>\n`;
    });

    // Ajout des articles "destin"
    blogArticles.forEach(item => {
      const article = item.attributes;
      if (article && article.slug) {
        xml += `  <url>\n    <loc>${baseUrl}/blog/${article.slug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
      } else {
        console.warn("Article destin sans slug:", item);
      }
    });

    // Ajout des articles SEO
    seoArticles.forEach(item => {
      const article = item.attributes;
      if (article && article.slug) {
        xml += `  <url>\n    <loc>${baseUrl}/seo-blog/${article.slug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
      } else {
        console.warn("Article SEO sans slug:", item);
      }
    });

    xml += '</urlset>';

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/xml'
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