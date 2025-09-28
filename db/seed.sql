-- Minimal seed: one client and two orders
INSERT INTO clientes(nombre, email, telefono)
VALUES ('Cliente Demo','demo@correo.com','555-0000')
ON CONFLICT (email) DO NOTHING;

INSERT INTO ordenes(cliente_id, platillo_nombre, notas, estado)
SELECT id, 'Tacos al pastor', 'Sin cebolla', 'pending' FROM clientes WHERE email='demo@correo.com'
ON CONFLICT DO NOTHING;

INSERT INTO ordenes(cliente_id, platillo_nombre, notas, estado)
SELECT id, 'Enchiladas', 'Con queso extra', 'preparing' FROM clientes WHERE email='demo@correo.com'
ON CONFLICT DO NOTHING;
