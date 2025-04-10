const axios = require('axios');

exports.handler = async (event, context) => {
  try {
    // URL de base du site
    const baseUrl = 'https://agence-orbit.com';
    
    // Requête pour récupérer les articles destin
    const blogResponse = await axios.get('https://siteorbit-cms-production.up.railway.app/api/articles?populate=*');
    const blogArticles = blogResponse.data.data;

   /*
    // Requête pour récupérer les articles SEO
    const seoResponse = await axios.get('https://siteorbit-cms-production.up.railway.app/api/seos?populate=*');
    const seoArticles = seoResponse.data.data;
                                                */
    
    // Début de la construction du sitemap XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    // Ajout de la page d'accueil
    xml += `  <url>\n    <loc>${baseUrl}/</loc>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;
    
    // Ajout des articles destin
    blogArticles.forEach(article => {
      const slug = article.attributes.slug;
      xml += `  <url>\n    <loc>${baseUrl}/blog/${slug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    });
    
    /*
    // Ajout des articles SEO
    seoArticles.forEach(article => {
      const slug = article.attributes.slug;
      xml += `  <url>\n    <loc>${baseUrl}/seo-blog/${slug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    }); */
    
    xml += '</urlset>';
    
    // Retour du sitemap XML
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/xml',
      },
      body: xml,
    };
  } catch (error) {
    console.error("Erreur lors de la génération du sitemap:", error);
    return {
      statusCode: 500,
      body: "Erreur lors de la génération du sitemap",
    };
  }
};