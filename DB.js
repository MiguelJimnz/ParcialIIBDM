const { Client } = require('pg');

const client = new Client({
    host: 'aws-0-us-east-1.pooler.supabase.com',
    port: 5432,
    user: 'postgres.bdklrwiqlsqpavrzhbah',
    password: '4jq1U8OxSSPxwlnU',
    database: 'postgres' 
});

client.connect()
    .then(() => console.log('Conectado a Supabase PostgreSQL'))
    .catch(err => console.error('Error conectando a Supabase:', err.stack));

module.exports = client;

