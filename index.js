const express= require('express')
const client =require('./DB')
const path=require('path')
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// CRUD Restaurante
app.post('/api/restaurantes', async (req, res) => {
    const { nombre, ciudad, direccion, fecha_apertura } = req.body;
    const query = 'INSERT INTO restaurante (nombre, ciudad, direccion, fecha_apertura) VALUES ($1, $2, $3, $4)';
    try {
        await client.query(query, [nombre, ciudad, direccion, fecha_apertura]);
        res.status(201).json({ message: 'Restaurante creado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/restaurantes', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM restaurante');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/restaurantes/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, ciudad, direccion, fecha_apertura } = req.body;
    const query = 'UPDATE restaurante SET nombre = $1, ciudad = $2, direccion = $3, fecha_apertura = $4 WHERE id_rest = $5';
    try {
        await client.query(query, [nombre, ciudad, direccion, fecha_apertura, id]);
        res.status(200).json({ message: 'Restaurante actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/restaurantes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await client.query('DELETE FROM restaurante WHERE id_rest = $1', [id]);
        res.status(200).json({ message: 'Restaurante eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// CRUD Empleado
app.post('/api/empleados', async (req, res) => {
    const { nombre, rol, id_rest } = req.body;
    const query = 'INSERT INTO empleado (nombre, rol, id_rest) VALUES ($1, $2, $3)';
    try {
        await client.query(query, [nombre, rol, id_rest]);
        res.status(201).json({ message: 'Empleado creado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/empleados', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM empleado');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/empleados/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, rol, id_rest } = req.body;
    const query = 'UPDATE empleado SET nombre = $1, rol = $2, id_rest = $3 WHERE id_empleado = $4';
    try {
        await client.query(query, [nombre, rol, id_rest, id]);
        res.status(200).json({ message: 'Empleado actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/empleados/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await client.query('DELETE FROM empleado WHERE id_empleado = $1', [id]);
        res.status(200).json({ message: 'Empleado eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// CRUD Producto
app.post('/api/productos', async (req, res) => {
    const { nombre, precio } = req.body;
    const query = 'INSERT INTO producto (nombre, precio) VALUES ($1, $2)';
    try {
        await client.query(query, [nombre, precio]);
        res.status(201).json({ message: 'Producto creado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/productos', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM producto');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/productos/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, precio } = req.body;
    const query = 'UPDATE producto SET nombre = $1, precio = $2 WHERE id_prod = $3';
    try {
        await client.query(query, [nombre, precio, id]);
        res.status(200).json({ message: 'Producto actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/productos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await client.query('DELETE FROM producto WHERE id_prod = $1', [id]);
        res.status(200).json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// CRUD Pedido
app.post('/api/pedidos', async (req, res) => {
    const { fecha, id_rest, total } = req.body;
    const query = 'INSERT INTO pedido (fecha, id_rest, total) VALUES ($1, $2, $3)';
    try {
        await client.query(query, [fecha, id_rest, total]);
        res.status(201).json({ message: 'Pedido creado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/pedidos', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM pedido');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/pedidos/:id', async (req, res) => {
    const { id } = req.params;
    const { fecha, id_rest, total } = req.body;
    const query = 'UPDATE pedido SET fecha = $1, id_rest = $2, total = $3 WHERE id_pedido = $4';
    try {
        await client.query(query, [fecha, id_rest, total, id]);
        res.status(200).json({ message: 'Pedido actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/pedidos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await client.query('DELETE FROM pedido WHERE id_pedido = $1', [id]);
        res.status(200).json({ message: 'Pedido eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// CRUD DetallePedido
app.post('/api/detallepedidos', async (req, res) => {
    const { id_pedido, id_prod, cantidad } = req.body;
    const query = 'INSERT INTO detallepedido (id_pedido, id_prod, cantidad) VALUES ($1, $2, $3)';
    try {
        await client.query(query, [id_pedido, id_prod, cantidad]);
        res.status(201).json({ message: 'DetallePedido creado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/detallepedidos', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM detallepedido');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/detallepedidos/:id', async (req, res) => {
    const { id } = req.params;
    const { id_pedido, id_prod, cantidad } = req.body;
    const query = 'UPDATE detallepedido SET id_pedido = $1, id_prod = $2, cantidad = $3 WHERE id_detalle = $4';
    try {
        await client.query(query, [id_pedido, id_prod, cantidad, id]);
        res.status(200).json({ message: 'DetallePedido actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/detallepedidos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await client.query('DELETE FROM detallepedido WHERE id_detalle = $1', [id]);
        res.status(200).json({ message: 'DetallePedido eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




//Consultas Nativas
// 1. Productos de un pedido específico
app.get('/api/productos-pedido/:id_pedido', async (req, res) => {
    const { id_pedido } = req.params;
    const result = await client.query(`
      SELECT p.nombre, dp.cantidad, dp.subtotal
      FROM DetallePedido dp
      JOIN Producto p ON dp.id_prod = p.id_prod
      WHERE dp.id_pedido = $1
    `, [id_pedido]);
    res.json(result.rows);
  });
  
  // 2. Productos más vendidos
  app.get('/api/productos-mas-vendidos/:cantidad_min', async (req, res) => {
    const { cantidad_min } = req.params;
    const result = await client.query(`
      SELECT p.nombre, SUM(dp.cantidad) AS total_vendido
      FROM DetallePedido dp
      JOIN Producto p ON dp.id_prod = p.id_prod
      GROUP BY p.nombre
      HAVING SUM(dp.cantidad) > $1
    `, [cantidad_min]);
    res.json(result.rows);
  });
  
  // 3. Total de ventas por restaurante
  app.get('/api/ventas-por-restaurante', async (req, res) => {
    const result = await client.query(`
      SELECT r.nombre, SUM(p.total) AS total_ventas
      FROM Pedido p
      JOIN Restaurante r ON p.id_rest = r.id_rest
      GROUP BY r.nombre
    `);
    res.json(result.rows);
  });
  //4. Pedido por fecha
  app.get('/api/pedidos-por-fecha/:fecha', async (req, res) => {
    const { fecha } = req.params;
    const query = `
        SELECT *
        FROM pedido
        WHERE fecha = $1
    `;
    try {
        const result = await client.query(query, [fecha]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
  
  // 5. Empleados por rol en un restaurante
  app.get('/api/empleados-por-rol', async (req, res) => {
    const { nombre_rol, id_rest } = req.query;

    const query = `
        SELECT * 
        FROM empleado 
        WHERE rol = $1 AND id_rest = $2
    `;

    try {
        const result = await client.query(query, [nombre_rol, id_rest]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});