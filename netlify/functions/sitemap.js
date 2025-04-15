const axios = require('axios');

exports.handler = async (event, context) => {
  try {
    // URL de base du site
    const baseUrl = 'https://agence-orbit.com';
    
    // Requête pour récupérer les articles destin
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
    
    // Ajout de la page d'accueil
    xml += `  <url>\n    <loc>${baseUrl}/</loc>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;
    
    // Ajout des articles destin en utilisant directement article.slug
    blogArticles.forEach(article => {
      if (article.slug) {
        const slug = article.slug;
        xml += `  <url>\n    <loc>${baseUrl}/blog/${slug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
      } else {
        console.warn("Article sans slug :", article);
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